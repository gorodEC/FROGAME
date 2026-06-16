export function handleCollisions(player, platforms, game) {
    

    let onGround = false;

    platforms.forEach(platform => {

        const hit =
            player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height >= platform.y &&
            player.y + player.height <= platform.y + 10; // "зона прилипания"

        if (hit && player.velY >= 0) {

            player.y = platform.y - player.height;
            player.velY = 0;

            onGround = true;

            if (platform.isFinish) {
                game.win = true;
                game.showEndScreen("Победа!");
            }
        }
    });

    player.onGround = onGround;
}
export function checkCollision(a, b) {

    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}