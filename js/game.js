import Player from "./Player.js";
import Platform from "./Platform.js";
import InputHandler from "./InputHandler.js";
import { handleCollisions } from "./Collision.js";
import Renderer from "./Renderer.js";
import Collectible from './Collectible.js';
import { checkCollision } from "./Collision.js";

export default class Game {

    constructor(canvas) {

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.player = new Player(30, 300);

        this.platforms = [

            new Platform(120, 360, 80, 40, "assets/img/plat.png", true,
                true),
            new Platform(240, 300, 70, 35, "assets/img/rock.png", false,
                false),
            new Platform(360, 340, 80, 40, "assets/img/plat.png", true,
                true),
            new Platform(500, 260, 70, 35, "assets/img/rock.png", false,
                false),
            new Platform(650, 320, 80, 40, "assets/img/plat.png", true,
                true),
            new Platform(780, 250, 70, 35, "assets/img/rock.png", false,
                false),

            new Platform(0, 350, 100, 150, "assets/img/end.png", false,
                false),
            new Platform(900, 350, 100, 150, "assets/img/end1.png", false,
                false, true)
        ];

        new InputHandler(this.player);
        this.collectibles = [];
        this.score = 0;
        this.collectibles = [
            new Collectible(200, 200),
            new Collectible(400, 150),
            new Collectible(600, 220),
        ];

        this.gameOver = false;
        this.win = false;
        this.background = new Image();
        this.background.src = "assets/img/water.jpg";
    }

    update() {

        if (this.gameOver || this.win) return;

        this.player.update();

        const time = performance.now();
        this.collectibles.forEach(m => m.update(time));


        handleCollisions(this.player, this.platforms, this);
        console.log("GROUND:", this.player.onGround);



        if (this.player.y > this.canvas.height) {
            this.gameOver = true;

            this.showEndScreen("Вы упали в воду!");
        }

        this.platforms.forEach(platform => {

            if (
                checkCollision(this.player, platform) &&
                platform.isFinish
            ) {
                this.win = true;
                this.showEndScreen("Победа!");
            }

        });

        this.platforms.forEach(platform => {
            platform.update(time);

        });

        this.collectibles.forEach(m => {

            if (!m.collected && checkCollision(this.player, m)) {

                m.collected = true;

                this.score += 1;
            }
        });


    }
    checkCollectibles() {
        for (let collectible of this.collectibles) {
            if (!collectible.collected && collectible.isCollidingWith(this.player)) {
                collectible.collected = true;
                this.score++;
                // Здесь можно добавить звук или анимацию
            }
        }
    }

    draw() {

        this.ctx.drawImage(
            this.background,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        this.collectibles.forEach(m => m.draw(this.ctx));

        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.fillText("Мошки: " + this.score, 20, 30);




        Renderer.drawBanks(this.ctx);

        this.platforms.forEach(platform => {
            platform.draw(this.ctx);
        });

        this.player.draw(this.ctx);
    }

    gameLoop() {

        this.update();

        this.draw();

        requestAnimationFrame(
            this.gameLoop.bind(this)
        );
    }

    start() {
        this.gameLoop();
    }
    showEndScreen(text) {

        const menu =
            document.getElementById("gameOverMenu");

        const result =
            document.getElementById("resultText");

        result.textContent = text;

        menu.classList.remove("hidden");
    }
}