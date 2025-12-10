import { state, } from "./script.js";
import { UIManager } from "./uiManager.js";
import { getUserHighscore, loginAndCreateProfile } from "./db/DatabaseConfig.js";

//----------------------------------------------------
//start button
document.querySelector(".start-btn").addEventListener("click", () => {
    state.playerScene = state.scenes.Game;
    console.log("Game Started");
    UIManager();
});
//highscore info
export const highscoreText = document.querySelector(".menu-info-highscore");

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
//----------------------------------------------------
const loginBtn = document.querySelector(".login-btn");
const statusDiv = document.getElementById("user-status");
loginBtn.addEventListener("click", async () => { await loginAndCreateProfile(); });