export class Player {
    constructor(x = 0, y = 0, size = 50, selectedSkin = "default", selectedEffect = "none") {
        this.x = x;
        this.y = y;
        this.baseSize = size;
        this.selectedSkin = selectedSkin;
        this.selectedEffect = selectedEffect;
        this.lane = 1; // 0 = Lewy, 1 = Środkowy, 2 = Prawy
        this.isDead = false;
    }

    move(direction) {
        if(this.isDead) return;
        this.lane += direction;

        if (this.lane < 0) this.lane = 0;
        if (this.lane > 2) this.lane = 2;
    }

    setPlayerPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    die(){
        this.isDead = true;
    }
}