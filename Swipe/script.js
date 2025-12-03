const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener('resize', resize);
resize();



// Game Loop
function gameLoop() {
    const gap = 0;       
    const buffer = 10; 
    var squareSize = Math.max(1, Math.floor(canvas.clientWidth / 3 - buffer));
    if(squareSize >= 100) {squareSize = 100;}
    const topMargin = 10; 

    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    const totalWidth = squareSize * 3 + gap * 2;
    const startX = (canvas.clientWidth - totalWidth) / 2;

    const colors = ['#ff4d4d', '#4dff88', '#4d88ff'];
    for (let i = 0; i < 3; i++) {
        ctx.fillStyle = colors[i % colors.length];
        const x = startX + i * (squareSize + gap);
        ctx.fillRect(x, topMargin, squareSize, squareSize);
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker zarejestrowany!', reg))
            .catch(err => console.log('Błąd Service Workera:', err));
    });
}
