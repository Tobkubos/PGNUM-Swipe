export var background = "#282c34";
export var backgroundDarker = "#171a20ff";
export var font = "#d5d5d5ff";
export var icons = "#b8b8b8ff";


export function hexToRgba(hex, alpha = 1) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}


const obstacleColors = {
        1: "#ff4d4d",
        2: "#4dff88",
        3: "#4d88ff"
};

const backgroundColors = {
        1: "#be2525ff",
        2: "#20aa4eff",
        3: "#1b49a7ff"
};