import { state } from "./sceneManager.js";
import { SceneSwitchManager } from "./sceneManager.js";
import { DB_loginAndCreateProfile, currentUserState, DB_saveSelectedSkin, DB_logoutUser, DB_saveSelectedEffect, DB_getTop10Scores } from "../db/DatabaseConfig.js";
import { player, skinHitboxes } from "../main.js";
import { canvas } from "./canvasManager.js";
import { EFFECT_KEYS, EFFECTS_BY_KEY } from "./effects.js";
import { nextSkinCategory, previousSkinCategory, previousSkinPage, nextSkinPage } from "../main.js";
//----------------------------------------------------
//start button
document.querySelector(".start-btn").addEventListener("click", () => {
    state.playerScene = state.scenes.Game;
    console.log("Game Started");
    SceneSwitchManager();
});

const pausePanel = document.getElementById("pause-panel");
const pauseBtn = document.querySelector(".pause-btn");
const resumeGameBtn = document.querySelector(".close-pause-btn");

resumeGameBtn.addEventListener("click", () => {
    state.playerScene = state.scenes.Game;
    if (pausePanel) pausePanel.style.display = "none";
    console.log("Game Resumed");
    SceneSwitchManager();
});

pauseBtn.addEventListener("click", () => {
    state.playerScene = state.scenes.Pause;
    if (pausePanel) pausePanel.style.display = "block";
    console.log("Game Paused");
    SceneSwitchManager();
});
export const gameScoreText = document.getElementById("score-display");

//----------------------------------------------------
//highscore info
export const highscoreText = document.querySelector(".menu-info-highscore");
export function updateScoreText(score) {
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

highscoresBtn.addEventListener("click", async () => {
    if (highscoresPanel) highscoresPanel.style.display = "block";

    const top10 = await DB_getTop10Scores();

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
loginBtn.addEventListener("click", async () => { await DB_loginAndCreateProfile(); });

const logoutBtn = document.querySelector(".logout-btn");
logoutBtn.addEventListener("click", async () => { await DB_logoutUser(); });

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

const uiSkinPagePrevBtn = document.querySelector(".change-skin-page-previous");
const uiSkinPageNextBtn = document.querySelector(".change-skin-page-next");
const uiSkinPageCounter = document.getElementById("skins-footer-page");
const uiSkinCategoryHeader = document.getElementById("skins-header-category");
const uiChangeSkinCategoryNext = document.querySelector(".change-skin-category-next");
const uiChangeSkinCategoryPrevious = document.querySelector(".change-skin-category-previous");

export function updateSkinMenuUI(categoryName, currentPage, totalPages) {
    if (uiSkinCategoryHeader) {
        uiSkinCategoryHeader.innerText = categoryName.toUpperCase();
    }

    if (uiSkinPageCounter) {
        uiSkinPageCounter.innerText = `${currentPage + 1} / ${totalPages}`;
    }

    if (uiSkinPagePrevBtn) {
        if (currentPage > 0) {
            uiSkinPagePrevBtn.style.opacity = "1";
            uiSkinPagePrevBtn.style.filter = "grayscale(0%)";
            uiSkinPagePrevBtn.style.cursor = "pointer";
            uiSkinPagePrevBtn.style.pointerEvents = "auto";
        } else {
            uiSkinPagePrevBtn.style.opacity = "0.3";
            uiSkinPagePrevBtn.style.filter = "grayscale(100%)";
            uiSkinPagePrevBtn.style.cursor = "default";
            uiSkinPagePrevBtn.style.pointerEvents = "none";
        }
    }

    if (uiSkinPageNextBtn) {
        if (currentPage < totalPages - 1) {
            uiSkinPageNextBtn.style.opacity = "1";
            uiSkinPageNextBtn.style.filter = "grayscale(0%)";
            uiSkinPageNextBtn.style.cursor = "pointer";
            uiSkinPageNextBtn.style.pointerEvents = "auto";
        } else {
            uiSkinPageNextBtn.style.opacity = "0.3";
            uiSkinPageNextBtn.style.filter = "grayscale(100%)";
            uiSkinPageNextBtn.style.cursor = "default";
            uiSkinPageNextBtn.style.pointerEvents = "none";
        }
    }
}
uiChangeSkinCategoryNext?.addEventListener("click", nextSkinCategory);
uiChangeSkinCategoryPrevious?.addEventListener("click", previousSkinCategory);
uiSkinPagePrevBtn?.addEventListener("click", previousSkinPage);
uiSkinPageNextBtn?.addEventListener("click", nextSkinPage);

previousEffectBtn?.addEventListener("click", () => {
    previousEffect();
});

nextEffectBtn?.addEventListener("click", () => {
    nextEffect();
});

effectBtn?.addEventListener("click", () => {
    if (!isLogged()) return;
    state.playerScene = state.scenes.EffectSelect;
    updateEffectDisplay(); 
    SceneSwitchManager();
});

skinBtn.addEventListener("click", () => {
    if (!isLogged()) return;
    state.playerScene = state.scenes.SkinSelect;
    SceneSwitchManager();
});

closeSkinCustomizationBtn?.addEventListener("click", () => {
    state.playerScene = state.scenes.Menu;
    SceneSwitchManager();
});


closeEffectCustomizationBtn?.addEventListener("click", () => {
    state.playerScene = state.scenes.Menu;
    if (currentUserState.data?.unlockedEffects.includes(player.selectedEffect)) {
        console.log("mam taki efekt odblokowany")
        DB_saveSelectedEffect(player.selectedEffect)
    }
    else {
        console.log("nie mam tego efektu")
        player.selectedEffect = currentUserState.data.savedSelectedEffect
        DB_saveSelectedEffect(currentUserState.data.savedSelectedEffect)
    }
    SceneSwitchManager();
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
            if (currentUserState.data.unlockedSkins.includes(hitbox.skinKey)) {
                player.selectedSkin = hitbox.skinKey;
                DB_saveSelectedSkin(hitbox.skinKey);
                state.playerScene = state.scenes.Menu;
                SceneSwitchManager();
            }
        }
    }
});

function updateEffectDisplay() {
    if (!effectIdDisplay) return;

    const currentEffectObj = EFFECTS_BY_KEY[player.selectedEffect];
    const displayName = currentEffectObj ? currentEffectObj.name : player.selectedEffect;
    effectIdDisplay.innerText = `Effect: ${displayName}`;
}

function previousEffect() {
    if (currentUserState.data === null) return;

    let currentIndex = EFFECT_KEYS.indexOf(player.selectedEffect);
    if (currentIndex === -1) currentIndex = 0;

    if (currentIndex > 0) {
        currentIndex--;
        player.selectedEffect = EFFECT_KEYS[currentIndex];
        updateEffectDisplay();
    }
}

function nextEffect() {
    if (currentUserState.data === null) return;

    let currentIndex = EFFECT_KEYS.indexOf(player.selectedEffect);
    if (currentIndex === -1) currentIndex = 0;

    if (currentIndex < EFFECT_KEYS.length - 1) {
        currentIndex++;
        player.selectedEffect = EFFECT_KEYS[currentIndex];
        updateEffectDisplay();
    }
}

//-----------------------------------------------------------------
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

let toastTimeout;

function showToast(text) {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = text;
    toast.classList.add("show");

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

function isLogged() {
    if (currentUserState.data == null || currentUserState.user == null) {
        showToast("Unlock by logging in OPTIONS!");
        return false;
    }
    return true;
}