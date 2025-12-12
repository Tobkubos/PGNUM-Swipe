const menuElement = document.getElementById("menu");
const gameplayElement = document.getElementById("gameplay");
const skinElement = document.getElementById("skins");
const effectElement = document.getElementById("effects");

export const state = {
	playerScene: "Menu",
	scenes: {
		Menu: "Menu",
		SkinSelect: "SkinSelect",
		EffectSelect: "EffectSelect",
		Game: "Game",
		Pause: "Pause",
		GameOver: "GameOver",
	},
};

var Ui = [
	menuElement,
	gameplayElement,
	skinElement,
	effectElement
];

export function UIManager() {
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
}

