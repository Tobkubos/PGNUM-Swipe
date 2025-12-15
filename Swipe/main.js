//----------------------------------------------------
import { Player } from "./scripts/player.js";
import { handleEffects } from "./scripts/effects.js";
import { handleSkins } from "./scripts/skins.js";
import {
	checkScreenSizeForOptimalGameplayMenu,
	checkScreenSizeForOptimalGameplayGame,
	checkScreenSizeForOptimalSkinsPreview
} from "./utils/resizer.js";
import { ObstacleManager } from "./scripts/obstaclesManager.js";
import { UIManager, state } from "./scripts/sceneManager.js";
import { currentUserState, updateUserHighscore } from "./db/DatabaseConfig.js";
import { enterRewardScene } from "./scripts/shaker.js";
import { canvas, ctx } from "./scripts/canvasManager.js";
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

const off = new OffscreenCanvas(canvas.width, canvas.height);
const offCtx = off.getContext("2d");

export const player = new Player(0, 0, 50, 0, 0);
const obstacleManager = new ObstacleManager();
let gameStarted = false;
const buffer = 10;

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

function menuAnimationAndSkinPreview() {
	var playerInMenuSize = checkScreenSizeForOptimalGameplayMenu(canvas);
	player.baseSize = playerInMenuSize;
	player.setPlayerPosition(
		canvas.clientWidth / 2 - player.baseSize / 2,
		canvas.clientHeight / 2 - player.baseSize / 2
	);
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	handleEffects(ctx, player);
	handleSkins(ctx, player);
}

const NUMBER_OF_SKINS = 16;
const COLUMNS = 4;

export let skinHitboxes = [];

export function skinsPreview() {
	var size = checkScreenSizeForOptimalSkinsPreview(canvas, 40);
	const padding = 20;

	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	skinHitboxes = [];
	const rows = Math.ceil(NUMBER_OF_SKINS / COLUMNS);

	// ROZMIAR CAŁEJ SIATKI
	const gridWidth = COLUMNS * size + (COLUMNS - 1) * padding;
	const gridHeight = rows * (size) + (rows - 1) * padding;

	// WYŚRODKOWANIE
	const startX = (canvas.clientWidth - gridWidth) / 2;
	const startY = (canvas.clientHeight - gridHeight) / 2;

	for (let skinId = 0; skinId < NUMBER_OF_SKINS; skinId++) {
		const col = skinId % COLUMNS;
		const row = Math.floor(skinId / COLUMNS);

		const x = startX + col * (size + padding);
		const y = startY + row * (size + padding);

		skinHitboxes.push({
			x: x,
			y: y,
			size: size,
			skinId: skinId
		});

		const oldX = player.x;
		const oldY = player.y;
		const oldSkin = player.selectedSkin;
		const oldSize = player.baseSize;

		player.x = x;
		player.y = y;
		player.baseSize = size;
		player.selectedSkin = skinId;

		handleSkins(ctx, player);

		if (!currentUserState.data?.unlockedSkins.includes(skinId)) {
			ctx.fillStyle = "rgba(0,0,0,0.5)";
			ctx.fillRect(x, y, size, size);
			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.fillText("LOCKED", x + size / 2, y + size / 2);
		}

		player.x = oldX;
		player.y = oldY;
		player.selectedSkin = oldSkin;
		player.baseSize = oldSize;
	}
}

function effectsPreview() {
	var playerInMenuSize = checkScreenSizeForOptimalGameplayMenu(canvas);
	player.baseSize = playerInMenuSize;
	player.setPlayerPosition(
		canvas.clientWidth / 2 - player.baseSize / 2,
		canvas.clientHeight / 2 - player.baseSize / 2
	);
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

	handleEffects(ctx, player);
	handleSkins(ctx, player);

	if (!currentUserState.data?.unlockedEffects.includes(player.selectedEffect)) {
		ctx.save();
		ctx.fillStyle = "rgba(0,0,0,0.6)";
		const overlaySize = player.baseSize * 2;
		const overlayX = player.x - (overlaySize - player.baseSize) / 2;
		const overlayY = player.y - (overlaySize - player.baseSize) / 2;
		ctx.fillRect(overlayX, overlayY, overlaySize, overlaySize);
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.font = `${Math.max(12, Math.floor(player.baseSize / 2.5))}px Poppins`;
		ctx.fillText("LOCKED", overlayX + overlaySize / 2, overlayY + overlaySize / 2);
		ctx.restore();
	}
}

function game(correction = 1) {
	const { squareSize, playerSize } = checkScreenSizeForOptimalGameplayGame(
		canvas,
		buffer
	);
	player.baseSize = playerSize;

	const totalWidth = squareSize * 3;
	const gridStartX = (canvas.clientWidth - totalWidth) / 2;
	const targetX = gridStartX + player.lane * squareSize + (squareSize - playerSize) / 2;
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
		if (obstacleManager.isColliding(player, obs, squareSize)) {
			let isReward = Math.random()
			console.log("Game Over!");
			gameStarted = false;
			player.lane = 1;
			const currentScore = obstacleManager.score;
			obstacleManager.reset();

			if (currentUserState.data != null) {
				if (currentScore > currentUserState.data.highScore)
					updateUserHighscore(currentScore)
			}

			if (isReward > 0.5) {
				state.playerScene = state.scenes.GameOver;
			}
			else {
				state.playerScene = state.scenes.Reward;
				enterRewardScene()
			}


			UIManager()
			gameStarted = false;
		}
	}

	handleEffects(ctx, player);
	handleSkins(ctx, player);

	obstacleManager.update(canvas.clientHeight, correction);
	obstacleManager.draw(ctx, gridStartX, squareSize);
}

function pause() {
}

function gameOver() {
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

function reward() {
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

//----------------------------------------------------
// Game Loop
let lastTime = 0;
export function gameLoop(timestamp) {
	if (!timestamp) timestamp = 0;

	const deltaTime = timestamp - lastTime;
	lastTime = timestamp;
	let correction = deltaTime / (1000 / 60);

	if (isNaN(correction) || correction > 5) correction = 1;

	switch (state.playerScene) {
		case state.scenes.Menu:
			menuAnimationAndSkinPreview();
			break;
		case state.scenes.Game:
			game(correction);
			break;
		case state.scenes.SkinSelect:
			skinsPreview();
			break;
		case state.scenes.EffectSelect:
			effectsPreview();
			break;
		case state.scenes.Pause:
			pause();
			break;
		case state.scenes.GameOver:
			gameOver();
			break;
		case state.scenes.Reward:
			reward();
			break;
	}
	requestAnimationFrame(gameLoop);
}
gameLoop();
