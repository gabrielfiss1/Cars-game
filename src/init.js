import { loadImage } from "./loaderAssets";
import McQueen from "./McQueen";
import Enemy from "./Enemy";
import { keyPress, key } from "./keyboard";

let CTX;
let CANVAS; 
const FRAMES = 45;
let crashSound;
let passSound; 
let victorySound;
let themeSound;
let mcqueenSpriteImage = null;
let bgImage = null;
let bgPattern;
let enemies = [];
let currentSprite = 1; 
let boundaries;
let gameover = false;
const mcqueen = new McQueen(240, 480, 5, 100, 100, FRAMES);
let score = 0;

const enemySpritePaths = [
    '/img/vilainsprite.png', 
    '/img/vilainsprite2.png'  
];

function getRandomSprite() {
    return enemySpritePaths[Math.floor(Math.random() * enemySpritePaths.length)];
}

const init = async () => {
    console.log("Initialize Canvas");
    CANVAS = document.querySelector('canvas');
    CTX = CANVAS.getContext('2d');
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height); 

    try {
        bgImage = await loadImage('/img/roadbg.png');
        bgPattern = CTX.createPattern(bgImage, 'repeat');

        themeSound = new Audio('/sounds/themesound.mp3');
        themeSound.play()
        themeSound.volume = .2
        crashSound = new Audio('/sounds/crash.mp3'); 
        crashSound.volume = .3
        passSound = new Audio('/sounds/pass2.mp3'); 
        passSound.volume = .3
        victorySound = new Audio('/sounds/youwin.mp3');

        boundaries = {
            width: CANVAS.width,
            height: CANVAS.height
        };

        const enemySpawnArea = {
            minX: CANVAS.width * 0.4,  // 40% da largura da tela
            maxX: CANVAS.width * 0.7,  // 70% da largura da tela
            minY: -CANVAS.height * 0.1, // 10% acima da tela (negativo)
            maxY: -CANVAS.height * 0.9  // 90% acima da tela (negativo)
        };
        
        enemies = Array.from({ length: 2 }, () => {
            return new Enemy(
                Math.random() * (enemySpawnArea.maxX - enemySpawnArea.minX) + enemySpawnArea.minX,
                Math.random() * (enemySpawnArea.maxY - enemySpawnArea.minY) + enemySpawnArea.minY,
                80, 80, 5, getRandomSprite()
            );
        });

        keyPress(window);
        start(); 
    } catch (error) {
        console.error("Error initializing the game:", error);
    }
};

const updateSprite = () => {
    if (key === 'ArrowLeft') {
        currentSprite = 0; // Esquerda
    } else if (key === 'ArrowRight') {
        currentSprite = 2; // Direita
    } else {
        currentSprite = 1; // De costas 
    }
};

const drawHUD = () => {
    CTX.fillStyle = "rgba(0, 0, 0, 0.5)"; // Fundo preto com 50% de opacidade
    CTX.fillRect(2, 12, 100, 40); // Retângulo de fundo

    CTX.font = "20px Arial";
    CTX.fillStyle = "white";
    CTX.textAlign = "left";
    CTX.fillText(`Pontos: ${score}`, 3, 40); // Texto dos pontos
    CTX.shadowColor = "transparent";
};



const adjustEnemySpeed = () => {
    if (score > 0 && score % 10 === 0) {
        enemies.forEach((enemy) => {
            enemy.speed += 1;  // Aumenta a velocidade 
        });
        score++; // Incrementa para evitar que a velocidade aumente a cada quadro enquanto o score for múltiplo de 10
    }
};


const start = () => {
    let startInterval = setInterval(() => {
        clearInterval(startInterval);
        loop();
    }, 1000 / FRAMES);
};
const loop = () => {
    setTimeout(() => {
        CTX.fillStyle = bgPattern;
        CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
        CTX.drawImage(bgImage, 0, 0, CANVAS.width, CANVAS.height);
        updateSprite();

        mcqueen.move(boundaries, key);
        mcqueen.draw(CTX);

        adjustEnemySpeed();

        enemies.forEach((enemy) => {
            if (enemy) { 
                enemy.move(boundaries);
                enemy.draw(CTX);

                if (enemy.hasPassed && !enemy.hasPlayedPassSound) {
                    passSound.play();
                    
                    enemy.hasPlayedPassSound = true; 
                    score += 1; 
                }
                gameover = !gameover ? mcqueen.colide(enemy): true; //revisar
            }
        });
        drawHUD()

        if(score == 50){
            CTX.font = "50px Montserrat";
            CTX.fillStyle = "green";
            CTX.textAlign = "center";
            CTX.fillText("YOU WIN", CANVAS.width / 2, CANVAS.height / 2);
            victorySound.play();
            cancelAnimationFrame(anime);
        }

        if (gameover) {
            CTX.font = "50px Montserrat";
            CTX.fillStyle = "red";
            CTX.textAlign = "center";
            CTX.fillText("GAME OVER", CANVAS.width / 2, CANVAS.height / 2);
            crashSound.play();
            cancelAnimationFrame(anime);
        } else {
            requestAnimationFrame(loop);
        }
    }, 60 / FRAMES);
};

export { init };
