if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker
			.register("../config/sw.js")
			.then((reg) => console.log("Service Worker zarejestrowany!", reg))
			.catch((err) => console.log("Błąd Service Workera:", err));
	});
}

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const off = new OffscreenCanvas(canvas.width, canvas.height);
const offCtx = off.getContext("2d");

export const state = {
	playerScene: "Menu",
	scenes: {
		Menu: "Menu",
		Game: "Game",
		Pause: "Pause",
		GameOver: "GameOver",
	}
};

function resize() {
	const rect = canvas.getBoundingClientRect();
	const dpr = window.devicePixelRatio || 1;

	canvas.width = Math.round(rect.width * dpr);
	canvas.height = Math.round(rect.height * dpr);
	ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

	off.width = canvas.width;
	off.height = canvas.height;
	offCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener("resize", resize);
resize();

//----------------------------------------------------
import { Player } from "./player.js";
import { handleEffects } from "./scripts/effects.js";

const player = new Player(0, 0, 50, 0, 1);
function menuAnimationAndSkinPreview() {
	var squareSize = Math.max(1, Math.floor(canvas.clientWidth / 3));
	if (squareSize >= 100) {
		squareSize = 100;
	}
	player.baseSize = squareSize;
	player.x = (canvas.clientWidth / 2) - (player.baseSize / 2);
	player.y = (canvas.clientHeight / 2) - (player.baseSize / 2);
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	handleEffects(ctx, player);

	ctx.fillStyle = "white";
	ctx.fillRect(
		player.x,
		player.y,
		player.baseSize,
		player.baseSize
	);

	gameLoop()
}

function game() {
	state.playerScene === state.scenes.Game;

	const gap = 0;
	const buffer = 10;
	var squareSize = Math.max(1, Math.floor(canvas.clientWidth / 3 - buffer));
	if (squareSize >= 100) {
		squareSize = 100;
	}
	const topMargin = 10;

	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

	const totalWidth = squareSize * 3 + gap * 2;
	const startX = (canvas.clientWidth - totalWidth) / 2;

	const colors = ["#ff4d4d", "#4dff88", "#4d88ff"];
	for (let i = 0; i < 3; i++) {
		ctx.fillStyle = colors[i % colors.length];
		const x = startX + i * (squareSize + gap);
		ctx.fillRect(x, topMargin, squareSize, squareSize);
	}
}

// Game Loop
export function gameLoop() {
	if ((state.playerScene === state.scenes.Menu)) {
		requestAnimationFrame(menuAnimationAndSkinPreview);
	}

	if ((state.playerScene === state.scenes.Game)) {
		requestAnimationFrame(game);
	}
}
gameLoop();

