export class Player {
    constructor(x = 0, y = 0, size = 50, selectedSkin = 0, selectedEffect = 0) {
        this.x = x;
        this.y = y;
        this.baseSize = size;
        this.selectedSkin = selectedSkin;
        this.selectedEffect = selectedEffect;
        this.lane = 1; // 0 = Lewy, 1 = Środkowy, 2 = Prawy
    }

    move(direction) {
        this.lane += direction;

        if (this.lane < 0) this.lane = 0;
        if (this.lane > 2) this.lane = 2;
    }
}