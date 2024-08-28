import Circle from './geometries/Circle'
import { loadImage } from "./loaderAssets"

export default class McQueen extends Circle {
    constructor(x, y, velocity, width, height, FRAMES = 60) {
        super(x, y, 0)
        this.cellWidth = 50;  // Largura correta de cada sprite
        this.cellHeight = 40; // Altura correta de cada sprite
        this.width = width;
        this.height = height;
        this.speed = velocity;

        this.totalSprites = 3; // total de sprites (esquerda, costas, direita)
        this.spriteSpeed = 10;

        this.loadImage();
        this.setSprites(); // Chama setSprites antes de inicializar o status
        this.status = 'down'; // status inicial

        this.showHit = true;
        this.setHit();

        this.setControlsKeys();
    }

    async loadImage() {
        this.img = await loadImage('/img/mcqueenback.png');
    }

    draw(CTX) {
        if (!this.img) return; // Aguarda a imagem ser carregada

        // Ajusta a largura e altura do sprite de costas se necessário
        let spriteWidth = this.cellWidth;
        let spriteHeight = this.cellHeight;
        
        if (this.status === 'down') {
            spriteWidth = 40; // Ajuste para o sprite de costas
            spriteHeight = 40; // Ajuste para o sprite de costas
        }

        const spriteX = this.cellWidth * this.sprites[this.status];
        const spriteY = 0; // Ajuste conforme a posição Y do sprite na imagem

        CTX.drawImage(
            this.img,
            spriteX, spriteY,
            spriteWidth, spriteHeight,
            this.x, this.y,
            this.width, this.height
        );

        this.showHit && this.hit.draw(CTX);
    }


    setHit() {
        this.hit = new Circle(
            this.x + this.width / 2,
            this.y + this.height / 2,
            this.width * 0.2, 2,
            "transparent"
        );
    }

    setSprites() {
        this.sprites = {
            'down': 1, // Sprite central (de costas)
            'left': 0,  // Primeiro sprite (esquerda)
            'right': 2  // Terceiro sprite (direita)
        };
    }

    setControlsKeys() {
        this.controls = {
            "a": "left",
            "d": "right",
            "ArrowLeft": "left",
            "ArrowRight": "right",
            "s": "down" // Adiciona controle para o sprite de costas
        };
    }

    setMovements() {
        this.movements = {
            'left': { x: this.x - this.speed, y: this.y },
            'right': { x: this.x + this.speed, y: this.y },
            'down': { x: this.x, y: this.y } // Sem movimento, apenas muda o sprite
        };
    }

    update() {
        this.hit.x = this.x + this.width / 2;
        this.hit.y = this.y + this.height / 2;
    }

    move(limits, key) {
        if (this.controls[key]) {
            this.status = this.controls[key]; // Atualiza o sprite com base na direção
        }

        this.setMovements();

        // Atualiza as coordenadas X e Y baseadas no movimento
        let { x: newx, y: newy } = this.movements[this.status] || { x: this.x, y: this.y };

        // Garante que o carro não saia dos limites da tela
        if (newx >= 60 && newx <= limits.width - this.width) {
            this.x = newx;
        }
        if (newy >= 0 && newy <= limits.height - this.height) {
            this.y = newy;
        }

        this.update();
    }

    colide(other) {
        const dx = this.hit.x - other.x - other.width / 2;
        const dy = this.hit.y - other.y - other.height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
    
        return distance < this.hit.size + other.width / 2;
    }
    
}
