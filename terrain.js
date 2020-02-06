class Terrain {

    constructor(s, x, y) {
        this.s = s;

        this.x = x;
        this.y = y;

        this.dirty = false;

        this.slot_object = null;
    }
}