import { state, SceneSwitchManager } from "../sceneManager.js";

const restartGameBtn = document.querySelector(".restart-game-btn")
const goToMenu = document.querySelectorAll(".go-to-menu-btn")

restartGameBtn?.addEventListener("click", () => {
    state.playerScene = state.scenes.Game;
    console.log("Restarted");
    SceneSwitchManager();
});

goToMenu.forEach(btn => {
    btn.addEventListener("click", () => {
        state.playerScene = state.scenes.Menu;
        console.log("Went to menu");
        SceneSwitchManager();
    })
});

