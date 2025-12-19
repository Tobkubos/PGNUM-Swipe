// scripts/effects.js

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
        
        //dodatkowe opcje
        Object.assign(this, config);
    }

    update() {
        this.speedY += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= this.fadeSpeed;
        this.rotation += this.rotationSpeed;
        
        if (this.growth) {
            this.size += this.growth;
        }

        if (this.wobble) {
            this.x += Math.sin(this.y * 0.05) * 0.5;
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
    // 0: Brak efektu
    {
        id: 0,
        spawnCount: () => 0,
        create: () => null
    },

    // 1: Biały kwadrat, wolny
    {
        id: 1,
        spawnCount: () => Math.round(Math.random()),
        create: (x, y, size) => new Particle(x, y, size, {
            speedY: Math.random() * 0.1 + 0.75,
            speedX: (Math.random() - 0.5),
            fadeSpeed: 0.03,
            color: "white",
            shape: "square"
        })
    },

    // 2: Kolorowe HSL, szybkie, rosnące
    {
        id: 2,
        spawnCount: () => 1,
        create: (x, y, size) => new Particle(x, y, size * 1.5, {
            speedY: 2 + Math.random() * 2,
            speedX: (Math.random() - 0.5) * 2,
            fadeSpeed: 0.05,
            color: `hsl(${10 + Math.random() * 40}, 100%, 50%)`,
            shape: "square"
        })
    },

    // 3: Random HSL, statyczne, znikające
    {
        id: 3,
        spawnCount: () => 1,
        create: (x, y, size) => new Particle(x, y, size * 0.8, {
            speedY: 0,
            speedX: 0,
            fadeSpeed: 0.02,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`,
            shape: "square"
        })
    },

    // 4: Kod binarny (0/1), zielony
    {
        id: 4,
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

    // 5: Niebieskie kółka (bąbelki), w górę
    {
        id: 5,
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

    // 6: Żółta eksplozja
    {
        id: 6,
        spawnCount: () => 2,
        create: (x, y, size) => new Particle(x, y, size * 0.5, {
            speedY: (Math.random() - 0.5) * 10,
            speedX: (Math.random() - 0.5) * 10,
            fadeSpeed: 0.04,
            color: "yellow",
            shape: "square"
        })
    },

    // 7: Czarne kółko z fioletową obwódką
    {
        id: 7,
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

    // 8: Białe kółko, sinusoida (wobble)
    {
        id: 8,
        spawnCount: () => 1,
        create: (x, y, size) => new Particle(x, y, size, {
            speedY: 2,
            speedX: 0, // Ruch X obsługiwany przez wobble
            wobble: true,
            fadeSpeed: 0.01,
            color: "white",
            shape: "circle"
        })
    },

    // 9: Prostokąty RGB, losowa wielkość
    {
        id: 9,
        spawnCount: () => 1,
        create: (x, y, size) => new Particle(x, y, Math.random() * 40 + 5, {
            speedY: 0,
            speedX: (Math.random() - 0.5) * 10,
            fadeSpeed: 0.1,
            color: `rgb(${Math.random() * 255}, 0, ${Math.random() * 255})`,
            shape: "rect_random"
        })
    },

    // 10: Różowe serca
    {
        id: 10,
        spawnCount: () => 1,
        create: (x, y, size) => new Particle(x, y, size, {
            speedY: -1.5,
            speedX: (Math.random() - 0.5) * 0.5,
            fadeSpeed: 0.01,
            color: "pink",
            shape: "heart"
        })
    },

    // 11: Cyjanowe linie, bardzo szybkie
    {
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

    // 12: Neonowe zielone kółka
    {
        id: 12,
        spawnCount: () => 1,
        create: (x, y, size) => new Particle(x, y, size * Math.random(), {
            speedY: 1,
            speedX: (Math.random() - 0.5) * 2,
            fadeSpeed: 0.02,
            color: "#39ff14",
            shape: "circle"
        })
    },

    // 13: Konfetti tęczowe
    {
        id: 13,
        spawnCount: () => 2,
        create: (x, y, size) => new Particle(x, y, size * 0.6, {
            speedY: -3,
            speedX: (Math.random() - 0.5) * 4,
            gravity: 0.2,
            fadeSpeed: 0.04,
            rotationSpeed: 0.2,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            shape: "square"
        })
    },

    // 14: Dym (szary, rosnący)
    {
        id: 14,
        spawnCount: () => 1,
        create: (x, y, size) => new Particle(x, y, size * 2, {
            speedY: 1,
            speedX: (Math.random() - 0.5),
            fadeSpeed: 0.015,
            growth: 0.5,
            color: "rgba(100, 100, 100, 0.2)",
            shape: "circle"
        })
    },

    // 15: Biała siatka pikseli
    {
        id: 15,
        spawnCount: () => 1,
        create: (x, y, size) => new Particle(x, y, size, {
            speedY: 0,
            speedX: 0,
            fadeSpeed: 0.05,
            color: "white",
            shape: "square" // pixel_grid to w zasadzie kwadrat w starej implementacji
        })
    },

    // 16: Chaotyczne linie
    {
        id: 16,
        spawnCount: () => 2,
        create: (x, y, size) => new Particle(x, y, size, {
            speedY: (Math.random() - 0.5) * 5,
            speedX: (Math.random() - 0.5) * 5,
            fadeSpeed: 0.08,
            color: "#00ffff",
            shape: "line_random"
        })
    },

    // 17: Żółta gwiazda, obracająca się
    {
        id: 17,
        spawnCount: () => 1,
        create: (x, y, size) => new Particle(x, y, size, {
            speedY: 0,
            speedX: 0,
            fadeSpeed: 0.02,
            rotationSpeed: 0.1,
            color: "yellow",
            shape: "star"
        })
    },

    // 18: Nutka muzyczna
    {
        id: 18,
        spawnCount: () => 1,
        create: (x, y, size) => new Particle(x, y, size, {
            speedY: -1,
            wobble: true, // Zastępuje speedX = sin(y)
            fadeSpeed: 0.01,
            color: "black",
            shape: "note"
        })
    },

    // 19: Ciemnoczerwone kółka (krew?)
    {
        id: 19,
        spawnCount: () => 1,
        create: (x, y, size) => new Particle(x, y, size, {
            speedY: 0,
            speedX: (Math.random() - 0.5) * 2,
            gravity: 0.3,
            fadeSpeed: 0.01,
            color: "#8a0303",
            shape: "circle"
        })
    },

    // 20: Fioletowa spirala
    {
        id: 20,
        spawnCount: () => 1,
        create: (x, y, size) => new Particle(x, y, size, {
            speedY: (Math.random() - 0.5) * 2,
            speedX: (Math.random() - 0.5) * 2,
            fadeSpeed: 0.02,
            rotationSpeed: 0.1,
            color: "violet",
            shape: "spiral"
        })
    },

    // 21: Duch (klon) - półprzezroczysty kwadrat
    {
        id: 21,
        spawnCount: () => 1,
        create: (x, y, size) => new Particle(x, y, size, {
            speedY: 0,
            speedX: 0,
            fadeSpeed: 0.1,
            color: "rgba(255,255,255,0.5)",
            shape: "square" 
        })
    },

    // 22: Złote monety
    {
        id: 22,
        spawnCount: () => 1,
        create: (x, y, size) => new Particle(x, y, size, {
            speedY: -4,
            speedX: (Math.random() - 0.5) * 2,
            gravity: 0.2,
            fadeSpeed: 0.01,
            color: "gold",
            shape: "circle",
            stroke: true,
            borderColor: "#B8860B"
        })
    },

    // 23: Matrix code (japońskie znaki)
    {
        id: 23,
        spawnCount: () => 1,
        create: (x, y, size) => new Particle(x, y, size, {
            speedY: 2,
            speedX: 0,
            fadeSpeed: 0.02,
            color: "#00ff00",
            shape: "text",
            text: String.fromCharCode(0x30A0 + Math.random() * 96)
        })
    },

    // 24: Różowe płatki
    {
        id: 24,
        spawnCount: () => 1,
        create: (x, y, size) => new Particle(x, y, size, {
            speedY: 1,
            speedX: Math.sin(Math.random() * 10),
            wobble: true,
            fadeSpeed: 0.01,
            rotationSpeed: 0.05,
            color: "pink",
            shape: "petal"
        })
    },

    // 25: Niebieski deszcz
    {
        id: 25,
        spawnCount: () => 2,
        create: (x, y, size) => new Particle(x, y, size * 0.8, {
            speedY: 5,
            speedX: (Math.random() - 0.5),
            fadeSpeed: 0.06,
            color: "blue",
            shape: "square"
        })
    }
];

export const EFFECTS = effects;
export const EFFECTS_COUNT = effects.length;
export function handleEffects(ctx, player) {
    const effect = EFFECTS[player.selectedEffect];
    
    if (!effect) return;

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