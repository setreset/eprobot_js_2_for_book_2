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

        this.add_borders();

        this.list_eprobots = [];
        for (let i=0;i<10;i++){
            let eprobot = new Eprobot(this);
            let rand_x = tools_random(this.world_width_visible);
            let rand_y = tools_random(this.world_height_visible);

            if (this.world.get_terrain(rand_x, rand_y).slot_object==null){
                this.world.world_set(eprobot, rand_x, rand_y);
                this.list_eprobots.push(eprobot);
            }
        }

        this.drawer.paint_fast();
    }

    simulation_step(){
        for (let o of this.list_eprobots) {
            o.step();
        }
    }

    add_borders(){
        for (let x=0;x<this.world_width;x++){
            let b = new Barrier(this);
            this.world.world_set(b, x, 0);

            let b2 = new Barrier(this);
            this.world.world_set(b2, x, this.world_height-1);
        }

        for (let y=1;y<this.world_height-1;y++){
            let b = new Barrier(this);
            this.world.world_set(b, 0, y);

            let b2 = new Barrier(this);
            this.world.world_set(b2, this.world_width-1, y);
        }
    }
}