import { state } from "./sceneManager.js";
import { UIManager } from "./sceneManager.js";
import { loginAndCreateProfile, currentUserState, saveSelectedSkin, logoutUser, saveSelectedEffect, getTop10Scores } from "./db/DatabaseConfig.js";
import {player, skinHitboxes } from "./main.js";
import { canvas } from "./scripts/canvasManager.js";
//----------------------------------------------------
//start button
document.querySelector(".start-btn").addEventListener("click", () => {
    state.playerScene = state.scenes.Game;
    console.log("Game Started");
    UIManager();
});

const pausePanel = document.getElementById("pause-panel");
const pauseBtn = document.querySelector(".pause-btn");
const resumeGameBtn = document.querySelector(".close-pause-btn");

resumeGameBtn.addEventListener("click", () => {
    state.playerScene = state.scenes.Game;
    if (pausePanel) pausePanel.style.display = "none";
    console.log("Game Resumed");
    UIManager();
});

pauseBtn.addEventListener("click", () => {
    state.playerScene = state.scenes.Pause;
    if (pausePanel) pausePanel.style.display = "block";
    console.log("Game Paused");
    UIManager();
});
export const gameScoreText = document.getElementById("score-display");

//----------------------------------------------------
//highscore info
export const highscoreText = document.querySelector(".menu-info-highscore");
export function updateScoreText(score){
    gameScoreText.innerText = score;
} 

//----------------------------------------------------
//how to play button
const howToBtn = document.querySelector(".how-to-play-btn");
const howToPanel = document.getElementById("how-to-play-panel");
const closeHowTo = document.querySelector(".close-how-to-play");

howToBtn.addEventListener("click", () => {
    if (howToPanel) howToPanel.style.display = "block";
});

closeHowTo?.addEventListener("click", () => {
    if (howToPanel) howToPanel.style.display = "none";
});

//----------------------------------------------------
//highscores button
const highscoresBtn = document.querySelector(".highscore-btn");
const highscoresPanel = document.getElementById("highscores-panel");
const closeHighscores = document.querySelector(".close-highscores");
const highscoresTop10 = document.querySelector(".highscores-top10");

highscoresBtn.addEventListener("click", async() => {
    if (highscoresPanel) highscoresPanel.style.display = "block";
    
    const top10 = await getTop10Scores();

    top10.forEach((plr, index) => {
        highscoresTop10.innerHTML += `
            <div class="highscore-row">
                ${index + 1}. ${plr.username} — ${plr.highScore}
            </div>
        `;
    });
});

closeHighscores?.addEventListener("click", () => {
    highscoresTop10.innerHTML = "";
    if (highscoresPanel) highscoresPanel.style.display = "none";
});

//----------------------------------------------------
//options button
const optionsBtn = document.querySelector(".options-btn");
const optionsPanel = document.getElementById("options-panel");
const closeOptions = document.querySelector(".close-options");
optionsBtn.addEventListener("click", () => {
    if (optionsPanel) optionsPanel.style.display = "block";
}
);

closeOptions?.addEventListener("click", () => {
    if (optionsPanel) optionsPanel.style.display = "none";
});

const loginBtn = document.querySelector(".login-btn");
loginBtn.addEventListener("click", async () => { await loginAndCreateProfile(); });

const logoutBtn = document.querySelector(".logout-btn");
logoutBtn.addEventListener("click", async () => { await logoutUser(); });


;

//----------------------------------------------------
//title animation
const title = document.querySelector(".menu-game-name");
if (title && !title.querySelector("span")) {
    const text = title.innerText;
    title.innerHTML = "";
    [...text].forEach((char, index) => {
        const span = document.createElement("span");
        span.innerText = char;
        span.style.setProperty("--i", index + 1);
        title.appendChild(span);
    });
}

//----------------------------------------------------
const skinBtn = document.querySelector(".skins-btn");
const effectBtn = document.querySelector(".effects-btn");

const closeSkinCustomizationBtn = document.querySelector(".close-skin-customization-btn");
const closeEffectCustomizationBtn = document.querySelector(".close-effect-customization-btn");

const previousEffectBtn = document.querySelector(".change-previous");
const nextEffectBtn = document.querySelector(".change-next");

const effectIdDisplay = document.getElementById("effect-id");

previousEffectBtn?.addEventListener("click", () => {
    previousEffect();
});

nextEffectBtn?.addEventListener("click", () => {
    nextEffect();
});

effectBtn.addEventListener("click", () => {
    state.playerScene = state.scenes.EffectSelect;
    effectIdDisplay.innerText = `effect number: ${player.selectedEffect}`;
    UIManager();
});

skinBtn.addEventListener("click", () => {
    state.playerScene = state.scenes.SkinSelect;
    UIManager();
});

closeSkinCustomizationBtn?.addEventListener("click", () => {
    state.playerScene = state.scenes.Menu;
    UIManager();
});

closeEffectCustomizationBtn?.addEventListener("click", () => {
    state.playerScene = state.scenes.Menu;
    if (currentUserState.data?.unlockedEffects.includes(player.selectedEffect)) {
        console.log("mam taki efekt odblokowany")
        saveSelectedEffect(player.selectedEffect)
    }
    else {
        console.log("nie mam tego skina")
        player.selectedEffect = currentUserState.data.saveSelectedEffect
        saveSelectedEffect(currentUserState.data.saveSelectedEffect)
    }
    UIManager();
});

canvas.addEventListener("click", (e) => {
    if (state.playerScene !== state.scenes.SkinSelect) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    for (let hitbox of skinHitboxes) {
        if (
            clickX >= hitbox.x &&
            clickX <= hitbox.x + hitbox.size &&
            clickY >= hitbox.y &&
            clickY <= hitbox.y + hitbox.size
        ) {
            if (currentUserState.data === null) return;
            if (currentUserState.data.unlockedSkins.includes(hitbox.skinId)) {
                player.selectedSkin = hitbox.skinId;
                state.playerScene = state.scenes.Menu;
                saveSelectedSkin(hitbox.skinId);
                UIManager();
            }
        }
    }
});

function previousEffect() {
    if (currentUserState.data === null) return;

    if (player.selectedEffect > 0) {
        player.selectedEffect--;
    }
    effectIdDisplay.innerText = `effect number: ${player.selectedEffect}`;
}

function nextEffect() {
    if (currentUserState.data === null) return;

    if (player.selectedEffect < 25) {
        player.selectedEffect++;
    }
    effectIdDisplay.innerText = `effect number: ${player.selectedEffect}`;
}

const restartGameBtn = document.querySelector(".restart-game-btn")
const goToMenu = document.querySelectorAll(".go-to-menu-btn")

restartGameBtn?.addEventListener("click", () => {
    state.playerScene = state.scenes.Game;
    console.log("Restarted");
    UIManager();
});

goToMenu.forEach(btn => {btn.addEventListener("click", () => {
    state.playerScene = state.scenes.Menu;
    console.log("Went to menu");
    UIManager();
})});

