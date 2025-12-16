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


export const themes = {
	0: {
		obstacle: "#ff4d4d",
		background: "#282c34"
	},
	1: {
		obstacle: "#4dff88",
		background: "#20aa4eff"
	},
	2: {
		obstacle: "#4d88ff",
		background: "#1b49a7ff"
	}
};