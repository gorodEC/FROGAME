

export default class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.width = 40;
        this.height = 40;

        this.velX = 0;
        this.velY = 0;

        this.speed = 5;
        this.jumpPower = -12;

        this.gravity = 0.6;

        this.onGround = false;
        this.frames = [];
        this.direction = 1;

        for (let i = 1; i <= 8; i++) {
            const img = new Image();
            img.src = `assets/img/frog${i}.png`;
            this.frames.push(img);
        }

        this.currentFrame = 0;
        this.frameTimer = 0;
        this.frameInterval = 7;
        this.velY = Math.min(this.velY, 12);
        this.prevY = this.y;
    }

    update() {

        if (this.onGround) {
            this.velY = 0;
        }

        this.velY += this.gravity;

        this.x += this.velX;
        this.y += this.velY;

        if (this.velX !== 0 || !this.onGround) {
            this.animate();
        } else {
            this.currentFrame = 0; // первый кадр покоя
        }

         if (this.x < 0) {
        this.x = 0;
    }

    if (this.x + this.width > 1000) {
        this.x = 1000 - this.width;
    }

    }

    jump() {
        if (this.onGround) {
            this.velY = this.jumpPower;
            this.onGround = false;
        }
    }

    draw(ctx) {

        const frame = this.frames[this.currentFrame];

        ctx.save();

        if (this.direction === -1) {

            ctx.scale(-1, 1);

            ctx.drawImage(
                frame,
                -this.x - this.width,
                this.y + 15,
                this.width,
                this.height
            );

        } else {

            ctx.drawImage(
                frame,
                this.x,
                this.y + 15,
                this.width,
                this.height
            );
        }

        ctx.restore();
    }
    animate() {

        this.frameTimer++;

        if (this.frameTimer >= this.frameInterval) {

            this.currentFrame++;

            if (this.currentFrame >= this.frames.length) {
                this.currentFrame = 0;
            }

            this.frameTimer = 0;
        }
    }
}
