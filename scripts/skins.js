// scripts/skins.js
const skins = [
    {
        id: 0,
        name: "Classic",
        draw(ctx, p, time) {
            const { x, y, size, cx, cy } = getPlayerVars(p);
            ctx.fillStyle = "white";
            ctx.fillRect(p.x, p.y, p.baseSize, p.baseSize);
        }
    },
    {
        id: 1,
        name: "Classic",
        draw(ctx, p, time) {
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
        id: 2,
        name: "Classic",
        draw(ctx, p, time) {
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
        id: 3,
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
        id: 4,
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
        id: 5,
        name: "Classic",
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
        id: 6,
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
        id: 7,
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
        id: 8,
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
        id: 9,
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
        id: 10,
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
        id: 11,
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
        id: 12,
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
        id: 13,
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
        id: 14,
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
        id: 15,
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
    }, {
        id: 16,
        name: "Skibidi",
        img: new Image(),
        draw(ctx, p, time) {
            const { x, y, size } = getPlayerVars(p);

            if (this.img.complete) {
                ctx.drawImage(this.img, x, y, size, size);
            }
        }
    }
]

skins[16].img.src = "../icons/skins/Skibidi_Toilet.png";
export const SKINS = skins;
export const SKINS_COUNT = skins.length;

export function handleSkins(ctx, player) {
    const skin = SKINS[player.selectedSkin];

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