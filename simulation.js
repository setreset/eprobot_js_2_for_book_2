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

        this.plant_counter = 0;

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

    seed_plants(){
        if (this.plant_counter<settings.number_of_plants){
            let pc = this.plant_counter;
            for (let i=0;i<settings.number_of_plants-pc;i++){
                let p = new Plant(this);
                let rand_x = tools_random(this.world_width_visible);
                let rand_y = tools_random(this.world_height_visible);

                let t = this.world.get_terrain(rand_x, rand_y);
                if (t.energy_object==null && t.slot_object==null){
                    this.world.world_set_energy(p, rand_x, rand_y);
                    this.plant_counter++;
                }
            }
        }
    }

    simulation_step(){
        this.seed_plants();

        let list_eprobots_next = [];
        for (let o of this.list_eprobots) {
            if (o.age<o.get_max_age()){
                o.step();
                list_eprobots_next.push(o);
                this.try_fork(o, list_eprobots_next);
            }else{
                console.log("dead");
                this.world.world_unset(o, o.position_x, o.position_y);
            }

        }

        this.list_eprobots = list_eprobots_next;
    }

    try_fork(o, list_eprobots_next){
        if (o.energy>0){
            let spreadval = tools_random(8);
            let vec = DIRECTIONS[spreadval];
            let spreadpos_x = o.position_x + vec.x;
            let spreadpos_y = o.position_y + vec.y;
            let spreadterrain = this.world.get_terrain(spreadpos_x, spreadpos_y);
            if (spreadterrain.slot_object==null){
                console.log("spread");
                let eprobot = new Eprobot(this);
                this.world.world_set(eprobot, spreadpos_x, spreadpos_y);
                list_eprobots_next.push(eprobot);
                o.energy--;
            }
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