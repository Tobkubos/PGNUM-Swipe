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
		obstacle: "#3cff7a",
		background: "#0b2e1c"
	},
	2: {
		obstacle: "#3b82ff",
		background: "#0a1028"
	},
	3: {
		obstacle: "#b44bff",
		background: "#1a0826"
	},
	4: {
		obstacle: "#ffb703",
		background: "#2a1a05"
	}
};