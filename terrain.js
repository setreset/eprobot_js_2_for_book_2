class Terrain {

    constructor(s, x, y) {
        this.s = s;

        this.x = x;
        this.y = y;

        this.dirty = false;

        this.slot_object = null;
    }

    prepare_paint(){
        if (this.dirty == false){
            this.dirty = true;
            this.s.drawer.paintlist.push(this);
        }
    }

    get_color(){
        if (this.slot_object){
            return this.slot_object.get_color();
        }else{
            return "#000000";
        }
    }
}