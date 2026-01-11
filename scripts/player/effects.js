// scripts/effects.js

import { correction } from "../utils/timeManager.js";

const particles = [];

class Particle {
    constructor(x, y, size, config) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.opacity = 1;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = 0;
        this.gravity = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.fadeSpeed = 0.02;
        this.color = "white";
        this.shape = "square";
        this.stroke = false;
        this.borderColor = null;
        this.text = "";
        this.growth = 0;

        //nadpis
        Object.assign(this, config);
    }

    update() {
        this.speedY += this.gravity * correction;
        this.x += this.speedX * correction;
        this.y += this.speedY * correction;
        this.opacity -= this.fadeSpeed * correction;
        this.rotation += this.rotationSpeed * correction;

        if (this.growth) {
            this.size += this.growth * correction;
        }

        if (this.wobble) {
            this.x += (Math.sin(this.y * 0.05) * 0.5) * correction;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.opacity);
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.borderColor || this.color;
        ctx.lineWidth = 2;

        this.drawShape(ctx);

        ctx.restore();
    }

    drawShape(ctx) {
        const s = this.size;

        const SHAPES = {
            square: () => ctx.fillRect(-s / 2, -s / 2, s, s),

            circle: () => {
                ctx.beginPath();
                ctx.arc(0, 0, s / 2, 0, Math.PI * 2);
                ctx.fill();
                if (this.stroke) ctx.stroke();
            },

            line: () => ctx.fillRect(-s / 4, -s * 2, s / 2, s * 4),

            line_random: () => {
                ctx.beginPath();
                ctx.moveTo(-s, -s);
                ctx.lineTo(s, s);
                ctx.stroke();
            },

            rect_random: () => ctx.fillRect(-s / 2, -s / 8, s, s / 4),

            heart: () => {
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(-s / 2, -s / 2, -s, s / 3, 0, s);
                ctx.bezierCurveTo(s, s / 3, s / 2, -s / 2, 0, 0);
                ctx.fill();
            },

            star: () => {
                ctx.beginPath();
                for (let i = 0; i < 5; i++) {
                    ctx.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI) * s,
                        -Math.sin((18 + i * 72) / 180 * Math.PI) * s);
                    ctx.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * s / 2,
                        -Math.sin((54 + i * 72) / 180 * Math.PI) * s / 2);
                }
                ctx.closePath();
                ctx.fill();
            },

            petal: () => {
                ctx.beginPath();
                ctx.ellipse(0, 0, s / 2, s / 4, 0, 0, Math.PI * 2);
                ctx.fill();
            },

            spiral: () => ctx.fillRect(s, 0, s / 4, s / 4),

            note: () => {
                ctx.font = `${s}px Arial`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillStyle = "black";
                ctx.fillText("♪", 0, 0);
            },

            text: () => {
                ctx.font = `${s}px monospace`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(this.text, 0, 0);
            }
        };

        if (SHAPES[this.shape]) {
            SHAPES[this.shape]();
        } else {
            // Fallback
            ctx.fillRect(-s / 2, -s / 2, s, s);
        }
    }
}

const effects = [
    {
        key: "none",
        name: "No effect",
        spawnCount: () => 0,
        create: () => null
    },

    {
        key: "simple_squares",
        name: "White squares",
        spawnCount: () => Math.round(Math.random()),
        create: (x, y, size) => new Particle(x, y, size, {
            speedY: Math.random() * 0.1 + 0.75,
            speedX: (Math.random() - 0.5),
            fadeSpeed: 0.03,
            color: "white",
            shape: "square"
        })
    },

    {
        key: "rocket",
        name: "Rocket",
        spawnCount: () => 1,
        create: (x, y, size) => new Particle(x, y, size * 1.5, {
            speedY: 2 + Math.random() * 2,
            speedX: (Math.random() - 0.5) * 2,
            fadeSpeed: 0.05,
            color: `hsl(${10 + Math.random() * 40}, 100%, 50%)`,
            shape: "square"
        })
    },

    {
        key: "rainbow_squares",
        name: "Rainbow Squares",
        spawnCount: () => 1,
        create: (x, y, size) => new Particle(x, y, size * 0.8, {
            speedY: 0,
            speedX: 0,
            fadeSpeed: 0.02,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`,
            shape: "square"
        })
    },

    {
        key: "falling_digits",
        name: "IT Lover",
        spawnCount: () => 1,
        create: (x, y, size) => new Particle(x, y, 14, {
            speedY: 3,
            speedX: 0,
            fadeSpeed: 0.015,
            color: "#00ff00",
            shape: "text",
            text: Math.random() > 0.5 ? "1" : "0"
        })
    },

    {
        key: "bubles",
        name: "Bubbles",
        spawnCount: () => 1,
        create: (x, y, size) => new Particle(x, y, size, {
            speedY: -1 - Math.random(),
            speedX: (Math.random() - 0.5) * 0.5,
            fadeSpeed: 0.01,
            color: "rgba(0, 150, 255, 0.6)",
            shape: "circle",
            stroke: true
        })
    },

    {
        key: "yellow_explosion",
        name: "Yellow Explosive",
        spawnCount: () => 2,
        create: (x, y, size) => new Particle(x, y, size * 0.5, {
            speedY: (Math.random() - 0.5) * 10,
            speedX: (Math.random() - 0.5) * 10,
            fadeSpeed: 0.04,
            color: "yellow",
            shape: "square"
        })
    },

    {
        key: "void",
        name: "The Void",
        spawnCount: () => 1,
        create: (x, y, size) => new Particle(x, y, size, {
            speedY: 1,
            speedX: 0,
            fadeSpeed: 0.02,
            color: "black",
            shape: "circle",
            stroke: true,
            borderColor: "purple"
        })
    },

    {
        key: "wobble_snow",
        name: "Wobbling snow",
        spawnCount: () => Math.round(Math.random()),
        create: (x, y, size) => new Particle(x, y, size, {
            speedY: 1.5,
            speedX: 0,
            wobble: true,
            fadeSpeed: 0.01,
            color: "white",
            shape: "circle"
        })
    },

    {
        key: "neon_rider",
        name: "Neon Rider",
        spawnCount: () => 1,
        create: (x, y, size) => new Particle(x, y, Math.random() * 40 + 5, {
            speedY: 0,
            speedX: (Math.random() - 0.5) * 10,
            fadeSpeed: 0.1,
            color: `rgb(${Math.random() * 255}, 0, ${Math.random() * 255})`,
            shape: "rect_random"
        })
    },

    {
        key: "pink_hearts",
        name: "Pink Love",
        spawnCount: () => 1,
        create: (x, y, size) => new Particle(x, y, size, {
            speedY: -1.5,
            speedX: (Math.random() - 0.5) * 0.5,
            fadeSpeed: 0.01,
            color: "pink",
            shape: "heart"
        })
    },

    {
        key: "teleportation",
        name: "Teleportation",
        id: 11,
        spawnCount: () => 2,
        create: (x, y, size) => new Particle(x, y, 2, {
            speedY: 15,
            speedX: 0,
            fadeSpeed: 0.05,
            color: "cyan",
            shape: "line"
        })
    },

    {
        key: "poison",
        name: "Poison",
        id: 12,
        spawnCount: () => 1,
        create: (x, y, size) => new Particle(x, y, size * Math.random(), {
            speedY: 1,
            speedX: (Math.random() - 0.5) * 2,
            fadeSpeed: 0.02,
            color: "#39ff14",
            shape: "circle"
        })
    }
];

export const EFFECTS = effects;
export const EFFECTS_COUNT = effects.length;
export const EFFECT_KEYS = effects.map(e => e.key);
export const EFFECTS_BY_KEY = Object.fromEntries(
    EFFECTS.map(e => [e.key, e])
);

export function handleEffects(ctx, player) {
    const effect = EFFECTS_BY_KEY[player.selectedEffect];

    if (!effect) {
        return;
    }

    const count = effect.spawnCount();

    for (let i = 0; i < count; i++) {
        const px = player.x + Math.random() * player.baseSize;
        const py = player.y + player.baseSize;

        const p = effect.create(px, py, player.baseSize / 6);
        if (p) {
            particles.push(p);
        }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);

        if (p.opacity <= 0) {
            particles.splice(i, 1);
        }
    }
}

export function deleteAllParticles(){
    particles.length = 0;
}