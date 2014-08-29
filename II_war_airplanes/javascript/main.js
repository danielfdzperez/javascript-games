window.addEventListener("load", init, false)
var world = null
var last_time = null
var new_time = null
var time = null
function init(){
    world = new World("canvas", 2)

    if(start_objects())
        game_loop()
    else
	alert("Start object Fail")
}

function start_objects(){
    world.start()
    return true
}

function game_loop(){
   time = setTimeout(game_loop, 60)
   world.events()
   world.update_physics()
   world.refresh_graphics()
   if(world.end_game())
	       end()
}

function end(){
    clearTimeout(time)
    world.game_over()
}
