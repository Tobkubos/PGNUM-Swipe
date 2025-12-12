//----------------------------------------------------
//player display
import { Player } from "./player.js";
import { handleEffects } from "./scripts/effects.js";
import { handleSkins } from "./scripts/skins.js";
//objects sizing management
import {
	checkScreenSizeForOptimalGameplayMenu,
	checkScreenSizeForOptimalGameplayGame,
	checkScreenSizeForOptimalSkinsPreview
} from "./utils/resizer.js";
//obstacles
import { ObstacleManager } from "./scripts/obstacles.js";
//ui management
import { UIManager, state } from "./uiManager.js";
import { getUserHighscore, updateUserHighscore } from "./db/DatabaseConfig.js";
import { font } from "./utils/colors.js";
//----------------------------------------------------

if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker
			.register("./config/sw.js")
			.then((reg) => console.log("Service Worker zarejestrowany!", reg))
			.catch((err) => console.log("Błąd Service Workera:", err));
	});
}

//----------------------------------------------------

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const off = new OffscreenCanvas(canvas.width, canvas.height);
const offCtx = off.getContext("2d");

export const player = new Player(0, 0, 50, 1, 2);
const obstacleManager = new ObstacleManager();
let gameStarted = false;

const buffer = 10;

//----------------------------------------------------
//#region MOVEMENT
let touchStartX = 0;
let touchEndX = 0;
function handleGesture() {
	console.log("Handling gesture");
	if (state.playerScene !== state.scenes.Game) return;

	const threshold = 30;

	if (touchEndX < touchStartX - threshold) {
		player.move(-1);
	}

	if (touchEndX > touchStartX + threshold) {
		player.move(1);
	}
}

function lerp(start, end, t) {
	return start * (1 - t) + end * t;
}
//MOBILE
document.addEventListener("touchstart", (e) => {
	touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
	touchEndX = e.changedTouches[0].screenX;
	handleGesture();
});

//PC
document.addEventListener("mousedown", (e) => {
	touchStartX = e.screenX;
});

document.addEventListener("mouseup", (e) => {
	touchEndX = e.screenX;
	handleGesture();
});
//#endregion
//----------------------------------------------------
//#region COLLISION DETECTION
function isColliding(player, obstacle, squareSize) {
	const playerRect = {
		x: player.x,
		y: player.y,
		width: player.baseSize,
		height: player.baseSize,
	};
	for (let laneIndex of obstacle.activeLanes) {
		const obsX =
			(canvas.clientWidth - squareSize * 3) / 2 + laneIndex * squareSize;
		const obsRect = {
			x: obsX,
			y: obstacle.y,
			width: squareSize,
			height: squareSize,
		};
		if (obstaclesOverlap(playerRect, obsRect)) {
			console.log("Game Over!");
			state.playerScene = state.scenes.Menu;
			gameStarted = false;
			player.lane = 1;

			const currentScore = obstacleManager.score;
			obstacleManager.reset();

			updateUserHighscore(currentScore)
				.then(() => {
					return getUserHighscore();
				})
				.then((highscore) => {
					console.log("Aktualny Highscore:", highscore);
					const scoreText = document.querySelector(".menu-info-highscore");
					if (scoreText) scoreText.innerText = highscore;
				});

			UIManager();
			return true;
		}
	}
}
function obstaclesOverlap(rect1, rect2) {
	return !(
		rect1.x > rect2.x + rect2.width ||
		rect1.x + rect1.width < rect2.x ||
		rect1.y > rect2.y + rect2.height ||
		rect1.y + rect1.height < rect2.y
	);
}
//#endregion
//----------------------------------------------------
//#region RESIZE HANDLER
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
//#endregion
//----------------------------------------------------

function setPlayerPosition(x, y) {
	player.x = x;
	player.y = y;
}

function menuAnimationAndSkinPreview() {
	var playerInMenuSize = checkScreenSizeForOptimalGameplayMenu(canvas);
	player.baseSize = playerInMenuSize;
	setPlayerPosition(
		canvas.clientWidth / 2 - player.baseSize / 2,
		canvas.clientHeight / 2 - player.baseSize / 2
	);
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	handleEffects(ctx, player);
	handleSkins(ctx, player);
	gameLoop();
}

const NUMBER_OF_SKINS = 16;
const COLUMNS = 4;
function skinsPreview() {
    var size = checkScreenSizeForOptimalSkinsPreview(canvas, 40);
    const padding = 20;
    const textHeight = size / 5 + 10;

    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    const rows = Math.ceil(NUMBER_OF_SKINS / COLUMNS);

    // ROZMIAR CAŁEJ SIATKI
    const gridWidth = COLUMNS * size + (COLUMNS - 1) * padding;
    const gridHeight = rows * (size + textHeight) + (rows - 1) * padding;

    // WYŚRODKOWANIE
    const startX = (canvas.clientWidth - gridWidth) / 2;
    const startY = (canvas.clientHeight - gridHeight) / 2;

    for (let skinId = 0; skinId < NUMBER_OF_SKINS; skinId++) {
        const col = skinId % COLUMNS;
        const row = Math.floor(skinId / COLUMNS);

        const x = startX + col * (size + padding);
        const y = startY + row * (size + textHeight + padding);

        const oldX = player.x;
        const oldY = player.y;
        const oldSkin = player.selectedSkin;
        const oldSize = player.baseSize;

        player.x = x;
        player.y = y;
        player.baseSize = size;
        player.selectedSkin = skinId;

        handleSkins(ctx, player);

        ctx.fillStyle = "white";
        ctx.font = `${size / 5}px Poppins`;
        ctx.textAlign = "center";
        ctx.fillText(`#${skinId}`, x + size / 2, y + size + textHeight / 1.5);

        player.x = oldX;
        player.y = oldY;
        player.selectedSkin = oldSkin;
        player.baseSize = oldSize;
    }
    gameLoop();
}
function effectsPreview() {

}

function game() {
	const { squareSize, playerSize } = checkScreenSizeForOptimalGameplayGame(
		canvas,
		buffer
	);
	player.baseSize = playerSize;

	const totalWidth = squareSize * 3;
	const gridStartX = (canvas.clientWidth - totalWidth) / 2;
	const targetX =
		gridStartX + player.lane * squareSize + (squareSize - playerSize) / 2;
	const targetY = canvas.clientHeight - player.baseSize - 100;

	player.x = lerp(player.x, targetX, 0.2);
	player.y = targetY;

	if (!gameStarted) {
		obstacleManager.spawnRandomObstacle();
		gameStarted = true;
	}

	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

	//check collision
	for (let obs of obstacleManager.obstacles) {
		if (isColliding(player, obs, squareSize)) {
			console.log("Game Over!");
			state.playerScene = state.scenes.GameOver;
			obstacleManager.reset();
			gameStarted = false;
		}
	}

	handleEffects(ctx, player);
	handleSkins(ctx, player);

	obstacleManager.update(canvas.clientHeight);
	obstacleManager.draw(ctx, gridStartX, squareSize);

	gameLoop();
}

// Game Loop
export function gameLoop() {
	if (state.playerScene === state.scenes.Menu) {
		requestAnimationFrame(menuAnimationAndSkinPreview);
	}

	if (state.playerScene === state.scenes.Game) {
		requestAnimationFrame(game);
	}

	if (state.playerScene === state.scenes.SkinSelect) {
		requestAnimationFrame(skinsPreview);
	}

	if (state.playerScene === state.scenes.EffectSelect) {
		requestAnimationFrame(effectsPreview);
	}

	if (state.playerScene === state.scenes.Pause) {
	}

	if (state.playerScene === state.scenes.GameOver) {
		requestAnimationFrame(menuAnimationAndSkinPreview);
	}
}
gameLoop();
