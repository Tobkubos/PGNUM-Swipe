import { state } from "./uiManager.js";
import { UIManager } from "./uiManager.js";
import { loginAndCreateProfile } from "./db/DatabaseConfig.js";

//----------------------------------------------------
//start button
document.querySelector(".start-btn").addEventListener("click", () => {
    state.playerScene = state.scenes.Game;
    console.log("Game Started");
    UIManager();
});
//----------------------------------------------------
//highscore info
export const highscoreText = document.querySelector(".menu-info-highscore");

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

highscoresBtn.addEventListener("click", () => {
    if (highscoresPanel) highscoresPanel.style.display = "block";
    const highscoresTop10 = document.querySelector(".highscores-top10");
    const highscoresYourPlace = document.querySelector(".highscores-yourPlace");
    highscoresTop10.innerHTML = "TOP 10";
    highscoresYourPlace.innerHTML = "Your Place: 15th";
});

closeHighscores?.addEventListener("click", () => {
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

effectBtn.addEventListener("click", () => {
    state.playerScene = state.scenes.EffectSelect;
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
    UIManager();
});
