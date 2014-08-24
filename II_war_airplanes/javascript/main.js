window.addEventListener("load", init, false)
var world = null
var events = null
var last_time = null
var new_time = null
function init(){
    world = new World("canvas")
    events = new Events()
    //p = new GameObject(100, 100, 0, 0, 0, 0, "img/player-sprite.png")
    //a = new GameObject(200, 100, 0, 0, 0, 0, "img/player-sprite.png")

    world.new_player(200, 400, 0, 0, 0, 0)
    world.new_attack_enemy(100, 400, 0, 0, 0, 0)
    world.new_attack_enemy(300, 400, 0, 0, 0, 0)
    world.new_attack_enemy(200, 400, 0, 0, 0, 0)
    events.enable_inputs()
    game_loop()
}

function game_loop(){
   setTimeout(game_loop, 60)
   world.events(events)
   world.update_physics()
   world.refresh_graphics()
   new_time = new Date().getTime()
}
