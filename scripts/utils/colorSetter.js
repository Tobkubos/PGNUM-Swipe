import { font, background, backgroundDarker, hexToRgba, themes } from './colors.js';

document.querySelectorAll('.menu-btn').forEach(btn => {
    btn.style.color = font;
});

export const gameBackground = document.querySelector('#gameCanvas')
gameBackground.style.backgroundColor = background;

const toast = document.querySelector('.toast')
toast.style.background = hexToRgba(backgroundDarker, 0.9)
toast.style.color = font

document.querySelectorAll('.menu-game-name, .menu-info-score, .menu-info-highscore, .popup-header-info, .popup-content, .reward-status, #skins-header, #effects-header, #skins-header-category, #effect-id, #skins-footer-page, .shake-progress-bar, #reward-preview-header-info, #reward-name').forEach(obj => {
    obj.style.color = font;
});

document.querySelectorAll('#how-to-play-panel, #highscores-panel, #options-panel, #pause-panel, #gameover-panel, #reward-panel').forEach(obj => {
    obj.style.backgroundColor = hexToRgba(backgroundDarker, 0.6);
});

document.querySelectorAll('#how-to-play-content-panel, #highscores-content-panel, #options-content-panel, #pause-content-panel, #gameover-content-panel, #reward-content-panel').forEach(obj => {
    obj.style.backgroundColor = hexToRgba(backgroundDarker, 0.95);
});

document.querySelectorAll('#score-display').forEach(obj => {
    obj.style.color = hexToRgba(font, 0.1);
});

export function getColorIndex(score, l) {
    const colorsCount = Object.keys(themes).length;
    return ((Math.floor(score / l)) % colorsCount);
}

export function setColors(backgroundElement, obstacles, obstacleManager, idx) {
    backgroundElement.style.backgroundColor = themes[idx].background;
    obstacles.forEach(element => {
        element.color = themes[idx].obstacle;
    });
    obstacleManager.color = themes[idx].obstacle;
}