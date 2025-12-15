const topMargin = -400;
const gameScoreText = document.getElementById("score-display");

export class ObstacleManager {
    constructor() {
        this.obstacles = [];
        this.speed = 3;
        this.color = "#ff0000";
        this.score = 0;
    }

    spawnRandomObstacle() {

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

                if (gameScoreText) {
                    gameScoreText.innerText = this.score;
                }

                this.spawnRandomObstacle();
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
        if (gameScoreText) gameScoreText.innerText = "0";
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