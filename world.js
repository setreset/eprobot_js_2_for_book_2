class World {

    constructor(s, width, height) {
        console.log("World constructor");

        this.s = s;

        // init
        this.worldarr = new Array(width);
        for (var x=0;x<this.worldarr.length;x++){
            this.worldarr[x] = new Array(height);
            for (var y=0;y<height;y++){
                this.worldarr[x][y] = new Terrain(s, x, y);
            }
        }
    }

    get_terrain(x, y){
        return this.worldarr[x][y];
    }

    world_set(o, x_pos, y_pos){
        var t = this.get_terrain(x_pos, y_pos);
        t.slot_object = o;
        o.position_x = x_pos;
        o.position_y = y_pos;

        t.prepare_paint();
    }

}