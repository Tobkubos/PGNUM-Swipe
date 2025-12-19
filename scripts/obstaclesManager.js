import { updateScoreText } from "./uiManager.js";
import { canvas } from "./canvasManager.js";
import { getColorIndex, setColors } from "../utils/colorSetter.js";
import { gameBackground } from "../utils/colorSetter.js";

//możliwe typy przeszkód: 1 -pojedyńcza kolumna, 2 - podwójna kolumna (wszystkie kombinacje 3 kolumn)
// x1
// x2
// x3
// x1 x2
// x2 x3
// x1 x3
const patterns = [[0], [1], [2], [0, 1], [1, 2], [0, 2]];

export class ObstacleManager {
	constructor() {
		this.obstacles = [];
		this.speed = 0;
		this.color = "#ff0000";
		this.score = 0;

		this.warningCooldown = 60;
		this.warningTimer = 0;

		this.minWarningCooldown = 35;
		this.baseAcceleration = 0.2;
		this.maxAcceleration = 0.45;

		this.accelerationStep = 0.05;
		this.difficultyStep = 10;
	}

	update(canvasHeight, correction = 1) {
		const limitY = canvasHeight ? canvasHeight + 100 : 1000;

		// update wszystkich przeszkód
		for (let i = this.obstacles.length - 1; i >= 0; i--) {
			let obs = this.obstacles[i];
			obs.update(correction);

			if (obs.y > limitY) {
				this.obstacles.splice(i, 1);
				this.score++;
				updateScoreText(this.score);
				// zmiana koloru co x pkt
				if (this.score % this.difficultyStep === 0) {
					const idx = getColorIndex(this.score, 5);
					setColors(gameBackground, this.obstacles, this, idx);

					this.warningCooldown = Math.max(
						this.minWarningCooldown,
						this.warningCooldown - 5
					);

					this.baseAcceleration = Math.min(
						this.maxAcceleration,
						this.baseAcceleration + this.accelerationStep
					);

					this.obstacles.forEach(obs => {
						obs.acceleration = this.baseAcceleration;
					});
				}
			}
		}

		this.warningTimer += correction;
		if (this.warningTimer >= this.warningCooldown) {
			this.warningTimer = 0;
			this.spawnRandomWarning();
		}
	}

	spawnRandomWarning() {
		const randomIndex = Math.floor(Math.random() * patterns.length);
		const selectedPattern = patterns[randomIndex];

		const newObstacle = new Obstacle(
			selectedPattern,
			this.speed,
			this.color,
			this.baseAcceleration
		);

		this.obstacles.push(newObstacle);
	}

	draw(ctx, startX, squareSize) {
		this.obstacles.forEach((obs) => {
			obs.draw(ctx, startX, squareSize);
		});
	}

	reset() {
		this.obstacles = [];
		this.score = 0;
		this.speed = 3;

		this.warningCooldown = 60;
		this.baseAcceleration = 0.2;

		updateScoreText(this.score);
		setColors(gameBackground, this.obstacles, this, 0);
	}

	obstaclesOverlap(rect1, rect2) {
		return !(
			rect1.x > rect2.x + rect2.width ||
			rect1.x + rect1.width < rect2.x ||
			rect1.y > rect2.y + rect2.height ||
			rect1.y + rect1.height < rect2.y
		);
	}

	isColliding(player, obstacle, squareSize) {
		if (obstacle.state !== "fall") return false;
		const playerRect = {
			x: player.x,
			y: player.y,
			width: player.baseSize,
			height: player.baseSize,
		};

		for (let laneIndex of obstacle.activeLanes) {
			const obsX = (canvas.clientWidth - squareSize * 3) / 2 + laneIndex * squareSize;
			const obsRect = {
				x: obsX,
				y: obstacle.y,
				width: squareSize,
				height: squareSize,
			};

			if (this.obstaclesOverlap(playerRect, obsRect)) {
				return true;
			}
		}

		return false;
	}
}

export class Obstacle {
	constructor(activeLanes, speed, color, acceleration) {
		this.activeLanes = activeLanes;
		this.speed = speed;
		this.color = color;

		this.rotation = 0;
		this.rotationSpeed = 0.05;

		this.state = "warning"; // warning | spawn | fall
		this.timer = 0;
		this.scale = 0;
		this.velocityY = 0;
		this.acceleration = acceleration;

		this.warningY = 50;
		this.y = this.warningY;
	}

	update(correction = 1) {
		this.timer += correction;

		if (this.state === "warning") {
			if (this.timer > 36) {
				this.state = "spawn";
				this.timer = 0;
				this.scale = 0;
				this.y = this.warningY;
			}
		} else if (this.state === "spawn") {
			this.scale += 0.08 * correction;
			if (this.scale >= 1) {
				this.scale = 1;
				this.state = "fall";
				this.velocityY = this.speed;
			}
		} else if (this.state === "fall") {
			this.velocityY += this.acceleration * correction;
			this.y += this.velocityY * correction;

			this.rotation += this.rotationSpeed * correction;
		}
	}

	draw(ctx, startX, squareSize) {
		this.activeLanes.forEach((laneIndex) => {
			const cx = startX + laneIndex * squareSize + squareSize / 2;
			const cy = this.state === "warning" ? this.warningY : this.y;

			ctx.save();
			ctx.translate(cx, cy);

			if (this.state === "warning") {
				this.drawWarning(ctx, squareSize * 0.6);
			} else {
				ctx.scale(this.scale, this.scale);
				ctx.rotate(this.rotation);
				this.drawSaw(ctx, 0, 0, squareSize / 2.5);
			}

			ctx.restore();
		});
	}

	drawWarning(ctx, size) {
		const blink = Math.sin(this.timer * 0.3) > 0; // miganie
		if (!blink) return;

		ctx.fillStyle = "#ffcc00";
		ctx.beginPath();
		ctx.moveTo(0, -size / 2);
		ctx.lineTo(size / 2, size / 2);
		ctx.lineTo(-size / 2, size / 2);
		ctx.closePath();
		ctx.fill();
	}

	drawSaw(ctx, cx, cy, r) {
		const teeth = 12;
		const toothDepth = r * 0.25;

		ctx.fillStyle = this.color;
		ctx.beginPath();

		for (let i = 0; i < teeth * 2; i++) {
			const angle = (i / (teeth * 2)) * Math.PI * 2;
			const currentRadius = i % 2 === 0 ? r + toothDepth : r;

			const x = cx + Math.cos(angle) * currentRadius;
			const y = cy + Math.sin(angle) * currentRadius;

			if (i === 0) ctx.moveTo(x, y);
			else ctx.lineTo(x, y);
		}

		ctx.closePath();
		ctx.fill();

		// środek
		ctx.fillStyle = "#444";
		ctx.beginPath();
		ctx.arc(cx, cy, r * 0.3, 0, Math.PI * 2);
		ctx.fill();
	}
}
