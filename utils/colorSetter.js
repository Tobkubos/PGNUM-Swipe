import { font, background, backgroundDarker, hexToRgba } from './colors.js';
import { ObstacleManager } from '../scripts/obstaclesManager.js';
import { obstacleColors, backgroundColors } from './colors.js';

document.querySelectorAll('.menu-btn').forEach(btn => {
    btn.style.color = font;
});

export const gameBackground = document.querySelector('#gameCanvas')
    gameBackground.style.backgroundColor = background;

document.querySelectorAll('#how-to-play-panel, #highscores-panel, #options-panel, #pause-panel, #gameover-panel, #reward-panel').forEach(obj => {
    obj.style.backgroundColor = hexToRgba(backgroundDarker, 0.6);
});

document.querySelectorAll('#how-to-play-content-panel, #highscores-content-panel, #options-content-panel, #pause-content-panel, #gameover-content-panel, #reward-content-panel').forEach(obj => {
    obj.style.backgroundColor = hexToRgba(backgroundDarker, 0.95);
});

document.querySelectorAll('#score-display').forEach(obj => {
    obj.style.color = hexToRgba(font, 0.1);
});

export function getColorIndex(score) {
    const colorsCount = Object.keys(obstacleColors).length;
    return ((Math.floor(score / 2)) % colorsCount) + 1;
}

export function setColors(background, obstacles, obstacleManager, idx){
    background.style.backgroundColor = backgroundColors[idx];
        obstacles.forEach(element => {
        element.color = obstacleColors[idx]
    });
    obstacleManager.color = obstacleColors[idx]
}