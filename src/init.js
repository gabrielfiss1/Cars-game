import { loadImage } from "./loaderAssets"
import McQueen from "./McQueen"
import Circle from "./geometries/Circle"
import { keyPress, key } from "./keyboard"
import Enemy from "./Enemy"

let CTX;
let CANVAS;
const FRAMES = 45;

let mcqueenSpriteImage = null;
let bgImage = null;
let bgPattern;
const mcqueen = new McQueen(240, 480, 10, 100, 100, FRAMES);

const enemySpritePaths = [
    '/src/img/vilainsprite.png', // Caminho do primeiro sprite
    '/src/img/vilainsprite2.png'  // Caminho do segundo sprite
];

// Função para escolher um sprite aleatório
function getRandomSprite() {
    return enemySpritePaths[Math.floor(Math.random() * enemySpritePaths.length)];
}

let enemies = [];

let cellWidth = 41.5; // largura da célula de recortes
let cellHeight = 53;  // altura da célula de recorte
let currentSprite = 1; // Sprite inicial (de costas)

let boundaries;
let gameover = false;

const init = async () => {
    console.log("Initialize Canvas");
    CANVAS = document.querySelector('canvas');
    CTX = CANVAS.getContext('2d');
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

    mcqueenSpriteImage = await loadImage('/src/img/mcqueenback.png');
    bgImage = await loadImage('/src/img/roadbg.png');
    bgPattern = CTX.createPattern(bgImage, 'repeat');

    boundaries = {
        width: CANVAS.width,
        height: CANVAS.height
    };

    // Inicializa os inimigos corretamente
    enemies = Array.from({ length: 2 }, () => {
        return new Enemy(
            Math.random() * CANVAS.width,
            Math.random() * -CANVAS.height, // Inimigos começam fora da tela
            80,80, 10, getRandomSprite()
        );
    });

    keyPress(window);
    start(); // Chama a função start para iniciar o jogo
};

const updateSprite = () => {
    if (key === 'ArrowLeft') {
        currentSprite = 0; // Esquerda
    } else if (key === 'ArrowRight') {
        currentSprite = 2; // Direita
    } else {
        currentSprite = 1; // De costas (ou parado)
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

        // Desenha o McQueen com o sprite correspondente
        mcqueen.move(boundaries, key);
        mcqueen.draw(CTX);

        // Desenha e move cada inimigo
        enemies.forEach(enemy => {
            if (enemy) { // Certifica-se de que o inimigo foi criado corretamente
                enemy.move(boundaries);
                enemy.draw(CTX);
                gameover = !gameover
                    ? mcqueen.colide(enemy)
                    : true;
            }
        });

        if (gameover) {
            console.error('DEAD!!!');
            cancelAnimationFrame(anime);
        } else {
            requestAnimationFrame(loop);
        }
    }, 1000 / FRAMES);
};

export { init };
