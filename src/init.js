import { loadImage } from "./loaderAssets"
import McQueen from "./McQueen"
import Circle from "./geometries/Circle"
import { keyPress, key } from "./keyboard"

let CTX
let CANVAS
const FRAMES = 45

let mcqueenSpriteImage = null
let bgImage = null
let bgPattern
const mcqueen = new McQueen(250, 480, 10, 100, 100, FRAMES)
const tangerine = new Circle(280, 200, 10, 5, 'orange')

let cellWidth = 41.5 // largura da célula de recorte
let cellHeight = 53  // altura da célula de recorte
let currentSprite = 1 // Sprite inicial (de costas)

let boundaries
let gameover = false

const init = async () => {
    console.log("Initialize Canvas")
    CANVAS = document.querySelector('canvas')
    CTX = CANVAS.getContext('2d')
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height)
    
    mcqueenSpriteImage = await loadImage('./src/img/mcqueenback.png')
    bgImage = await loadImage('./src/img/roadbg.png')
    bgPattern = CTX.createPattern(bgImage, 'repeat')

    boundaries = {
        width: CANVAS.width,
        height: CANVAS.height
    }

    keyPress(window)
    start() // Chama a função start para iniciar o jogo
}

const updateSprite = () => {
    if (key === 'ArrowLeft') {
        currentSprite = 0 // Esquerda
    } else if (key === 'ArrowRight') {
        currentSprite = 2 // Direita
    } else {
        currentSprite = 1 // De costas (ou parado)
    }
}

const start = () => {
    let startInterval = setInterval(() => {
        CTX.clearRect(0, 0, CANVAS.width, CANVAS.height)
        CTX.fillStyle = "white"
        CTX.fillText("Pressione Enter para iniciar", CANVAS.width / 2 - 100, CANVAS.height / 2)

        if (key === 'Enter') {
            clearInterval(startInterval)
            loop() // Inicia o loop do jogo
        }
    }, 1000 / FRAMES)
}

const loop = () => {
    setTimeout(() => {
        CTX.fillStyle = bgPattern;
        CTX.fillRect(0, 0, CANVAS.width, CANVAS.height)
     CTX.drawImage(bgImage, 0, 0, CANVAS.width, CANVAS.height);
        updateSprite()

        // Desenha o McQueen com o sprite correspondente

        tangerine.draw(CTX)
        mcqueen.move(boundaries, key)
        mcqueen.draw(CTX)

        if (gameover) {
            console.error('DEAD!!!')
            cancelAnimationFrame(anime)
        } else {
            requestAnimationFrame(loop)
        }
    }, 1000 / FRAMES)
}

export { init }
