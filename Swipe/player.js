export class Player{
    constructor(x = 0, y = 0, size = 50, selectedSkin = 0, selectedEffect = 0) {
        this.x = x;
        this.y = y;
        this.baseSize = size;
        this.selectedSkin = selectedSkin;
        this.selectedEffect = selectedEffect;
    }
    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.baseSize, this.baseSize);
    }
}