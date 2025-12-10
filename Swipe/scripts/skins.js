// scripts/skins.js

export function handleSkins(ctx, player) {
    const x = player.x;
    const y = player.y;
    const size = player.baseSize;
    const cx = x + size / 2;
    const cy = y + size / 2;
    
    const time = Date.now() / 1000; 

    ctx.save();

    switch (player.selectedSkin) {
        case 0:
            ctx.fillStyle = "white";
            ctx.fillRect(x, y, size, size);
            break;
        case 1:
            ctx.lineWidth = 4;
            ctx.strokeStyle = "#00ffcc";
            ctx.shadowColor = "#00ffcc";
            ctx.shadowBlur = 20;
            ctx.strokeRect(x + 2, y + 2, size - 4, size - 4);
            ctx.fillStyle = "rgba(0, 255, 204, 0.2)";
            ctx.fillRect(x + 2, y + 2, size - 4, size - 4);
            break;
        case 2:
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(cx, cy, size / 5, 0, Math.PI * 2);
            ctx.fill();
            break;
        case 3:
            const grad = ctx.createLinearGradient(x, y, x, y + size);
            grad.addColorStop(0, "#ff9966");
            grad.addColorStop(1, "#ff5e62");
            ctx.fillStyle = grad;
            ctx.fillRect(x, y, size, size);
            break;
        case 4:
            const hue = (Date.now() / 10) % 360;
            ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
            ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
            ctx.shadowBlur = 15;
            ctx.fillRect(x, y, size, size);
            break;
        case 5:
            const offset = Math.random() * 4 - 2;
            ctx.globalCompositeOperation = "screen";
            ctx.fillStyle = "rgba(255, 0, 0, 0.8)";
            ctx.fillRect(x + offset, y, size, size);
            ctx.fillStyle = "rgba(0, 0, 255, 0.8)";
            ctx.fillRect(x - offset, y, size, size);
            ctx.fillStyle = "rgba(0, 255, 0, 0.8)";
            ctx.fillRect(x, y + offset, size, size);
            break;
        case 6:
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
            ctx.arc(0, 0, size/5, 0, Math.PI * 2);
            ctx.fill();
            break;
        case 7:
            ctx.fillStyle = "black";
            ctx.shadowColor = "purple";
            ctx.shadowBlur = 20 + Math.sin(time * 5) * 10;
            ctx.beginPath();
            ctx.arc(cx, cy, size / 2.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "violet";
            ctx.lineWidth = 2;
            ctx.stroke();
            break;
        case 8:
            ctx.fillStyle = "black";
            ctx.fillRect(x, y, size, size);
            ctx.fillStyle = "#00ff00";
            ctx.font = `${size/3}px monospace`;
            ctx.textAlign = "center";
            ctx.fillText(Math.round(Math.random()), cx - size/4, cy);
            ctx.fillText(Math.round(Math.random()), cx + size/4, cy + size/4);
            ctx.fillText(Math.round(Math.random()), cx, cy - size/4);
            break;
        case 9:
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(cx, cy, size/2, 0, Math.PI*2);
            ctx.fill();
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(cx, cy, size/2, Math.PI, 0); 
            ctx.fill();
            ctx.fillStyle = "black";
            ctx.fillRect(x, cy - 2, size, 4);
            ctx.beginPath();
            ctx.arc(cx, cy, size/6, 0, Math.PI*2);
            ctx.fill();
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(cx, cy, size/10, 0, Math.PI*2);
            ctx.fill();
            break;
        case 10:
            ctx.fillStyle = "#32CD32";
            ctx.beginPath();
            ctx.moveTo(x, cy);
            ctx.bezierCurveTo(x, y, x + size, y, x + size, cy);
            const wobble = Math.sin(time * 10) * 5;
            ctx.bezierCurveTo(x + size + wobble, y + size, x - wobble, y + size, x, cy);
            ctx.fill();
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(cx - size/4, cy - size/6, size/8, 0, Math.PI*2);
            ctx.arc(cx + size/4, cy - size/6, size/8, 0, Math.PI*2);
            ctx.fill();
            break;
        case 11:
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
            break;

        case 12:
            ctx.strokeStyle = "#00FFFF";
            ctx.lineWidth = 2;
            
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(cx, cy, size/6, 0, Math.PI*2);
            ctx.fill();

            ctx.translate(cx, cy);

            ctx.rotate(time * 2);
            ctx.beginPath();
            ctx.ellipse(0, 0, size/1.5, size/4, 0, 0, Math.PI*2);
            ctx.stroke();
 
            ctx.fillStyle = "#00FFFF";
            ctx.beginPath();
            ctx.arc(size/1.5, 0, 3, 0, Math.PI*2);
            ctx.fill();


            ctx.rotate(Math.PI/2); 
            ctx.beginPath();
            ctx.ellipse(0, 0, size/1.5, size/4, 0, 0, Math.PI*2);
            ctx.stroke();

             ctx.beginPath();
             ctx.arc(size/1.5, 0, 3, 0, Math.PI*2);
             ctx.fill();
            break;

        case 13:
            ctx.fillStyle = "#00AA00";
            ctx.fillRect(x, y, size, size);
            ctx.fillStyle = "black";
            const s = size / 8;

            ctx.fillRect(x + 1*s, y + 2*s, 2*s, 2*s);
            ctx.fillRect(x + 5*s, y + 2*s, 2*s, 2*s);

            ctx.fillRect(x + 3*s, y + 4*s, 2*s, 3*s); 
            ctx.fillRect(x + 2*s, y + 5*s, 1*s, 3*s); 
            ctx.fillRect(x + 5*s, y + 5*s, 1*s, 3*s); 
            break;

        case 14: 
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(cx, cy, size/2.5, 0, Math.PI*2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, cy);
            ctx.lineTo(x + size, cy);
            ctx.moveTo(cx, y);
            ctx.lineTo(cx, y + size);
            ctx.stroke();

            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(cx, cy, 2, 0, Math.PI*2);
            ctx.fill();
            break;

        case 15: 
            ctx.fillStyle = "yellow";
            const mouthOpen = Math.abs(Math.sin(time * 10)) * 0.2 * Math.PI;
            ctx.beginPath();

            ctx.arc(cx, cy, size/2, mouthOpen, Math.PI * 2 - mouthOpen);
            ctx.lineTo(cx, cy);
            ctx.fill();
            break;

        case 16:
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(cx, cy - size/6, size/2.5, Math.PI, 0); 
            ctx.lineTo(x + size - 5, y + size);
            ctx.lineTo(cx, y + size - 10);
            ctx.lineTo(x + 5, y + size);
            ctx.fill();

            ctx.fillStyle = "black";
            ctx.globalAlpha = 1;
            ctx.beginPath();
            ctx.arc(cx - size/5, cy - size/6, 3, 0, Math.PI*2);
            ctx.arc(cx + size/5, cy - size/6, 3, 0, Math.PI*2);
            ctx.fill();
            break;

        case 17: 
            for(let i=0; i<size; i+=4) {
                for(let j=0; j<size; j+=4) {
                    const gray = Math.random() * 255;
                    ctx.fillStyle = `rgb(${gray}, ${gray}, ${gray})`;
                    ctx.fillRect(x + i, y + j, 4, 4);
                }
            }
            break;

        case 18:
            ctx.translate(cx, cy);
            ctx.rotate(time);
            
            ctx.strokeStyle = "#00aaff";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(0, 0, size/2.2, 0, Math.PI);
            ctx.stroke();

            ctx.strokeStyle = "#ffaa00";
            ctx.beginPath();
            ctx.arc(0, 0, size/2.2, Math.PI, Math.PI*2);
            ctx.stroke();
            break;

        case 19:
            ctx.fillStyle = "#004400";
            ctx.fillRect(x, y, size, size);
            ctx.strokeStyle = "#00ff00"; 
            ctx.lineWidth = 2;
            
            ctx.beginPath();
            ctx.moveTo(x + size/4, y);
            ctx.lineTo(x + size/4, cy);
            ctx.lineTo(x + size, cy);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(x, y + size/3);
            ctx.lineTo(cx, y + size/3);
            ctx.lineTo(cx, y + size);
            ctx.stroke();

            ctx.fillStyle = "#aaeeaa";
            ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI*2); ctx.fill();
            ctx.beginPath(); ctx.arc(x+size/4, cy, 3, 0, Math.PI*2); ctx.fill();
            break;

        case 20:
            ctx.fillStyle = "#1a1a1a";
            ctx.beginPath();
            ctx.moveTo(cx, y); 
            ctx.lineTo(x + size, y + size); 
            ctx.lineTo(x, y + size); 
            ctx.closePath();
            ctx.fill();
            
   
            ctx.strokeStyle = "#d4af37";
            ctx.lineWidth = 2;
            ctx.stroke();

 
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.moveTo(cx - size/4, cy + size/6);
            ctx.quadraticCurveTo(cx, cy - size/6, cx + size/4, cy + size/6);
            ctx.quadraticCurveTo(cx, cy + size/2, cx - size/4, cy + size/6);
            ctx.fill();
            ctx.fillStyle = "black";
            ctx.beginPath(); ctx.arc(cx, cy + size/5, size/12, 0, Math.PI*2); ctx.fill();
            break;

        case 21:
            ctx.fillStyle = "#333";
            ctx.fillRect(x + size/4, y + size/6, size/2, size/1.5);
      
            ctx.fillRect(x + size/3, y + size/12, size/3, size/12);
      
            const charge = (Math.sin(time*2) + 1) / 2; // 0 do 1
            const color = charge < 0.2 ? "red" : "lime";
            ctx.fillStyle = color;
            const barHeight = (size/1.5 - 4) * charge;
            ctx.fillRect(x + size/4 + 2, y + size/6 + (size/1.5) - barHeight - 2, size/2 - 4, barHeight);
            break;
            
        case 22:
            ctx.fillStyle = "#ff5555"; 
            ctx.fillRect(x, y + size/4, size*0.75, size*0.75);
            
            ctx.fillStyle = "#aa0000"; 
            ctx.beginPath();
            ctx.moveTo(x, y + size/4);
            ctx.lineTo(x + size/4, y);
            ctx.lineTo(x + size, y);
            ctx.lineTo(x + size*0.75, y + size/4);
            ctx.fill();

            ctx.fillStyle = "#550000"; 
            ctx.beginPath();
            ctx.moveTo(x + size*0.75, y + size/4);
            ctx.lineTo(x + size, y);
            ctx.lineTo(x + size, y + size*0.75);
            ctx.lineTo(x + size*0.75, y + size);
            ctx.fill();
            break;
            
        case 23:
            ctx.translate(cx, cy);
            ctx.rotate(time / 2);
            ctx.fillStyle = "orange";
            ctx.beginPath();
 
            for(let i=0; i<8; i++) {
                ctx.rotate(Math.PI/4);
                ctx.fillRect(-size/8, -size/1.6, size/4, size/3);
            }
  
            ctx.fillStyle = "yellow";
            ctx.beginPath();
            ctx.arc(0, 0, size/2.5, 0, Math.PI*2);
            ctx.fill();
            break;

        case 24: 
            ctx.fillStyle = "#00aaff";
            ctx.beginPath();
            ctx.moveTo(cx, y);
            ctx.lineTo(x + size, cy); 
            ctx.lineTo(cx, y + size);
            ctx.lineTo(x, cy); 
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
            ctx.beginPath();
            ctx.moveTo(cx, y); 
            ctx.lineTo(x + size*0.7, cy); 
            ctx.lineTo(cx, y + size*0.7); 
            ctx.lineTo(x + size*0.3, cy); 
            ctx.fill();
            break;

        default: 
            ctx.fillStyle = "white";
            ctx.fillRect(x, y, size, size);
            break;
    }

    ctx.restore();
}