import { canvas, ctx, off, offCtx } from "../UI/ui_other.js"

export function checkScreenSizeForOptimalGameplayMenu(canvas) {
    var squareSize = Math.max(1, Math.floor(canvas.clientWidth / 3));
    if (squareSize >= 100) {
        squareSize = 100;
    }
    return squareSize;
}

export function checkScreenSizeForOptimalGameplayGame(canvas, buffer) {
    var squareSize = Math.max(1, Math.floor(canvas.clientWidth / 3 - buffer));
    if (squareSize >= 100) {
        squareSize = 100;
    }
    var playerSize = squareSize - buffer * 3;

    return {
        squareSize: squareSize,
        playerSize: playerSize
    };
}

export function checkScreenSizeForOptimalSkinsPreview(canvas, buffer) {
    var squareSize = Math.max(1, Math.floor(canvas.clientWidth / 4 - buffer));

    if (squareSize >= 80) {
        squareSize = 80;
    }

    return squareSize
}

function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    off.width = canvas.width;
    off.height = canvas.height;
    offCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener("resize", resize);
resize();