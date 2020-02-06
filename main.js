document.addEventListener("DOMContentLoaded", function() {
    console.log("Eprobots JS Tutorial - Start");
    let running = false;

    let canvas = document.getElementById("canvas");
    var simulation = new Simulation(canvas);

    function simulation_loop(){
        let steptime_start = new Date().getTime();

        simulation.simulation_step();
        simulation.drawer.paint_fast();

        let steptime_end = new Date().getTime();
        let current_frame_time = steptime_end - steptime_start;

        if (running) {
            let st = settings.frame_time - current_frame_time;
            setTimeout(()=>{simulation_loop()}, st);
        }
    }

    function startstop_button_handler(){
        console.log("start stop button clicked");
        running = !running;
        if (running){
            simulation_loop();
        }
    }

    document.getElementById("btn_start_stop").addEventListener("click", startstop_button_handler);
});