class Simulation {

    constructor(canvas) {
        console.log("Simulation class init")
        let canvas_width = canvas.width;
        let canvas_height = canvas.height;
        console.log("Canvas: "+canvas_width+"x"+canvas_height);

        this.world_width = canvas_width/settings.pixel_size+2;
        this.world_height = canvas_height/settings.pixel_size+2;
        console.log("world dimensions: "+this.world_width+"x"+this.world_height);
        this.world_width_visible = this.world_width-2;
        this.world_height_visible = this.world_height-2;

        this.world = new World(this, this.world_width, this.world_height);
        this.drawer = new Drawer(this, canvas);

        let eprobot = new Eprobot(this);
        this.world.world_set(eprobot, 10, 10);

        this.drawer.paint_fast();
    }
}