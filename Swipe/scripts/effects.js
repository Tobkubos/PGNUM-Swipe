const particles = [];

class Particle {
    constructor(x, y, size, type) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.opacity = 1;
        this.type = type;

        switch (this.type) {
        case 1: // Efekt 1: Białe kwadraty opadające w dół
            this.speedY = Math.random() * 0.1 + 0.75;
            this.speedX = (Math.random() - 0.5) * 1;
            this.fadeSpeed = Math.random() * 0.05 + 0.005;
            this.color = "white";
            break;
        default:
            break;
        }
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= this.fadeSpeed;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.opacity);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.restore();
    }
}

export function handleEffects(ctx, player) {
    if (player.selectedEffect === 1) {
        let spawnCount = Math.round(Math.random());
        for (let i = 0; i < spawnCount; i++) {
            particles.push(new Particle(
                player.x + Math.random() * player.baseSize - 5, // Losowy X wewnątrz gracza
                player.y + player.baseSize,                     // Start od dołu gracza
                player.baseSize / 10,                           // Rozmiar cząsteczki
                1                                               // ID efektu
            ));
        }
    }

    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update();
        p.draw(ctx);

        if (p.opacity <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }
}