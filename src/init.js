import { loadImage } from "./loaderAssets";
import McQueen from "./McQueen";
import Enemy from "./Enemy";
import { keyPress, key } from "./keyboard";

let CTX;
let CANVAS; 
const FRAMES = 45;
let crashSound;
let passSound; 
let mcqueenSpriteImage = null;
let bgImage = null;
let bgPattern;
const mcqueen = new McQueen(240, 480, 10, 100, 100, FRAMES);

const enemySpritePaths = [
    '/src/img/vilainsprite.png', 
    '/src/img/vilainsprite2.png'  // adicionar mais sprites
];

function getRandomSprite() {
    return enemySpritePaths[Math.floor(Math.random() * enemySpritePaths.length)];
}

let enemies = [];
let currentSprite = 1; 

let boundaries;
let gameover = false;

const init = async () => {
    console.log("Initialize Canvas");
    CANVAS = document.querySelector('canvas');
    CTX = CANVAS.getContext('2d');
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

    try {
        mcqueenSpriteImage = await loadImage('/src/img/mcqueenback.png');
        bgImage = await loadImage('/src/img/roadbg.png');
        bgPattern = CTX.createPattern(bgImage, 'repeat');

        crashSound = new Audio('/src/sounds/crash.mp3'); 
        passSound = new Audio('/src/sounds/pass.mp3'); 

        boundaries = {
            width: CANVAS.width,
            height: CANVAS.height
        };

        enemies = Array.from({ length: 2 }, () => {
            return new Enemy(
                Math.random() * CANVAS.width,
                Math.random() * -CANVAS.height, // Inimigos começam fora da tela por isso o menos
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

        enemies.forEach((enemy) => {
            if (enemy) { 
                enemy.move(boundaries);
                enemy.draw(CTX);

                if (enemy.hasPassed && !enemy.hasPlayedPassSound) {
                    passSound.play();
                    enemy.hasPlayedPassSound = true; 
                }
                gameover = !gameover
                    ? mcqueen.colide(enemy)
                    : true;
            }
        });

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
    }, 1000 / FRAMES);
};

export { init };
