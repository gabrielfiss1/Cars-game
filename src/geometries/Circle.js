export default class Circle {
	constructor(x, y, size, speed = 10, color = "#00f") {
		this.x = x;
		this.y = y;
		this.size = size;
		this.speed = speed;
		this.color = color;
		this.status = 'ArrowRight';
		this.line = 3
	}

	draw(ctx) {
		this.circ(ctx,
			this.x,
			this.y,
			this.size,
			this.line,
			this.color,
			this.color)
	}

	circ(ctx, x, y, r, l, color, fill = false) {
		ctx.lineWidth = l;
		ctx.strokeStyle = color
		ctx.beginPath();
		ctx.arc(x, y, r, 0, Math.PI*2);
		ctx.stroke();
		if (fill) {
			ctx.fillStyle = fill
			ctx.fill()
		}
	}

	colide(circ){
		return this.size+circ.size >= Math.sqrt((this.x - circ.x)**2 + (this.y -circ.y)**2) 
	}
}