import { font, background, backgroundDarker, hexToRgba } from './colors.js';

document.querySelectorAll('.menu-btn').forEach(btn => {
    btn.style.color = font;
});

document.querySelectorAll('#gameCanvas').forEach(obj => {
    obj.style.backgroundColor = background;
});

document.querySelectorAll('#how-to-play-panel, #highscores-panel, #options-panel').forEach(obj => {
    obj.style.backgroundColor = hexToRgba(backgroundDarker, 0.6);
});

document.querySelectorAll('#how-to-play-content-panel, #highscores-content-panel, #options-content-panel').forEach(obj => {
    obj.style.backgroundColor = hexToRgba(backgroundDarker, 0.95);
});
