import Circle from './geometries/Circle'
import { loadImage } from "./loaderAssets"

//TODO: ARRUMAR
export default class McQueen extends Circle {

	constructor(x, y, velocity = 5, width,height, FRAMES = 60) {
		super(x , y, 0)
		loadImage('./src/img/mcqueenback.png').then(img=>this.img = img)
		
		this.cellWidth = 43	//largura da celular de recorte
		this.cellHeight = 52	//altura da celula de recorte
		this.cellX = 0
		this.cellY = 0
		
		this.totalSprites = 1	//Total de sprites
		this.spriteSpeed = 1
		this.setSprites()
		this.controlSprite(FRAMES)

		this.width = width
		this.height = height
		//this.size = this.width/2

		this.speed = velocity*this.spriteSpeed
		this.status = 'down'
		
		this.showHit = true;
		this.setHit()

		this.setControlsKeys()
	}

	controlSprite(FRAMES){ //Controla a animacao do sprite
		setInterval(() => {
			this.cellX = this.cellX < this.totalSprites - 1 ? this.cellX + 1 : 0;
		}, 1000 / (FRAMES*this.spriteSpeed/10))
	}

	draw(CTX){
		this.cellY = this.sprites[this.status];

		CTX.drawImage(
			this.img,
			this.cellX, //source
			this.cellY,
			this.cellWidth,
			this.cellHeight, //source
			this.x, //draw
			this.y,
			this.width,
			this.height //draw
		)

		this.showHit && this.hit.draw(CTX)
	}

	setHit(){
		this.hit = new Circle(
			this.x+this.width/2,
			this.y+this.height/2,
			this.size*.5,5,
			"rgba(0,0,255,.3)"
			)
	}
	// OLHA AQUI PRA MUDAR PARA O SPRITE DA DIREITA
	setSprites(){
		this.sprites = {
			'down': 0,
			'up': this.cellHeight,
			'left': 0,
			'right': 0
		}
	}

	setControlsKeys(){
		this.controls = {
			"a":"left",
			"d":"right"
		}
	}

	setMovements(){
		this.movements = {
			'left': { x: this.x - this.speed},
			'right':{ x: this.x + this.speed}
		}
	}

	update(){
		this.hit.x=this.x+this.width/2
		this.hit.y=this.y+this.height/2
	}

	move(limits, key) {
		this.setMovements()

		this.status = this.controls[key]? this.controls[key] : this.status

		let newx = this.movements[this.status]?.x
		let newy = this.movements[this.status]?.y

		this.x = newx!=undefined?newx:this.x;
		this.y = newy!=undefined?newy:this.y;

		this.limits(limits)
		this.update()
	}

	colide(other){
		return this.hit.colide(other)
	}
}