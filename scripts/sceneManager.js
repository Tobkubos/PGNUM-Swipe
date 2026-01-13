
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