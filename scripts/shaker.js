import { SceneSwitchManager, state} from "./sceneManager.js";
// SHAKE
let shakeProgress = 0;

const shakeBar = document.querySelector(".shake-progress-bar");
const chestIcon = document.querySelector(".treasure-icon");

export function enterRewardScene() {
	chestIcon.classList.remove("shake", "shake-strong");
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

	if (!chestIcon) return;

	chestIcon.classList.remove("shake", "shake-strong");
	void chestIcon.offsetWidth;

	if (shakeProgress === 100) {
		chestIcon.classList.add("shake-strong");
	} else {
		chestIcon.classList.add("shake");
	}
}

chestIcon.addEventListener("animationend", (e) => {
	if (e.animationName === "chest-shake-strong") {
		state.playerScene = state.scenes.RewardPreview;
		SceneSwitchManager();
	}
});

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

window.addEventListener("deviceorientation", e => {
	//console.log("gamma:", e.gamma, "beta:", e.beta);
});

document.addEventListener("keydown", (e) => {
	if (state.playerScene !== state.scenes.Reward) return;

	if (e.key.toLowerCase() === "s") {
		addShakeProgress();
	}
});