import { state, SceneSwitchManager } from "../sceneManager.js";
import { currentUserState, DB_saveSelectedEffect, isLogged  } from "../../db/DatabaseConfig.js";
import { player } from "../../main.js";
import { deleteAllParticles, EFFECT_KEYS, EFFECTS_BY_KEY } from "../effects.js";

const effectBtn = document.querySelector(".effects-btn");
const closeEffectCustomizationBtn = document.querySelector(".close-effect-customization-btn");

const previousEffectBtn = document.querySelector(".change-previous");
const nextEffectBtn = document.querySelector(".change-next");

const effectNameDisplay = document.getElementById("effect-id");
const effectNumber = document.getElementById("effects-number");

function updateEffectDisplay() {
    if (!effectNameDisplay) return;

    deleteAllParticles();

    let currentIndex = EFFECT_KEYS.indexOf(player.selectedEffect);
    if (currentIndex === -1) currentIndex = 0;

    const currentEffectObj = EFFECTS_BY_KEY[player.selectedEffect];
    const displayName = currentEffectObj ? currentEffectObj.name : player.selectedEffect;

    effectNameDisplay.innerText = displayName;
    effectNumber.innerHTML = `${currentIndex + 1} / ${EFFECT_KEYS.length}`;
}


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

effectBtn?.addEventListener("click", () => {
    if (!isLogged()) return;
    state.playerScene = state.scenes.EffectSelect;
    updateEffectDisplay(); 
    SceneSwitchManager();
});

previousEffectBtn?.addEventListener("click", () => {
    previousEffect();
});

nextEffectBtn?.addEventListener("click", () => {
    nextEffect();
});


function previousEffect() {
    if (currentUserState.data === null) return;

    let currentIndex = EFFECT_KEYS.indexOf(player.selectedEffect);
    if (currentIndex === -1) currentIndex = 0;

    if (currentIndex > 0) {
        currentIndex--;
        player.selectedEffect = EFFECT_KEYS[currentIndex];
        updateEffectDisplay(currentIndex);
    }
}

function nextEffect() {
    if (currentUserState.data === null) return;

    let currentIndex = EFFECT_KEYS.indexOf(player.selectedEffect);
    if (currentIndex === -1) currentIndex = 0;

    if (currentIndex < EFFECT_KEYS.length - 1) {
        currentIndex++;
        player.selectedEffect = EFFECT_KEYS[currentIndex];
        updateEffectDisplay(currentIndex);
    }
}