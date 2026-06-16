export default class InputHandler {
    constructor(player) {

        window.addEventListener("keydown", e => {

            if (e.code === "ArrowLeft") {
                player.velX = -player.speed;
            }

            if (e.code === "ArrowRight") {
                player.velX = player.speed;
            }

            if (e.code === "Space") {
                player.jump();
            }
            if (e.code === "ArrowLeft") {
    player.velX = -player.speed;
    player.direction = -1;
}

if (e.code === "ArrowRight") {
    player.velX = player.speed;
    player.direction = 1;
}
        });

        window.addEventListener("keyup", e => {

            if (
                e.code === "ArrowLeft" ||
                e.code === "ArrowRight"
            ) {
                player.velX = 0;
            }
        });
    }
    
}