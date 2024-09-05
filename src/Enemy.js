import { loadImage } from "./loaderAssets";

export default class Enemy {
    constructor(x, y, width, height, speed, spritePath, frameCount, frameSpeed ) {
        this.x = x;
        this.y = y;
        this.width = width;  // largura na tela
        this.height = height; // altura na tela
        this.speed = speed;
        this.spritePath = spritePath;
        this.img = null;
        this.hasPassed = false;
        this.hasPlayedPassSound = false; // Verifica se o inimigo que passou já tocou som

       
        this.frameCount = 3; // Número total de quadros na sprite
        this.currentFrame = 0; // Quadro atual da sprite
        this.frameSpeed = 15; // Velocidade de mudança de quadro
        this.frameTick = 0; // Contador para a velocidade do quadro

        loadImage(spritePath).then((img) => {
            this.img = img;
        });
    }

    draw(CTX) {
        if (this.img) {
            // Calcular a altura e largura
            const frameWidth = this.img.width / this.frameCount; // Corrige a largura de cada quadro
            const frameHeight = this.img.height;

            CTX.drawImage(
                this.img,
                frameWidth * this.currentFrame, // Posição X do quadro na imagem
                0, // Posição Y do quadro na imagem
                frameWidth, 
                frameHeight, 
                this.x, 
                this.y, 
                this.width, 
                this.height 
            );
        } else {
            CTX.fillStyle = this.color || '#f00';
            CTX.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    move(limits) {
        this.y += this.speed;
        this.checkIfPassed(limits);
        this.limits(limits);
        this.updateSprite(); 
    }

    updateSprite() {
        this.frameTick++; 

        // Muda para o próximo quadro quando o contador atingir o frameSpeed
        if (this.frameTick >= this.frameSpeed) {
            this.currentFrame = (this.currentFrame + 1) % this.frameCount; // Loop de quadros
            this.frameTick = 0; // Reseta o contador de ticks
        }
    }

    checkIfPassed(limits) {
        if (this.y > limits.height) {
            if (!this.hasPassed) {
                this.hasPassed = true;
                this.hasPlayedPassSound = false; // Reseta para que o som possa ser tocado novamente na próxima passagem
            }
        } else {
            this.hasPassed = false;
        }
    }

    limits(limits) {
        const margin = 200;

        if (this.y - this.height > limits.height) {
            this.y = -this.height;

            // Garante que o inimigo apareça dentro dos limites
            this.x = Math.random() * (limits.width - 2 * margin) + margin;
        }
    }
}
