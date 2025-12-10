import { state } from "./script.js";

export function UIManager() {
    if (state.playerScene === state.scenes.Game) {
        const menuElement = document.getElementById("menu");
        menuElement.style.display = "none"

        const gameplayElement = document.getElementById("gameplay");
        gameplayElement.style.display = "block";
    }
    if (state.playerScene === state.scenes.Menu) {
        const menuElement = document.getElementById("menu");
        menuElement.style.display = "block";
        const gameplayElement = document.getElementById("gameplay");
        gameplayElement.style.display = "none";
    }
}

