import { state, SceneSwitchManager } from "../sceneManager.js";
import { DB_loginAndCreateProfile, DB_logoutUser, DB_getTop10Scores } from "../../db/DatabaseConfig.js";
import { obstacleManager } from "../../main.js";
import { animateSceneTransition } from "../utils/sceneTransition.js";
//----------------------------------------------------
//start button
document.querySelector(".start-btn").addEventListener("click", () => {
    obstacleManager.reset();
    animateSceneTransition(state.scenes.Game);
    console.log("Game Started");
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
