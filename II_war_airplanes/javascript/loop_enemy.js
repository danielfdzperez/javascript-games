LoopEnemy.prototype = new Enemy
LoopEnemy.prototype.constructor = LoopEnemy

function LoopEnemy(px, py, sx, sy, ax, ay, shot_improvements){
    GameObject.call(this, px, py, sx, sy, ax, ay, 150)
    Enemy.call(this, shot_improvements, 1)
    this.rectangles.push(new Rectangle(px, py, 32, 32, 0, 0))
    this.looping = false
    this.looped  = false
    this.image_name = "loop_enemy"
}

LoopEnemy.prototype.exit_screen = function(next_pos, canvas){
    return(next_pos.y < -45)
}

LoopEnemy.prototype.draw = function(ctx){
    GameObject.prototype.draw.call(this, ctx)
    if(!this.looping)
	this.img_mv = 0
    if(this.looped)
	this.img_mv = 4 
}

LoopEnemy.prototype.update_physics = function(delta){
    GameObject.prototype.update_physics.call(this, delta)
    if(this.pos.y > 150 && this.pos.y < 200){
	//this.speed.y = 0
	this.acceleration.y = -5
	this.looping = true
    }
    if(this.img_mv%3 == 0 && this.img_mv != 0){
	this.acceleration.y = -1
	this.looping = false
	this.looped  = true
    }
}

LoopEnemy.prototype.shoot = function(players, world){
    if(!this.shot && (this.pos.y > 150 && this.pos.y < 200) && world.players_alive() != -1){
	Enemy.prototype.shoot.call(this, players, world)
        world.new_enemy_shot(this.pos.x, this.pos.y, 10, 10, 0, 0)
        world.new_enemy_shot(this.pos.x, this.pos.y, -10, 10, 0, 0)
    }
}
