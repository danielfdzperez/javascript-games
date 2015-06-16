(function(){
window.addEventListener("load", init, false)
var world = null
var last_time = null
var new_time = null
var loop_time = null
var end_time = null
var menu_time = null
var restart = false
function init(){
    world = new World("canvas", 0)
    events()
    menu()
    //start()
}

function start(){
    if(start_objects(restart))
        game_loop()
    else
	alert("Start object Fail")
}

function start_objects(){
    world.start()
    return true
}

function menu(){
    menu_time = setTimeout(menu, 1)
    if(!world.menu_on)
       world.show_menu()
    if(world.n_players != 0){
       clearTimeout(menu_time)
       start()
    }
}

function game_loop(){
   loop_time = setTimeout(game_loop, 60)
   world.update_physics()
   world.refresh_graphics()
   if(world.end_game())
	end()
   if(world.exit){
        world.game_over()
        go_to_menu()
   }
   if(world.pause)
	pause()
}

function pause(){
    clearTimeout(loop_time)
    loop_time = setTimeout(pause, 10)
    if(!world.pause_on)
       world.show_pause()
    if(!world.pause){
       clearTimeout(loop_time)
       world.delta.last_time = new Date()
       world.pause_on = false     
       game_loop()
    }
}

function end(){
    clearTimeout(loop_time)
    loop_time = setTimeout(end, 10)
    if(!world.end)
       world.game_over()
    if(13 in world.ev.keys_down)
	go_to_menu()
}

function go_to_menu(){
   clearTimeout(loop_time)
   restart = true
   world.delete_obj()
   menu()
}

function events(){
   addEventListener("keydown", function(e){
       world.ev.add_key_down(e)
       world.events()
   }, false)

   addEventListener("keyup", function(e){
       world.ev.add_key_up(e)
       world.events()
   }, false)

   addEventListener("mousedown", function(e){
	   world.mouse_press(e)
   },false) 
}

})();
