let touchStartX = 0;
let touchEndX = 0;
function handleGesture() {
    //console.log("Handling gesture");
    if (state.playerScene !== state.scenes.Game) return;

    const threshold = 30;

    if (touchEndX < touchStartX - threshold) {
        player.move(-1);
    }

    if (touchEndX > touchStartX + threshold) {
        player.move(1);
    }
}

function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}
//MOBILE
document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
});

//PC
document.addEventListener("mousedown", (e) => {
    touchStartX = e.screenX;
});

document.addEventListener("mouseup", (e) => {
    touchEndX = e.screenX;
    handleGesture();
});