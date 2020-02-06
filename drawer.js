class Drawer {

    constructor(s, canvas) {
        this.s = s;
        this.canvas = canvas;
        this.canvas_ctx = canvas.getContext('2d', {alpha: false});
        this.x_step = null;
        this.y_step = null;

        this.paintlist = [];

        this.init_canvas();
    }

    init_canvas(){
        // korrigieren weil nur der innere bereich angezeigt wird
        this.x_step = this.canvas.width / (this.s.world_width_visible);
        this.y_step = this.canvas.height / (this.s.world_height_visible);
    }

    paint_fast(){
        for (let terrain of this.paintlist){

            this.canvas_ctx.fillStyle = terrain.get_color();
            // mit positionskorrektur für zeichenbereich
            this.canvas_ctx.fillRect((terrain.x - 1) * this.x_step, (terrain.y - 1) * this.y_step, this.x_step, this.y_step);
            terrain.dirty = false;
        }

        this.paintlist = [];
    }
}