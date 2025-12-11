import { state } from "./script.js";

const menuElement = document.getElementById("menu");
const gameplayElement = document.getElementById("gameplay");
const skinElement = document.getElementById("skins");
const effectElement = document.getElementById("effects");

export function UIManager() {
	if (state.playerScene === state.scenes.Game) {
		menuElement.style.display = "none";
		gameplayElement.style.display = "block";
        skinElement.style.display = "none";
        effectElement.style.display = "none";
	}
	if (state.playerScene === state.scenes.Menu) {
		menuElement.style.display = "block";
		gameplayElement.style.display = "none";
        skinElement.style.display = "none";
        effectElement.style.display = "none";
	}

	if (state.playerScene === state.scenes.EffectSelect) {
		menuElement.style.display = "none";
		gameplayElement.style.display = "none";
        effectElement.style.display = "block";
        skinElement.style.display = "none";
	}

	if (state.playerScene === state.scenes.SkinSelect) {
		menuElement.style.display = "none";
		gameplayElement.style.display = "none";
        skinElement.style.display = "block";
        effectElement.style.display = "none";
	}
}
