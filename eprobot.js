class Eprobot{
    constructor(s) {
        this.position_x = null;
        this.position_y = null;

        this.s = s;

        this.age = 0;
        this.max_age = settings.eprobots_max_age + tools_random(100);
        this.energy = 0;
    }

    get_color(){
        return "#f50000";
    }

    get_max_age(){
        return this.max_age;
    }

    step(){
        let moveval = tools_random(9);
        if (moveval<DIRECTIONS.length){
            let vec = DIRECTIONS[moveval];
            let movepos_x = this.position_x + vec.x;
            let movepos_y = this.position_y + vec.y;

            let t_new = this.s.world.get_terrain(movepos_x, movepos_y);
            if (t_new.slot_object==null){
                this.s.world.world_move(this, this.position_x, this.position_y, movepos_x, movepos_y);
                if (t_new.energy_object){
                    console.log("mampf");
                    t_new.energy_object = null;
                    this.s.plant_counter--;
                    this.energy++;
                }
            }else{
                console.log("autsch!");
            }
        }
        this.age++;
    }
}