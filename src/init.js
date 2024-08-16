import { loadImage } from "./loaderAssets"
import McQueen from "./McQueen"
import Circle from "./geometries/Circle"
import { keyPress, key } from "./keyboard"



let CTX
let CANVAS
const FRAMES = 45

let goblinImage = null
let bgImage = null
let bgPattern=null
let x = 0
let y = 155 //trocar posicao q desenha a srpite
const mcqueen= new McQueen(250, 300, 50, 140, 100, FRAMES)
const tangerine = new Circle(200, 200, 10, 5, 'orange')
let enemies = Array.from({ length: 3 });
// let canvas
let gameover
let boundaries
let score
let anime


let cellWidth =41.5//largura da celular de recorte
let cellHeight =53//altura da celula de recorte
let totalSprites = 3	//Total de sprites
let goblinSpeed =  2	//Velocidade de troca de sprites (anime)

const init = async () => {
	console.log("Initialize Canvas")
	score = 0
	gameover = false
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')
	CTX.clearRect(0, 0, CANVAS.width, CANVAS.height)
	// goblinImage = await loadImage('src/img/mcqueensprite.png')
	// // vilainImage = await loadImage('img/vilainsprite.png')
	//  bgImage = await loadImage('src/img/roadbg.png')
	// bgPattern = CTX.createPattern(bgImage,'repeat')
	// loop()
	// animeSprite(goblinSpeed)
	boundaries = {
		width: CANVAS.width,
		height: CANVAS.height
	}


	tangerine.restart = () => {
		tangerine.x = tangerine.size + Math.random() * (boundaries.width - tangerine.size)
		tangerine.y = tangerine.size + Math.random() * (boundaries.height - tangerine.size)
	}

	keyPress(window)
	start()
}

const animeSprite = (spriteSpeed)=>{ //Controla a animacao do sprite
	setInterval(() => {
		x = x < totalSprites - 1 ? x + 1 : 0;
	}, 1000 / (FRAMES*spriteSpeed/10))
}

const start = () =>{
	let startInterval = setInterval(()=>{
		CTX.clearRect(0, 0, CANVAS.width, CANVAS.height)
		console.log(key)
		if(key=='Enter'){
			clearInterval(startInterval)
			loop()
		}
	},1000)
}

const loop = () => {

	setTimeout(() => {
		CTX.fillStyle = bgPattern;
		CTX.fillRect(0,0,CANVAS.width,CANVAS.height)

		// CTX.drawImage(
		// 	goblinImage,
		// 	x * cellWidth,
		// 	y,
		// 	cellWidth,
		// 	cellHeight, //source
		// 250, 320, 100, 100 //draw
		// )

		CTX.clearRect(0, 0, CANVAS.width, CANVAS.height)

		tangerine.draw(CTX)

		mcqueen.move(boundaries, key)
		mcqueen.draw(CTX)



		if (gameover) {
			console.error('DEAD!!!')
			cancelAnimationFrame(anime)
		} else {
			requestAnimationFrame(loop)
		}

	}, 10000 / FRAMES)
}

export { init }


