import { font, background } from './colors.js';

document.querySelectorAll('.menu-btn').forEach(btn => {
    btn.style.color = font;
});

document.querySelectorAll('#gameCanvas').forEach(obj => {
    obj.style.backgroundColor = background;
});
