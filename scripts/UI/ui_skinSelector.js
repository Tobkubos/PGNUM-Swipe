import { state, SceneSwitchManager } from "../sceneManager.js";
import { currentUserState, DB_saveSelectedSkin, isLogged  } from "../../db/DatabaseConfig.js";
import { player, skinHitboxes } from "../../main.js";
import { canvas} from "./ui_other.js";
import { nextSkinCategory, previousSkinCategory, previousSkinPage, nextSkinPage } from "../../main.js";
import { animateSceneTransition } from "../utils/sceneTransition.js";

const skinBtn = document.querySelector(".skins-btn");
const closeSkinCustomizationBtn = document.querySelector(".close-skin-customization-btn");
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

skinBtn.addEventListener("click", () => {
    if (!isLogged()) return;
    animateSceneTransition(state.scenes.SkinSelect);
});

closeSkinCustomizationBtn?.addEventListener("click", () => {
    animateSceneTransition(state.scenes.Menu);
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

