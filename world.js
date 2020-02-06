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

}