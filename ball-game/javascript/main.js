window.addEventListener("load", initial, false)
var world = null

function initial(){
   world = new World("canvas")
   
   enable_inputs()
   start_level()
}

function start_level(){
/*
 * Billar
   world.new_ball(200, 150, 10)
   world.new_ball(-150, 150, 10)
   world.new_ball(-170, 160, 10)
   world.new_ball(-170, 137, 10)

   world.new_gate(240, 10, 10)
   world.new_gate(-240, 10, 10)
   world.new_gate(0, 10, 10)

   world.new_gate(240, 290, 10)
   world.new_gate(-240, 290, 10)
   world.new_gate(0, 290, 10)
*/
   //world.new_wall(100, 15, 100, 10)
 
   
   //world.new_box(-60, 100, 20)
   //world.new_ball(100, 60, 10)

   world.new_ball(0, 0, 10, 30, 160)
   //world.new_ball(50, 0, 10)
   world.new_gate(-240, 10, 10)
   //world.new_box(0, 0, 20)
   world.new_box(-150, 0, 30)
   world.new_box(-150, 30, 30)
   world.new_box(-150, 60, 30)
   game_loop()
}

function game_loop(){
    if(world.get_n_balls() == 0){
	end_game()
    }
    world.refresh() 
    setTimeout(game_loop, 50)
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
