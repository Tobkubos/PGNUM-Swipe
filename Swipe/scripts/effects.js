const particles = [];

class Particle {
    constructor(x, y, size, type) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.initialSize = size;
        this.opacity = 1;
        this.type = type;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = 0;
        this.gravity = 0;
        this.drag = 1;
        this.shape = "square"; 
        this.text = "";

        switch (this.type) {
            case 1: 
                this.speedY = Math.random() * 0.1 + 0.75;
                this.speedX = (Math.random() - 0.5) * 1;
                this.fadeSpeed = 0.03;
                this.color = "white";
                break;
            case 2: 
                this.speedY = 2 + Math.random() * 2;
                this.speedX = (Math.random() - 0.5) * 2;
                this.fadeSpeed = 0.05;
                this.color = `hsl(${10 + Math.random() * 40}, 100%, 50%)`;
                this.size *= 1.5;
                break;
            case 3: 
                this.speedY = 0;
                this.speedX = 0;
                this.fadeSpeed = 0.02;
                this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
                this.size *= 0.8;
                break;
            case 4: 
                this.speedY = 3;
                this.speedX = 0;
                this.fadeSpeed = 0.015;
                this.color = "#00ff00";
                this.shape = "text";
                this.text = Math.random() > 0.5 ? "1" : "0";
                this.size = 14;
                break;
            case 5: 
                this.speedY = -1 - Math.random();
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.fadeSpeed = 0.01;
                this.color = "rgba(0, 150, 255, 0.6)";
                this.shape = "circle";
                this.stroke = true;
                break;
            case 6: 
                this.speedY = (Math.random() - 0.5) * 10;
                this.speedX = (Math.random() - 0.5) * 10;
                this.fadeSpeed = 0.04;
                this.color = "yellow";
                //this.gravity = 0.5;
                this.size *= 0.5;
                break;
            case 7: 
                this.speedY = 1;
                this.speedX = 0;
                this.fadeSpeed = 0.02;
                this.color = "black";
                this.shape = "circle";
                this.stroke = true;
                this.borderColor = "purple";
                break;
            case 8: 
                this.speedY = 2;
                this.speedX = Math.sin(Math.random() * 10);
                this.fadeSpeed = 0.01;
                this.color = "white";
                this.shape = "circle";
                break;
            case 9: 
                this.speedY = 0;
                this.speedX = (Math.random() - 0.5) * 10;
                this.fadeSpeed = 0.1;
                this.color = `rgb(${Math.random()*255}, 0, ${Math.random()*255})`;
                this.size = Math.random() * 40 + 5;
                this.shape = "rect_random";
                break;
            case 10: 
                this.speedY = -1.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.fadeSpeed = 0.01;
                this.color = "pink";
                this.shape = "heart";
                break;
            case 11: 
                this.speedY = 15;
                this.speedX = 0;
                this.fadeSpeed = 0.05;
                this.color = "cyan";
                this.size = 2;
                this.shape = "line";
                break;
            case 12: 
                this.speedY = 1;
                this.speedX = (Math.random() - 0.5) * 2;
                this.fadeSpeed = 0.02;
                this.color = "#39ff14";
                this.shape = "circle";
                this.size *= Math.random();
                break;
            case 13: 
                this.speedY = -3;
                this.speedX = (Math.random() - 0.5) * 4;
                this.fadeSpeed = 0.04;
                this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
                this.gravity = 0.2;
                this.rotationSpeed = 0.2;
                this.size *= 0.6;
                break;
            case 14: 
                this.speedY = 1;
                this.speedX = (Math.random() - 0.5) * 1;
                this.fadeSpeed = 0.015;
                this.color = "rgba(100, 100, 100, 0.2)";
                this.size *= 2;
                this.growth = 0.5;
                this.shape = "circle";
                break;
            case 15: 
                this.speedY = 0;
                this.speedX = 0;
                this.fadeSpeed = 0.05;
                this.color = "white";
                this.shape = "pixel_grid";
                break;
            case 16: 
                this.speedY = (Math.random() - 0.5) * 5;
                this.speedX = (Math.random() - 0.5) * 5;
                this.fadeSpeed = 0.08;
                this.color = "#00ffff";
                this.shape = "line_random";
                break;
            case 17: 
                this.speedY = 0;
                this.speedX = 0;
                this.fadeSpeed = 0.02;
                this.color = "yellow";
                this.shape = "star";
                this.rotationSpeed = 0.1;
                break;
            case 18: 
                this.speedY = -1;
                this.speedX = Math.sin(y) * 2;
                this.fadeSpeed = 0.01;
                this.color = "black";
                this.shape = "note";
                break;
            case 19: 
                this.speedY = 0;
                this.speedX = (Math.random() - 0.5) * 2;
                this.gravity = 0.3;
                this.fadeSpeed = 0.01;
                this.color = "#8a0303";
                this.shape = "circle";
                break;
            case 20: 
                this.speedY = (Math.random() - 0.5) * 2;
                this.speedX = (Math.random() - 0.5) * 2;
                this.fadeSpeed = 0.02;
                this.color = "violet";
                this.rotationSpeed = 0.1;
                this.shape = "spiral";
                break;
            case 21: 
                this.speedY = 0;
                this.speedX = 0;
                this.fadeSpeed = 0.1;
                this.color = "rgba(255,255,255,0.5)";
                this.shape = "clone";
                break;
            case 22: 
                this.speedY = -4;
                this.speedX = (Math.random() - 0.5) * 2;
                this.gravity = 0.2;
                this.fadeSpeed = 0.01;
                this.color = "gold";
                this.shape = "circle";
                this.stroke = true;
                this.borderColor = "#B8860B";
                break;
            case 23: 
                this.speedY = 2;
                this.speedX = 0;
                this.fadeSpeed = 0.02;
                this.color = "#00ff00";
                this.shape = "text_code";
                this.text = String.fromCharCode(0x30A0 + Math.random() * 96);
                break;
            case 24: 
                this.speedY = 1;
                this.speedX = Math.sin(Math.random() * 10);
                this.fadeSpeed = 0.01;
                this.color = "pink";
                this.rotationSpeed = 0.05;
                this.shape = "petal";
                break;
            case 25: 
                this.speedY = 5;
                this.speedX = (Math.random() - 0.5) * 1;
                this.fadeSpeed = 0.06;
                this.color = "blue";
                this.size *= 0.8;
                break;
        }
    }

    update() {
        this.speedY += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= this.fadeSpeed;
        this.rotation += this.rotationSpeed;
        if (this.growth) this.size += this.growth;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.opacity);
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.borderColor || this.color;
        
        const s = this.size;

        switch(this.shape) {
            case "square":
                ctx.fillRect(-s/2, -s/2, s, s);
                break;
            case "circle":
                ctx.beginPath();
                ctx.arc(0, 0, s/2, 0, Math.PI*2);
                ctx.fill();
                if(this.stroke) {
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }
                break;
            case "rect_random":
                ctx.fillRect(-s/2, -s/8, s, s/4);
                break;
            case "heart":
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(-s/2, -s/2, -s, s/3, 0, s);
                ctx.bezierCurveTo(s, s/3, s/2, -s/2, 0, 0);
                ctx.fill();
                break;
            case "text":
            case "text_code":
                ctx.font = `${s}px monospace`;
                ctx.textAlign = "center";
                ctx.fillText(this.text, 0, 0);
                break;
            case "line":
                ctx.fillRect(-s/4, -s*2, s/2, s*4);
                break;
            case "line_random":
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(-s, -s);
                ctx.lineTo(s, s);
                ctx.stroke();
                break;
            case "star":
                ctx.beginPath();
                for(let i=0; i<5; i++){
                    ctx.lineTo(Math.cos((18+i*72)/180*Math.PI)*s, 
                               -Math.sin((18+i*72)/180*Math.PI)*s);
                    ctx.lineTo(Math.cos((54+i*72)/180*Math.PI)*s/2, 
                               -Math.sin((54+i*72)/180*Math.PI)*s/2);
                }
                ctx.closePath();
                ctx.fill();
                break;
            case "note":
                ctx.font = `${s}px Arial`;
                ctx.textAlign = "center";
                ctx.fillText("♪", 0, 0);
                break;
            case "clone":
                ctx.fillRect(-s/2, -s/2, s, s);
                break;
            case "spiral":
                ctx.fillRect(s, 0, s/4, s/4);
                break;
            case "petal":
                ctx.beginPath();
                ctx.ellipse(0, 0, s/2, s/4, 0, 0, Math.PI*2);
                ctx.fill();
                break;
            case "pixel_grid":
                ctx.fillRect(-s/2, -s/2, s, s);
                break;
            default:
                ctx.fillRect(-s/2, -s/2, s, s);
        }

        ctx.restore();
    }
}

export function handleEffects(ctx, player) {
    let spawnCount = 0;
    
    switch (player.selectedEffect) {
        case 1: spawnCount = Math.round(Math.random()); break;
        case 2: spawnCount = 2; break; 
        case 3: spawnCount = 1; break; 
        case 4: spawnCount = Math.random() > 0.7 ? 1 : 0; break;
        case 5: spawnCount = Math.random() > 0.8 ? 1 : 0; break;
        case 6: spawnCount = 3; break;
        case 7: spawnCount = Math.random() > 0.9 ? 1 : 0; break;
        case 8: spawnCount = Math.round(Math.random()); break;
        case 9: spawnCount = Math.random() > 0.5 ? 1 : 0; break;
        case 10: spawnCount = Math.random() > 0.9 ? 1 : 0; break;
        case 11: spawnCount = 2; break;
        case 12: spawnCount = Math.round(Math.random()); break;
        case 13: spawnCount = 3; break;
        case 14: spawnCount = Math.random() > 0.8 ? 1 : 0; break;
        case 15: spawnCount = 1; break;
        case 16: spawnCount = 2; break;
        case 17: spawnCount = Math.random() > 0.8 ? 1 : 0; break;
        case 18: spawnCount = Math.random() > 0.9 ? 1 : 0; break;
        case 19: spawnCount = 1; break;
        case 20: spawnCount = 2; break;
        case 21: spawnCount = Math.random() > 0.8 ? 1 : 0; break;
        case 22: spawnCount = Math.random() > 0.5 ? 1 : 0; break;
        case 23: spawnCount = 1; break;
        case 24: spawnCount = Math.round(Math.random()); break;
        case 25: spawnCount = 4; break;
    }

    for (let i = 0; i < spawnCount; i++) {
        let px = player.x + Math.random() * player.baseSize;
        let py = player.y + player.baseSize;
        let pSize = player.baseSize / 6;

        if (player.selectedEffect === 21) {
            px = player.x + player.baseSize/2;
            py = player.y + player.baseSize/2;
            pSize = player.baseSize;
        } else if (player.selectedEffect === 4 || player.selectedEffect === 23) {
            py = player.y; 
        }

        particles.push(new Particle(px, py, pSize, player.selectedEffect));
    }

    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update();
        p.draw(ctx);

        if (p.opacity <= 0 || p.size <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }
}