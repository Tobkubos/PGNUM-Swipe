import {state } from "../sceneManager.js";
// SHAKE
let shakeProgress = 0;

const shakeBar = document.querySelector(".shake-progress-bar");

export function enterRewardScene() {
	shakeProgress = 0;
	if (shakeBar) shakeBar.textContent = "0%";
}

function addShakeProgress() {
	shakeProgress += 10;

	if (shakeProgress >= 100) {
		shakeProgress = 100;
		console.log("otworzyles skrzynke");
	}

	if (shakeBar) {
		shakeBar.textContent = shakeProgress + "%";
	}
}

function handleShake(event) {
	if (state.playerScene !== state.scenes.Reward) return;

	const acc = event.accelerationIncludingGravity;
	if (!acc) return;

	const shakeStrength =
		Math.abs(acc.x) +
		Math.abs(acc.y) +
		Math.abs(acc.z);

	if (shakeStrength > 25) {
		addShakeProgress();
	}
}

if (window.DeviceMotionEvent) {
	window.addEventListener("devicemotion", handleShake);
}

document.addEventListener("keydown", (e) => {
	if (state.playerScene !== state.scenes.Reward) return;

	if (e.key.toLowerCase() === "s") {
		addShakeProgress();
	}
});