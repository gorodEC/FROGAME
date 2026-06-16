export default class Collectible {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.width = 20;
        this.height = 20;

        this.collected = false;

        this.speed = 0.5;

        this.offset = Math.random() * Math.PI * 2;
    }

    update(time) {

        
        this.y += Math.sin(time * 0.003 + this.offset) * 0.3;
    }

    draw(ctx) {

        if (this.collected) return;

        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        ctx.fill();
    }
    
}
