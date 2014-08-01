window.addEventListener("load", initial, false)
var world = null

function initial(){
   world = new World("canvas")
   
   enable_inputs()
   start_level()
}

start_level = function(){
   world.new_ball(100, 10, 10, 0, 180)
   //world.new_ball(80, 10, 10, 20, 0)
   world.new_gate(-200, 50, 10)
   world.new_box(-100, 0)
   world.new_box(-100, 100)
   //world.new_box(-50, 0)
   game_loop()
}

function game_loop(){
    world.refresh() 
    if(world.get_n_balls() == 0)
	end_game()
    setTimeout(game_loop, 20)
}

function end_game(){
    /*confirmar=confirm("¿Eres mayor de edad?");
    if (confirmar)
	//Aquí pones lo que quieras si da a Aceptar
	//alert('Diste a Aceptar')
	window.close()
    else
	//Aquí pones lo que quieras Cancelar
	alert('Diste a Cancelar') */
   alert("END")
   start_level()
}

function enable_inputs(){
    world.canvas.addEventListener('mousemove',function(evt){
	   world.update_mouse_position(evt)
    },false)
    world.canvas.addEventListener('mouseup',function(evt){
        world.update_angle_and_speed_ball(evt)
    },false)
    world.canvas.addEventListener('mousedown',function(evt){
	    evt.preventDefault()
	    world.mouse_press(evt)
    },false)
}
