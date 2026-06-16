import Game from "./Game.js";

const canvas = document.getElementById("gameCanvas");

let game = null;

const startMenu = document.getElementById("startMenu");
const startBtn = document.getElementById("startBtn");
const restartBtn =
    document.getElementById("restartBtn");

restartBtn.addEventListener("click", () => {

    location.reload();
});
startBtn.addEventListener("click", () => {

    startMenu.classList.add("hidden");

    game = new Game(canvas);

    game.start();
});