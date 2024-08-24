import { loadImage } from "./loaderAssets";

export default class Enemy {
    constructor(x, y, width, height, speed = 10, spritePath) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.spritePath = spritePath;
        this.img = null;
        this.hasPassed = false; 
        this.hasPlayedPassSound = false; // verifica se o inimigo que passou ja tocou som

        loadImage(spritePath).then(img => {
            this.img = img;
        });
    }

    draw(CTX) {
        if (this.img) {
            
            CTX.drawImage(this.img, this.x, this.y, this.width, this.height);
        } else {
            CTX.fillStyle = this.color || '#f00'; 
            CTX.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    move(limits) {
        this.y += this.speed;
        this.checkIfPassed(limits); 
        this.limits(limits);
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
        const margin = 200; // Margem de 50 pixels nas laterais

        if (this.y - this.height > limits.height) {
            this.y = -this.height;

            // Garante que o inimigo apareça dentro dos limites, respeitando as margens
            this.x = Math.random() * (limits.width - 2 * margin) + margin;
        }
    }
}
