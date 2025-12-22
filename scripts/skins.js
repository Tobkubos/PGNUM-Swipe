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
        key: "test",
        name: "test",
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

//#region deprecated not using now!
const animatedSkins = [
    {
        name: "Classic",
        draw(ctx, p, time) {
            const { x, y, size, cx, cy } = getPlayerVars(p);
            const grad = ctx.createLinearGradient(x, y, x, y + size);
            grad.addColorStop(0, "#ff9966");
            grad.addColorStop(1, "#ff5e62");
            ctx.fillStyle = grad;
            ctx.fillRect(x, y, size, size);
        }
    },
    {
        name: "Classic",
        draw(ctx, p, time) {
            const { x, y, size, cx, cy } = getPlayerVars(p);
            const hue = (Date.now() / 10) % 360;
            ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
            ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
            ctx.shadowBlur = 15;
            ctx.fillRect(x, y, size, size);
        }
    },
    {
        name: "Rainbow Neon",
        draw(ctx, p, time) {
            const { x, y, size, cx, cy } = getPlayerVars(p);
            const offset = Math.random() * 4 - 2;
            ctx.globalCompositeOperation = "screen";
            ctx.fillStyle = "rgba(255, 0, 0, 0.8)";
            ctx.fillRect(x + offset, y, size, size);
            ctx.fillStyle = "rgba(0, 0, 255, 0.8)";
            ctx.fillRect(x - offset, y, size, size);
            ctx.fillStyle = "rgba(0, 255, 0, 0.8)";
            ctx.fillRect(x, y + offset, size, size);
        }
    }, {
        name: "Classic",
        draw(ctx, p, time) {
            const { x, y, size, cx, cy } = getPlayerVars(p);
            ctx.translate(cx, cy);
            ctx.rotate(time * 5);
            ctx.fillStyle = "#d4af37";
            ctx.beginPath();
            for (let i = 0; i < 4; i++) {
                ctx.rotate(Math.PI / 2);
                ctx.moveTo(0, -size / 1.5);
                ctx.lineTo(size / 4, 0);
                ctx.lineTo(-size / 4, 0);
            }
            ctx.fill();
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(0, 0, size / 5, 0, Math.PI * 2);
            ctx.fill();
        }
    }, {
        id: 105,
        name: "Classic",
        draw(ctx, p, time) {
            const { x, y, size, cx, cy } = getPlayerVars(p);
            ctx.fillStyle = "black";
            ctx.shadowColor = "purple";
            ctx.shadowBlur = 20 + Math.sin(time * 5) * 10;
            ctx.beginPath();
            ctx.arc(cx, cy, size / 2.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "violet";
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }, {
        id: 106,
        name: "Classic",
        draw(ctx, p, time) {
            const { x, y, size, cx, cy } = getPlayerVars(p);
            ctx.fillStyle = "black";
            ctx.fillRect(x, y, size, size);
            ctx.fillStyle = "#00ff00";
            ctx.font = `${size / 3}px monospace`;
            ctx.textAlign = "center";
            ctx.fillText(Math.round(Math.random()), cx - size / 4, cy);
            ctx.fillText(Math.round(Math.random()), cx + size / 4, cy + size / 4);
            ctx.fillText(Math.round(Math.random()), cx, cy - size / 4);
        }
    }, {
        id: 107,
        name: "Classic",
        draw(ctx, p, time) {
            const { x, y, size, cx, cy } = getPlayerVars(p);
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(cx, cy, size / 2, Math.PI, 0);
            ctx.fill();
            ctx.fillStyle = "black";
            ctx.fillRect(x, cy - 2, size, 4);
            ctx.beginPath();
            ctx.arc(cx, cy, size / 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(cx, cy, size / 10, 0, Math.PI * 2);
            ctx.fill();
        }
    }, {
        id: 108,
        name: "Classic",
        draw(ctx, p, time) {
            const { x, y, size, cx, cy } = getPlayerVars(p);
            ctx.fillStyle = "#32CD32";
            ctx.beginPath();
            ctx.moveTo(x, cy);
            ctx.bezierCurveTo(x, y, x + size, y, x + size, cy);
            const wobble = Math.sin(time * 10) * 5;
            ctx.bezierCurveTo(x + size + wobble, y + size, x - wobble, y + size, x, cy);
            ctx.fill();
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(cx - size / 4, cy - size / 6, size / 8, 0, Math.PI * 2);
            ctx.arc(cx + size / 4, cy - size / 6, size / 8, 0, Math.PI * 2);
            ctx.fill();
        }
    }, {
        id: 109,
        name: "Classic",
        draw(ctx, p, time) {
            const { x, y, size, cx, cy } = getPlayerVars(p);
            const goldGrad = ctx.createLinearGradient(x, y, x + size, y + size);
            const sheen = (Math.sin(time * 3) + 1) / 2;
            goldGrad.addColorStop(0, "#DAA520");
            goldGrad.addColorStop(sheen, "#FFFFE0");
            goldGrad.addColorStop(1, "#B8860B");
            ctx.fillStyle = goldGrad;
            ctx.fillRect(x, y, size, size);
            ctx.strokeStyle = "#8B4513";
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, size, size);
        }
    }, {
        id: 110,
        name: "Classic",
        draw(ctx, p, time) {
            const { x, y, size, cx, cy } = getPlayerVars(p);
            ctx.strokeStyle = "#00FFFF";
            ctx.lineWidth = 2;

            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(cx, cy, size / 6, 0, Math.PI * 2);
            ctx.fill();

            ctx.translate(cx, cy);

            ctx.rotate(time * 2);
            ctx.beginPath();
            ctx.ellipse(0, 0, size / 1.5, size / 4, 0, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = "#00FFFF";
            ctx.beginPath();
            ctx.arc(size / 1.5, 0, 3, 0, Math.PI * 2);
            ctx.fill();


            ctx.rotate(Math.PI / 2);
            ctx.beginPath();
            ctx.ellipse(0, 0, size / 1.5, size / 4, 0, 0, Math.PI * 2);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(size / 1.5, 0, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }, {
        id: 111,
        name: "Classic",
        draw(ctx, p, time) {
            const { x, y, size, cx, cy } = getPlayerVars(p);
            ctx.fillStyle = "#00AA00";
            ctx.fillRect(x, y, size, size);
            ctx.fillStyle = "black";
            const s = size / 8;

            ctx.fillRect(x + 1 * s, y + 2 * s, 2 * s, 2 * s);
            ctx.fillRect(x + 5 * s, y + 2 * s, 2 * s, 2 * s);

            ctx.fillRect(x + 3 * s, y + 4 * s, 2 * s, 3 * s);
            ctx.fillRect(x + 2 * s, y + 5 * s, 1 * s, 3 * s);
            ctx.fillRect(x + 5 * s, y + 5 * s, 1 * s, 3 * s);
        }
    }, {
        id: 112,
        name: "Classic",
        draw(ctx, p, time) {
            const { x, y, size, cx, cy } = getPlayerVars(p);
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(cx, cy, size / 2.5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, cy);
            ctx.lineTo(x + size, cy);
            ctx.moveTo(cx, y);
            ctx.lineTo(cx, y + size);
            ctx.stroke();

            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(cx, cy, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }, {
        id: 113,
        name: "Classic",
        draw(ctx, p, time) {
            const { x, y, size, cx, cy } = getPlayerVars(p);
            ctx.fillStyle = "yellow";
            const mouthOpen = Math.abs(Math.sin(time * 10)) * 0.2 * Math.PI;
            ctx.beginPath();

            ctx.arc(cx, cy, size / 2, mouthOpen, Math.PI * 2 - mouthOpen);
            ctx.lineTo(cx, cy);
            ctx.fill();
        }
    },
]
//#endregion

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
]


export const SKINS = [
    ...classicSkins,
    //...animatedSkins,
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