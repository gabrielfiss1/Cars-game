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

        loadImage(spritePath).then(img => {
            this.img = img;
        });
    }

    draw(CTX) {
        if (this.img) {
            // Desenhe o inimigo com as mesmas dimensões que o McQueen
            CTX.drawImage(this.img, this.x, this.y, this.width, this.height);
        } else {
            CTX.fillStyle = this.color || '#f00'; // Cor de fallback, caso a imagem não carregue
            CTX.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    move(limits) {
        this.y += this.speed;
        this.limits(limits);
    }

    limits(limits) {
        if (this.y - this.height > limits.height) {
            this.y = -this.height;
            this.x = Math.random() * limits.width;
        }
    }
}
