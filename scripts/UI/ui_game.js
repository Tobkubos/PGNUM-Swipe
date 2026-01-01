import { state, SceneSwitchManager } from "../sceneManager.js";
import { animateSceneTransition } from "../utils/sceneTransition.js";

const restartGameBtn = document.querySelector(".restart-game-btn")
const goToMenu = document.querySelectorAll(".go-to-menu-btn")

restartGameBtn?.addEventListener("click", () => {
        animateSceneTransition(state.scenes.Game);
    console.log("Restarted");
});

goToMenu.forEach(btn => {
    btn.addEventListener("click", () => {
        animateSceneTransition(state.scenes.Menu);
        console.log("Went to menu");
    })
});

