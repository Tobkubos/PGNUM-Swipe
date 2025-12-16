import { updateScoreText } from "./uiManager.js";
import { canvas } from "./canvasManager.js";
import { getColorIndex, setColors } from "../utils/colorSetter.js";
import { gameBackground } from "../utils/colorSetter.js";

const topMargin = -400;


//możliwe typy przeszkód: 1 -pojedyńcza kolumna, 2 - podwójna kolumna (wszystkie kombinacje 3 kolumn)
// x1
// x2
// x3
// x1 x2
// x2 x3
// x1 x3
const patterns = [
    [0], [1], [2],
    [0, 1], [1, 2], [0, 2]
];


export class ObstacleManager {
    constructor() {
        this.obstacles = [];
        this.speed = 3;
        this.color = "#ff0000";
        this.score = 0;
    }
    spawnRandomObstacle() {
        const randomIndex = Math.floor(Math.random() * patterns.length);
        const selectedPattern = patterns[randomIndex];

        const newObstacle = new Obstacle(topMargin, selectedPattern, this.speed, this.color);
        this.obstacles.push(newObstacle);
    }

    update(canvasHeight, correction = 1) {
        const limitY = canvasHeight ? canvasHeight + 100 : 1000;

        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            let obs = this.obstacles[i];
            obs.update(correction);

            if (obs.y > limitY) {
                this.obstacles.splice(i, 1);
                this.score++;
                updateScoreText(this.score)
                this.spawnRandomObstacle();

                if (this.score % 2 === 0) {
                    const idx = getColorIndex(this.score);
                    setColors(gameBackground, this.obstacles, this, idx);
                }
            }
        }
    }

    draw(ctx, startX, squareSize, gap) {
        this.obstacles.forEach(obs => {
            obs.draw(ctx, startX, squareSize, gap);
        });
    }

    reset() {
        this.obstacles = [];
        this.score = 0;
        updateScoreText(this.score)
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
    constructor(y, activeLanes, speed, color) {
        this.y = y;
        this.activeLanes = activeLanes;
        this.speed = speed;
        this.color = color;
    }

    update(correction = 1) {
        this.y += this.speed * correction;
    }

    draw(ctx, startX, squareSize) {
        ctx.fillStyle = this.color;

        this.activeLanes.forEach(laneIndex => {
            const x = startX + laneIndex * (squareSize);
            ctx.fillRect(x, this.y, squareSize, squareSize);
        });
    }
}