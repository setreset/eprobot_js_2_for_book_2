// liefert ganzzahlen von 0 bis max-1
function tools_random(max){
    return Math.floor(Math.random()*max);
}

// liefert ganzzahlen von min bis max-1
function tools_random2(min, max){
    var delta = max - min;
    return Math.floor(Math.random()*delta)+min;
}

function tools_compute(program, data, PS) {
    var program_counter = 0;
    var step_counter = 0;
    var a, b, c;

    while (program_counter >= 0 && (program_counter + 2) < program.length && step_counter < PS) {
        a = program[program_counter];
        b = program[program_counter + 1];
        c = program[program_counter + 2];

        a = a % data.length;
        b = b % data.length;
        c = c % program.length;

        if (a < 0 || b < 0) {
            program_counter = -1;
        }else{
            data[b] = data[b] - data[a];
            if (data[b] > 0) {
                program_counter = program_counter + 3;
            } else {
                program_counter = c;
            }
        }
        step_counter++;
    }
    return step_counter;
}

function tools_mutate(mutate_possibility, mutate_strength, memory) {
    var new_memory = [];
    for (var i=0;i<memory.length;i++){
        var copyval = memory[i];
        if (Math.random() < mutate_possibility) {
            copyval = copyval + tools_random(mutate_strength) - (mutate_strength / 2);
        }
        new_memory.push(copyval);
    }

    return new_memory;
}