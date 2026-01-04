//----------------------------------------------------
import { Player } from "./scripts/player/player.js";
import { EFFECTS, handleEffects, EFFECTS_BY_KEY } from "./scripts/player/effects.js";
import { handleSkins, SKIN_CATEGORIES, SKINS, SKINS_BY_KEY } from "./scripts/player/skins.js";
import { checkScreenSizeForOptimalGameplayMenu, checkScreenSizeForOptimalGameplayGame, checkScreenSizeForOptimalSkinsPreview } from "./scripts/utils/resizer.js";
import { ObstacleManager } from "./scripts/obstaclesManager.js";
import { state } from "./scripts/sceneManager.js";
import { DB_addNewEffectToCollection, DB_addNewSkinToCollection, currentUserState, DB_updateUserHighscore } from "./db/DatabaseConfig.js";
import { clearTreasureAnimations } from "./scripts/utils/treasureShaker.js";
import { canvas, ctx } from "./scripts/UI/ui_other.js";
import { lerp } from "./scripts/player/movementHandler.js";
import { updateSkinMenuUI } from "./scripts/UI/ui_skinSelector.js";
import { rewardPreviewNames } from "./scripts/UI/ui_other.js";
import { calculateCorrection } from "./scripts/utils/timeManager.js";
import { animateSceneTransition } from "./scripts/utils/sceneTransition.js";
import { shakeScreen } from "./scripts/utils/screenShake.js";

//----------------------------------------------------
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("./sw.js")
            .then((reg) => console.log("Service Worker zarejestrowany!", reg))
            .catch((err) => console.log("Błąd Service Workera:", err));
    });

	requestAnimationFrame(gameLoop);
}
//----------------------------------------------------

export const player = new Player(0, 0, 50, "default", "none");
const previewPlayer = new Player(0, 0, 50, "default", "none");
export const obstacleManager = new ObstacleManager();
const buffer = 10;
const COLUMNS = 3;
const ROWS = 3;
const SKINS_PER_PAGE = 9;
export const localHighscore = 0;

export let skinHitboxes = [];

let currentSkinCategoryIndex = 0;
export let currentSkinPage = 0;
//----------------------------------------------------
export function getCurrentSkinCategoryIndex() {
	return currentSkinCategoryIndex;
}

export function nextSkinCategory() {
	currentSkinCategoryIndex = (currentSkinCategoryIndex + 1) % SKIN_CATEGORIES.length;
	currentSkinPage = 0;
}

export function previousSkinCategory() {
	currentSkinCategoryIndex = (currentSkinCategoryIndex - 1 + SKIN_CATEGORIES.length) % SKIN_CATEGORIES.length;
	currentSkinPage = 0;
}

export function getCurrentSkinCategory() {
	return SKIN_CATEGORIES[currentSkinCategoryIndex];
}

export function nextSkinPage() {
	const activeCategory = getCurrentSkinCategory();
	const skinsInCategory = SKINS.filter(s => s.category === activeCategory);
	const maxPages = Math.ceil(skinsInCategory.length / SKINS_PER_PAGE);

	if (currentSkinPage < maxPages - 1) {
		currentSkinPage++;
	}
}

export function previousSkinPage() {
	if (currentSkinPage > 0) {
		currentSkinPage--;
	}
}
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
	var size = checkScreenSizeForOptimalSkinsPreview(canvas, 15);
	const padding = 20;

	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	skinHitboxes = [];

	const activeCategory = getCurrentSkinCategory();
	const allSkinsInCategory = SKINS.filter(s => s.category === activeCategory);

	const totalPages = Math.ceil(allSkinsInCategory.length / SKINS_PER_PAGE);
	const safeTotalPages = totalPages > 0 ? totalPages : 1;

	const startIndex = currentSkinPage * SKINS_PER_PAGE;
	const endIndex = startIndex + SKINS_PER_PAGE;
	const skinsOnCurrentPage = allSkinsInCategory.slice(startIndex, endIndex);

	updateSkinMenuUI(activeCategory, currentSkinPage, safeTotalPages);

	const gridWidth = COLUMNS * size + (COLUMNS - 1) * padding;
	const gridHeight = ROWS * size + (ROWS - 1) * padding;

	const startX = (canvas.clientWidth - gridWidth) / 2;
	const startY = (canvas.clientHeight - gridHeight) / 2;

	skinsOnCurrentPage.forEach((skin, index) => {
		const col = index % COLUMNS;
		const row = Math.floor(index / COLUMNS);

		const x = startX + col * (size + padding);
		const y = startY + row * (size + padding);

		skinHitboxes.push({
			x,
			y,
			size,
			skinKey: skin.key,
		});

		const old = {
			x: player.x,
			y: player.y,
			size: player.baseSize,
			selectedSkin: player.selectedSkin,
		};

		player.x = x;
		player.y = y;
		player.baseSize = size;
		player.selectedSkin = skin.key;

		handleSkins(ctx, player);

		if (currentUserState.data?.unlockedSkins && !currentUserState.data.unlockedSkins.includes(skin.key)) {
			ctx.fillStyle = "rgba(0,0,0,0.5)";
			ctx.fillRect(x, y, size, size);
			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.font = "16px Poppins";
			ctx.fillText("LOCKED", x + size / 2, y + size / 2);
		}

		Object.assign(player, old);
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

function game() {
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


	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

	//check collision
	if (checkCollision(squareSize)) {
		//save highscore
		shakeScreen()
		const currentScore = obstacleManager.score;
		DB_updateUserHighscore(currentScore, localHighscore);
		//reset
		setTimeout(() => {
			//rollReward
			rollRandomReward(currentScore);
			resetPlayerAndObstacles();
		}, 1000)
	}
	handleEffects(ctx, player);
	handleSkins(ctx, player);

	obstacleManager.update(canvas.clientHeight);
	obstacleManager.draw(ctx, gridStartX, squareSize);
}

function checkCollision(squareSize) {
	if(player.isDead == true) return false;
	for (let obs of obstacleManager.obstacles) {
		if (obstacleManager.isColliding(player, obs, squareSize)) {
			player.die();
			return true;
		}
	}
	return false;
}

function rollRandomReward(currentScore) {

	if (currentUserState.user == null || currentUserState.data == null) {
		animateSceneTransition(state.scenes.GameOver);
		return;
	}

	const { notUnlockedSkinsYet, notUnlockedEffectsYet, all } = checkNotUnlocked();

	let RewardChance = 0.01;
	if (currentScore >= 20) RewardChance = 0.10;
	if (currentScore >= 40) RewardChance = 0.15;
	if (currentScore >= 60) RewardChance = 0.25;
	if (currentScore >= 80) RewardChance = 0.29;
	if (currentScore > 100) RewardChance = 0.35;
	//RewardChance = 1;

	if (Math.random() >= RewardChance) {
		animateSceneTransition(state.scenes.GameOver);
		return;
	}

	if (all.length === 0) {
		animateSceneTransition(state.scenes.GameOver);
		return;
	}

	let type = "";
	if (notUnlockedSkinsYet.length == 0 && notUnlockedEffectsYet.length > 0) {
		type = "effect";
	} else if (notUnlockedEffectsYet.length == 0 && notUnlockedSkinsYet.length > 0) {
		type = "skin";
	} else {
		if (Math.random() < 0.5) type = "skin";
		else type = "effect";
	}

	if (type === "skin") {
		// skin
		const randomSkin = notUnlockedSkinsYet[Math.floor(Math.random() * notUnlockedSkinsYet.length)];
		DB_addNewSkinToCollection(randomSkin);

		const skinObj = SKINS_BY_KEY[randomSkin];
		rewardPreviewNames("New Skin Unlocked!", skinObj?.name ?? randomSkin);

		previewPlayer.selectedSkin = randomSkin;
		previewPlayer.selectedEffect = player.selectedEffect;
	} else if (type === "effect") {
		// effect
		const randomEffect = notUnlockedEffectsYet[Math.floor(Math.random() * notUnlockedEffectsYet.length)];
		DB_addNewEffectToCollection(randomEffect);

		const effectObj = EFFECTS_BY_KEY[randomEffect];
		rewardPreviewNames("New Effect Unlocked!", effectObj?.name ?? randomEffect);

		previewPlayer.selectedSkin = player.selectedSkin;
		previewPlayer.selectedEffect = randomEffect;
	}

	animateSceneTransition(state.scenes.Reward);
	clearTreasureAnimations();
}

function checkNotUnlocked() {
	const notUnlockedSkinsYet = SKINS
		.map(s => s.key)
		.filter(k => !currentUserState.data.unlockedSkins.includes(k));

	const notUnlockedEffectsYet = EFFECTS
		.map(e => e.key)
		.filter(k => !currentUserState.data.unlockedEffects.includes(k));

	return {
		notUnlockedSkinsYet,
		notUnlockedEffectsYet,
		all: [...notUnlockedSkinsYet, ...notUnlockedEffectsYet]
	};
}

function resetPlayerAndObstacles() {
	player.lane = 1;
	player.isDead = false;
	obstacleManager.reset();
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
		canvas.clientWidth / 2 - previewPlayer.baseSize / 2,
		canvas.clientHeight / 2 - previewPlayer.baseSize / 2
	);
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

	handleEffects(ctx, previewPlayer);
	handleSkins(ctx, previewPlayer);
}

function pause() { }
//----------------------------------------------------
// Game Loop
function gameLoop(timestamp) {
	calculateCorrection(timestamp);
	switch (state.playerScene) {
		case state.scenes.Menu:
			menuAnimationAndSkinPreview();
			break;
		case state.scenes.Game:
			game();
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