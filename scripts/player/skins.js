// scripts/skins.js
const classicSkins = [
    {
        key: "default",
        name: "Default",
        category: "classic",
        draw(ctx, p) {
            const { x, y, size, cx, cy } = getPlayerVars(p);
            ctx.fillStyle = "white";
            ctx.fillRect(p.x, p.y, p.baseSize, p.baseSize);
        }
    },
    {
        key: "blue_neon",
        name: "Blue Neon",
        category: "classic",
        draw(ctx, p) {
            const { x, y, size, cx, cy } = getPlayerVars(p);
            ctx.lineWidth = 4;
            ctx.strokeStyle = "#00ffcc";
            ctx.shadowColor = "#00ffcc";
            ctx.shadowBlur = 20;
            ctx.strokeRect(x + 2, y + 2, size - 4, size - 4);
            ctx.fillStyle = "rgba(0, 255, 204, 0.2)";
            ctx.fillRect(x + 2, y + 2, size - 4, size - 4);
        }
    },
    {
        key: "green_neon",
        name: "Green Neon",
        category: "classic",
        draw(ctx, p) {
            const { x, y, size, cx, cy } = getPlayerVars(p);
            ctx.lineWidth = 4;
            ctx.strokeStyle = "#48ff00ff";
            ctx.shadowColor = "#60c91aff";
            ctx.shadowBlur = 20;
            ctx.strokeRect(x + 2, y + 2, size - 4, size - 4);
            ctx.fillStyle = "rgba(0, 255, 0, 0.2)";
            ctx.fillRect(x + 2, y + 2, size - 4, size - 4);
        }
    },
    {
        key: "yellow_neon",
        name: "Yellow Neon",
        category: "classic",
        draw(ctx, p) {
            const { x, y, size, cx, cy } = getPlayerVars(p);
            ctx.lineWidth = 4;
            ctx.strokeStyle = "#e5ff00ff";
            ctx.shadowColor = "#ffee00ff";
            ctx.shadowBlur = 20;
            ctx.strokeRect(x + 2, y + 2, size - 4, size - 4);
            ctx.fillStyle = "rgba(229, 255, 0, 0.2)";
            ctx.fillRect(x + 2, y + 2, size - 4, size - 4);
        }
    },
    {
        key: "violet_neon",
        name: "Violet Neon",
        category: "classic",
        draw(ctx, p) {
            const { x, y, size, cx, cy } = getPlayerVars(p);
            ctx.lineWidth = 4;
            ctx.strokeStyle = "#e100ffff";
            ctx.shadowColor = "#ae00ffff";
            ctx.shadowBlur = 20;
            ctx.strokeRect(x + 2, y + 2, size - 4, size - 4);
            ctx.fillStyle = "rgba(225, 0, 255, 0.2)";
            ctx.fillRect(x + 2, y + 2, size - 4, size - 4);
        }
    },
    {
        key: "orange_neon",
        name: "Orange Neon",
        category: "classic",
        draw(ctx, p) {
            const { x, y, size, cx, cy } = getPlayerVars(p);
            ctx.lineWidth = 4;
            ctx.strokeStyle = "#d48f0eff";
            ctx.shadowColor = "#d18b09ff";
            ctx.shadowBlur = 20;
            ctx.strokeRect(x + 2, y + 2, size - 4, size - 4);
            ctx.fillStyle = "rgba(255, 230, 0, 0.2)";
            ctx.fillRect(x + 2, y + 2, size - 4, size - 4);
        }
    },
    {
        key: "eye",
        name: "Eye",
        category: "classic",
        draw(ctx, p) {
            const { x, y, size, cx, cy } = getPlayerVars(p);
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(cx, cy, size / 5, 0, Math.PI * 2);
            ctx.fill();
        }
    },
    {
        key: "checkered",
        name: "Checkered",
        category: "classic",
        draw(ctx, p) {
            const { x, y, size } = getPlayerVars(p);
            const half = size / 2;

            ctx.fillStyle = "white";
            ctx.fillRect(x, y, half, half);
            ctx.fillRect(x + half, y + half, half, half);

            ctx.fillStyle = "black";
            ctx.fillRect(x + half, y, half, half);
            ctx.fillRect(x, y + half, half, half);
        }
    },
    {
        key: "ninja",
        name: "Ninja",
        category: "classic",
        draw(ctx, p) {
            const { x, y, size } = getPlayerVars(p);

            ctx.fillStyle = "#050505ff";
            ctx.fillRect(x, y, size, size);

            const bandHeight = size * 0.3;
            ctx.fillStyle = "#cc0000";
            ctx.fillRect(x, y + (size * 0.2), size, bandHeight);

            ctx.fillStyle = "white";
            ctx.shadowColor = "white";
            ctx.shadowBlur = 5;
            const eyeSize = size * 0.15;
            ctx.fillRect(x + (size * 0.2), y + (size * 0.25), eyeSize, eyeSize);
            ctx.fillRect(x + (size * 0.65), y + (size * 0.25), eyeSize, eyeSize);

            ctx.shadowBlur = 0;
        }
    },
    {
        key: "rainbow_dash",
        name: "Rainbow Dash",
        category: "classic",
        draw(ctx, p) {
            const { x, y, size, cx, cy } = getPlayerVars(p);
            const hue = (Date.now() / 10) % 360;
            ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
            ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
            ctx.shadowBlur = 15;
            ctx.fillRect(x, y, size, size);
        }
    },
]

const imageSkins = [
    {
        key: "skibidi",
        name: "Skibidi",
        category: "image",
        img: (() => {
            const img = new Image();
            img.src = "./icons/skins/Skibidi_Toilet.png";
            return img;
        })(),
        draw(ctx, p) {
            const { x, y, size } = getPlayerVars(p);

            if (this.img.complete && this.img.naturalWidth > 0) {
                ctx.drawImage(this.img, x, y, size, size);
            }
        }
    },
    {
        key: "devil",
        name: "Devil Face",
        category: "image",
        img: (() => {
            const img = new Image();
            img.src = "./icons/skins/devil.png";
            return img;
        })(),
        draw(ctx, p) {
            const { x, y, size } = getPlayerVars(p);

            if (this.img.complete && this.img.naturalWidth > 0) {
                ctx.drawImage(this.img, x, y, size, size);
            }
        }
    },
    {
        key: "eyeball",
        name: "Bloody Eyeball",
        category: "image",
        img: (() => {
            const img = new Image();
            img.src = "./icons/skins/eyeball.png";
            return img;
        })(),
        draw(ctx, p) {
            const { x, y, size } = getPlayerVars(p);

            if (this.img.complete && this.img.naturalWidth > 0) {
                ctx.drawImage(this.img, x, y, size, size);
            }
        }
    },
    {
        key: "ghost",
        name: "Ghost",
        category: "image",
        img: (() => {
            const img = new Image();
            img.src = "./icons/skins/ghost.png";
            return img;
        })(),
        draw(ctx, p) {
            const { x, y, size } = getPlayerVars(p);

            if (this.img.complete && this.img.naturalWidth > 0) {
                ctx.drawImage(this.img, x, y, size, size);
            }
        }
    },
    {
        key: "pumpkin",
        name: "Pumpkin",
        category: "image",
        img: (() => {
            const img = new Image();
            img.src = "./icons/skins/pumpkin.png";
            return img;
        })(),
        draw(ctx, p) {
            const { x, y, size } = getPlayerVars(p);

            if (this.img.complete && this.img.naturalWidth > 0) {
                ctx.drawImage(this.img, x, y, size, size);
            }
        }
    },
    {
        key: "spider",
        name: "Spider",
        category: "image",
        img: (() => {
            const img = new Image();
            img.src = "./icons/skins/spider.png";
            return img;
        })(),
        draw(ctx, p) {
            const { x, y, size } = getPlayerVars(p);

            if (this.img.complete && this.img.naturalWidth > 0) {
                ctx.drawImage(this.img, x, y, size, size);
            }
        }
    },
    {
        key: "braindead",
        name: "Braindead",
        category: "image",
        img: (() => {
            const img = new Image();
            img.src = "./icons/skins/zombie.png";
            return img;
        })(),
        draw(ctx, p) {
            const { x, y, size } = getPlayerVars(p);

            if (this.img.complete && this.img.naturalWidth > 0) {
                ctx.drawImage(this.img, x, y, size, size);
            }
        }
    },
    {
        key: "stone",
        name: "Stone",
        category: "image",
        img: (() => {
            const img = new Image();
            img.src = "./icons/skins/Stone.png";
            return img;
        })(),
        draw(ctx, p) {
            const { x, y, size } = getPlayerVars(p);

            if (this.img.complete && this.img.naturalWidth > 0) {
                ctx.drawImage(this.img, x, y, size, size);
            }
        }
    },
]

export const SKINS = [
    ...classicSkins,
    ...imageSkins
];
export const SKINS_COUNT = SKINS.length;
export const SKIN_CATEGORIES = [
    ...new Set(SKINS.map(s => s.category))
];

export const SKINS_BY_KEY = Object.fromEntries(
    SKINS.map(s => [s.key, s])
);

export function handleSkins(ctx, player) {
    const skin = SKINS_BY_KEY[player.selectedSkin];

    if (!skin) {
        console.warn("Skin not found:", player.selectedSkin);
        return;
    }

    const time = performance.now() / 1000;

    ctx.save();
    skin.draw(ctx, player, time);
    ctx.restore();
}

function getPlayerVars(p) {
    const x = p.x;
    const y = p.y;
    const size = p.baseSize;
    return {
        x,
        y,
        size,
        cx: x + size / 2,
        cy: y + size / 2
    };
}