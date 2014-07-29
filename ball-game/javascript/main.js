window.addEventListener("load", initial, false)
var world = null

function initial(){
   world = new World("canvas")
   world.new_ball(0, 150, 10, 0, 0)
   world.new_ball(80, 150, 10, 30, 90)
   world.new_gate(50, 50, 10)
   enable_inputs()
   game_loop()
}

function game_loop(){
    world.refresh() 
    setTimeout(game_loop, 20)
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
