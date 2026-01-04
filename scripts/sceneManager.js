
import { currentUserState } from "../db/DatabaseConfig.js";
import { deleteAllParticles } from "./player/effects.js";
import { showToast } from "./UI/ui_other.js";

const menuElement = document.getElementById("menu");
const gameplayElement = document.getElementById("gameplay");
const skinElement = document.getElementById("skins");
const effectElement = document.getElementById("effects");
const gameOverElement = document.getElementById("gameover");
const rewardElement = document.getElementById("reward");
const rewardPreviewElement = document.getElementById("reward-preview");

export const state = {
	playerScene: "Menu",
	scenes: {
		Menu: "Menu",
		SkinSelect: "SkinSelect",
		EffectSelect: "EffectSelect",
		Game: "Game",
		Pause: "Pause",
		GameOver: "GameOver",
		Reward: "Reward",
		RewardPreview: "Reward-preview"
	},
};

var Ui = [
	menuElement,
	gameplayElement,
	skinElement,
	effectElement,
	gameOverElement,
	rewardElement,
	rewardPreviewElement
];

export function SceneSwitchManager() {
	deleteAllParticles();

	if (state.playerScene === state.scenes.Game) {
		Ui.forEach(element => {
			element.style.display = "none";
		});
		gameplayElement.style.display = "block";
	}
	if (state.playerScene === state.scenes.Menu) {
		Ui.forEach(element => {
			element.style.display = "none";
		});
		menuElement.style.display = "block";
	}

	if (state.playerScene === state.scenes.EffectSelect) {
		Ui.forEach(element => {
			element.style.display = "none";
		});
		effectElement.style.display = "block";
	}

	if (state.playerScene === state.scenes.SkinSelect) {
		Ui.forEach(element => {
			element.style.display = "none";
		});
		skinElement.style.display = "block";
	}

	if (state.playerScene === state.scenes.GameOver) {
		Ui.forEach(element => {
			element.style.display = "none";
		});
		gameOverElement.style.display = "block";
	}

	if (state.playerScene === state.scenes.Reward) {
		Ui.forEach(element => {
			element.style.display = "none";
		});
		rewardElement.style.display = "block";
	}

	if (state.playerScene === state.scenes.RewardPreview) {
		Ui.forEach(element => {
			element.style.display = "none";
		});
		rewardPreviewElement.style.display = "block";
	}
}


const statusDiv = document.getElementById("user-status");
const loginBtn = document.querySelector(".login-btn");
const scoreEl = document.querySelector(".menu-info-highscore");
const logoutBtn = document.querySelector(".logout-btn");
const lockOverlay = document.querySelectorAll(".lock-overlay");
const lockedOpacity = document.querySelectorAll(".menu-btn.locked");

export function updateUI() {
	if (statusDiv) {
		statusDiv.innerText = currentUserState.user
			? `Logged as: ${currentUserState.user.displayName}`
			: "Data unlinked - not logged in";
	}
	if (loginBtn) {
		loginBtn.style.display = currentUserState.user ? "none" : "block";
	}
	if (scoreEl) {
		scoreEl.innerText = currentUserState.data?.highScore ?? 0;
	}
	if (logoutBtn) {
		logoutBtn.style.display = currentUserState.user ? "block" : "none";
	}
	if (lockOverlay) {
		lockOverlay.forEach(element => {
			element.style.display = currentUserState.user ? "none" : "block";
		});
	}
	if (lockedOpacity) {
		lockedOpacity.forEach(element => {
			element.style.opacity = currentUserState.user ? 1 : 0.5;
		});
	}
}

export function updateHighscoreLOCAL(newHighscoreLOCAL) {
	if (scoreEl) {
		scoreEl.innerText = newHighscoreLOCAL ?? 0;
	}
}

