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