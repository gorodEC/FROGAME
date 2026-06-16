
    export default class Platform {

    constructor(
        x,
        y,
        width,
        height,
        imageSrc,
        floating = true,
        shadow = true,
        isFinish = false,
       
    ) {
        this.x = x;
        this.baseY = y;
        this.y = y;
        this.prevY = this.y;
        this.prevX = this.x;

        this.width = width;
        this.height = height;

        this.image = new Image();
        this.image.src = imageSrc;
        this.floating = floating;
this.shadow = shadow;
this.isFinish = isFinish;


        this.floatOffset = Math.random() * Math.PI * 2;
    }
    update(time) {

    if (!this.floating) return;

    this.y =
        this.baseY +
        Math.sin(time * 0.002 + this.floatOffset) * 3;
}


   draw(ctx) {

    if (
        !this.image ||
        !this.image.complete ||
        this.image.naturalWidth === 0
    ) {
        return;
    }

    if (this.shadow) {

        ctx.fillStyle = "rgba(0,0,0,0.25)";

        ctx.beginPath();

        ctx.ellipse(
            this.x + this.width / 2,
            this.y + this.height + 8,
            this.width * 0.4,
            this.height * 0.2,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }

    ctx.drawImage(
        this.image,
        this.x,
        this.y,
        this.width,
        this.height
    );
}
}
