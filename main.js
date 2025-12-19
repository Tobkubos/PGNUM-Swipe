//----------------------------------------------------
import { Player } from "./scripts/player.js";
import { EFFECTS_COUNT, handleEffects } from "./scripts/effects.js";
import { handleSkins, SKINS, SKINS_COUNT } from "./scripts/skins.js";
import { checkScreenSizeForOptimalGameplayMenu, checkScreenSizeForOptimalGameplayGame, checkScreenSizeForOptimalSkinsPreview } from "./utils/resizer.js";
import { ObstacleManager } from "./scripts/obstaclesManager.js";
import { SceneSwitchManager, state } from "./scripts/sceneManager.js";
import { DB_addNewEffectToCollection, DB_addNewSkinToCollection, currentUserState, DB_updateUserHighscore } from "./db/DatabaseConfig.js";
import { clearTreasureAnimations } from "./scripts/treasureShaker.js";
import { canvas, ctx } from "./scripts/canvasManager.js";
import { lerp } from "./scripts/movementHandler.js";
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

export const player = new Player(0, 0, 50, 0, 0);
const previewPlayer = new Player(0, 0, 50, 0, 0);
const obstacleManager = new ObstacleManager();
const buffer = 10;
const COLUMNS = 4;
export let skinHitboxes = [];
//----------------------------------------------------

function menuAnimationAndSkinPreview() {
	var playerInMenuSize = checkScreenSizeForOptimalGameplayMenu(canvas);
	player.baseSize = playerInMenuSize;
	player.setPlayerPosition(canvas.clientWidth / 2 - player.baseSize / 2, canvas.clientHeight / 2 - player.baseSize / 2);
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	handleEffects(ctx, player);
	handleSkins(ctx, player);
}

function skinsPreview() {
	var size = checkScreenSizeForOptimalSkinsPreview(canvas, 40);
	const padding = 20;

	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	skinHitboxes = [];
	const rows = Math.ceil(SKINS_COUNT / COLUMNS);

	// ROZMIAR CAŁEJ SIATKI
	const gridWidth = COLUMNS * size + (COLUMNS - 1) * padding;
	const gridHeight = rows * size + (rows - 1) * padding;

	// WYŚRODKOWANIE
	const startX = (canvas.clientWidth - gridWidth) / 2;
	const startY = (canvas.clientHeight - gridHeight) / 2;

	SKINS.forEach(skin => {
		const col = skin.id % COLUMNS;
		const row = Math.floor(skin.id / COLUMNS);

		const x = startX + col * (size + padding);
		const y = startY + row * (size + padding);

		skinHitboxes.push({
			x: x,
			y: y,
			size: size,
			skinId: skin.id,
		});

		const oldX = player.x;
		const oldY = player.y;
		const oldSkin = player.selectedSkin;
		const oldSize = player.baseSize;

		player.x = x;
		player.y = y;
		player.baseSize = size;
		player.selectedSkin = skin.id;

		handleSkins(ctx, player);

		if (!currentUserState.data?.unlockedSkins.includes(skin.id)) {
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
	});
}

function effectsPreview() {
	var playerInMenuSize = checkScreenSizeForOptimalGameplayMenu(canvas);
	player.baseSize = playerInMenuSize;
	player.setPlayerPosition(canvas.clientWidth / 2 - player.baseSize / 2, canvas.clientHeight / 2 - player.baseSize / 2);
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
		ctx.fillText(
			"LOCKED",
			overlayX + overlaySize / 2,
			overlayY + overlaySize / 2
		);
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
	const targetX =
		gridStartX + player.lane * squareSize + (squareSize - playerSize) / 2;
	const targetY = canvas.clientHeight - player.baseSize - 100;

	player.x = lerp(player.x, targetX, 0.2);
	player.y = targetY;


	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

	//check collision
	for (let obs of obstacleManager.obstacles) {
		if (obstacleManager.isColliding(player, obs, squareSize)) {
			let isReward = Math.random();
			console.log("Game Over!");
			player.lane = 1;
			const currentScore = obstacleManager.score;
			obstacleManager.reset();

			DB_updateUserHighscore(currentScore);


			if (currentUserState.user != null && currentUserState.data != null && isReward > 0.1) {
				let isSkinOrEffect = Math.random();

				const notUnlockedSkinsYet = [];
				for (let i = 0; i < SKINS_COUNT; i++) {
					if (!currentUserState.data.unlockedSkins.includes(i)) {
						notUnlockedSkinsYet.push(i);
					}
				}

				const notUnlockedEffectsYet = [];
				for (let i = 0; i < EFFECTS_COUNT; i++) {
					if (!currentUserState.data.unlockedEffects.includes(i)) {
						notUnlockedEffectsYet.push(i);
					}
				}

				const notUnlockedAll = notUnlockedEffectsYet + notUnlockedEffectsYet;

				if (isSkinOrEffect > 0.5) {
					//random skin
					if (notUnlockedSkinsYet.length > 0) {
						const randomIndex = Math.floor(
							Math.random() * notUnlockedSkinsYet.length
						);
						const randomSkin = notUnlockedSkinsYet[randomIndex];
						DB_addNewSkinToCollection(randomSkin);
						previewPlayer.selectedSkin = randomSkin;
						previewPlayer.selectedEffect = player.selectedEffect;
					}
				} else {
					//random effect
					if (notUnlockedEffectsYet.length > 0) {
						const randomIndex = Math.floor(
							Math.random() * notUnlockedEffectsYet.length
						);
						const randomEffect = notUnlockedEffectsYet[randomIndex];
						DB_addNewEffectToCollection(randomEffect);
						previewPlayer.selectedSkin = player.selectedSkin;
						previewPlayer.selectedEffect = randomEffect;
					}
				}
				state.playerScene = state.scenes.Reward;
				clearTreasureAnimations();
			} else {
				state.playerScene = state.scenes.GameOver;
			}
			SceneSwitchManager();
		}
	}

	handleEffects(ctx, player);
	handleSkins(ctx, player);

	obstacleManager.update(canvas.clientHeight, correction);
	obstacleManager.draw(ctx, gridStartX, squareSize);
}

function gameOver() {
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

function reward() {
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

function rewardPreview() {
	var playerInMenuSize = checkScreenSizeForOptimalGameplayMenu(canvas);
	previewPlayer.baseSize = playerInMenuSize;
	previewPlayer.setPlayerPosition(
		canvas.clientWidth / 2 - player.baseSize / 2,
		canvas.clientHeight / 2 - player.baseSize / 2
	);
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

	handleEffects(ctx, previewPlayer);
	handleSkins(ctx, previewPlayer);
}

function pause() { }
//----------------------------------------------------
// Game Loop
let lastTime = 0;
function gameLoop(timestamp) {
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
		case state.scenes.RewardPreview:
			rewardPreview();
	}
	requestAnimationFrame(gameLoop);
}
gameLoop();
