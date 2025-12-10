export function handleSkins(ctx, player) {
    const x = player.x;
    const y = player.y;
    const size = player.baseSize;

    ctx.save();

    switch (player.selectedSkin) {
        case 0: // Skin 0: Domyślny (Biały kwadrat)
            ctx.fillStyle = "white";
            ctx.fillRect(x, y, size, size);
            break;

        case 1: // Skin 1: "Neon" (Pusty środek, gruby obrys)
            ctx.lineWidth = 4;
            ctx.strokeStyle = "#00ffcc"; // Turkusowy neon
            ctx.shadowColor = "#00ffcc";
            ctx.shadowBlur = 15;
            ctx.strokeRect(x + 2, y + 2, size - 4, size - 4);
            break;

        case 2: // Skin 2: "Oko" (Koło z źrenicą)
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(x + size / 2, y + size / 2, size / 5, 0, Math.PI * 2);
            ctx.fill();
            break;
            
        case 3: // Skin 3: Gradient
            const gradient = ctx.createLinearGradient(x, y, x, y + size);
            gradient.addColorStop(0, "#ff9966");
            gradient.addColorStop(1, "#ff5e62");
            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, size, size);
            break;

        default:
            ctx.fillStyle = "white";
            ctx.fillRect(x, y, size, size);
            break;
    }

    ctx.restore();
}