class Eprobot{
    constructor(s, program, init_data) {
        this.position_x = null;
        this.position_y = null;

        this.s = s;

        this.age = 0;
        this.max_age = settings.eprobots_max_age + tools_random(100);
        this.energy = 0;

        this.program = program;

        this.init_data = init_data;
        this.working_data = init_data.slice(0);
    }

    get_color(){
        return "#f50000";
    }

    get_max_age(){
        return this.max_age;
    }

    map_output_val(val, number_of_values){
        if (isFinite(val)){
            var mapped_val = Math.abs(val) % (number_of_values);
        }else{
            var mapped_val = tools_random(number_of_values);
        }
        return mapped_val;
    }

    get_output_OISC(){
        tools_compute(this.program, this.working_data, settings.program_steps_max);

        let moveval_raw = this.working_data[0];
        let moveval = this.map_output_val(moveval_raw, DIRECTIONS.length + 1);

        return moveval;
    }

    step(){
        let moveval = this.get_output_OISC();
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