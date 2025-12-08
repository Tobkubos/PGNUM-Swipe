
//----------------------------------------------------
import { Player } from "./player.js";
import { handleEffects } from "./scripts/effects.js";
import { checkScreenSizeForOptimalGameplayMenu, checkScreenSizeForOptimalGameplayGame } from "./utils/resizer.js";
import { ObstacleManager } from "./scripts/obstacles.js";
//----------------------------------------------------

if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker
			.register("../config/sw.js")
			.then((reg) => console.log("Service Worker zarejestrowany!", reg))
			.catch((err) => console.log("Błąd Service Workera:", err));
	});
}

//----------------------------------------------------

export const state = {
	playerScene: "Menu",
	scenes: {
		Menu: "Menu",
		Game: "Game",
		Pause: "Pause",
		GameOver: "GameOver",
	}
};

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const off = new OffscreenCanvas(canvas.width, canvas.height);
const offCtx = off.getContext("2d");

const player = new Player(0, 0, 50, 0, 1);
const obstacleManager = new ObstacleManager();
let gameStarted = false;

const buffer = 10;


//----------------------------------------------------

function resize() {
	const rect = canvas.getBoundingClientRect();
	const dpr = window.devicePixelRatio || 1;

	canvas.width = Math.round(rect.width * dpr);
	canvas.height = Math.round(rect.height * dpr);
	ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

	off.width = canvas.width;
	off.height = canvas.height;
	offCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener("resize", resize);
resize();

function setPlayerPosition(x, y) {
	player.x = x;
	player.y = y;
}

function menuAnimationAndSkinPreview() {

	var playerInMenuSize = checkScreenSizeForOptimalGameplayMenu(canvas);
	player.baseSize = playerInMenuSize;
	setPlayerPosition((canvas.clientWidth / 2) - (player.baseSize / 2), (canvas.clientHeight / 2) - (player.baseSize / 2));
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	player.draw(ctx);
	handleEffects(ctx, player);
	gameLoop()
}

function game() {
	const { squareSize, playerSize } = checkScreenSizeForOptimalGameplayGame(canvas, buffer);
	player.baseSize = playerSize;

	const totalWidth = squareSize * 3;
	const startX = (canvas.clientWidth - totalWidth) / 2;

	setPlayerPosition((canvas.clientWidth / 2) - (player.baseSize / 2), canvas.clientHeight - player.baseSize - 100);

	if (!gameStarted) {
		obstacleManager.spawnRandomObstacle();
		gameStarted = true;
	}

	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

	handleEffects(ctx, player);
	player.draw(ctx);

	obstacleManager.update(canvas.clientHeight); 
	obstacleManager.draw(ctx, startX, squareSize);

	gameLoop();
}


// Game Loop
export function gameLoop() {
	if ((state.playerScene === state.scenes.Menu)) {
		requestAnimationFrame(menuAnimationAndSkinPreview);
	}

	if ((state.playerScene === state.scenes.Game)) {
		requestAnimationFrame(game);
	}

	if ((state.playerScene === state.scenes.Pause)) { }

	if ((state.playerScene === state.scenes.GameOver)) { }
}
gameLoop();

