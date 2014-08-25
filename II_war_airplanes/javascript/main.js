window.addEventListener("load", init, false)
var world = null
var last_time = null
var new_time = null
function init(){
    world = new World("canvas")

    world.new_player(200, 400, 0, 0, 0, 0)
    world.new_player_shot(100, 100, 0, 0, 0, 0)
    world.new_attack_enemy(100, 400, 0, 10, 0, 0)
    world.new_attack_enemy(200, 410, 0, 10, 0, 0)
    world.new_attack_enemy(300, 400, 0, 10, 0, 0)
    game_loop()
}

function game_loop(){
   setTimeout(game_loop, 60)
   world.events()
   world.update_physics()
   world.refresh_graphics()
   new_time = new Date().getTime()
}
