EnemyShip.prototype = new Enemy
EnemyShip.prototype.constructor = EnemyShip

function EnemyShip(place, improvements){
    this.place = place
    if(this.place == 0)
       GameObject.call(this, 5, -190, 0, 5, 0, 0, 30)
    else
       GameObject.call(this, 450, -190, 0, 5, 0, 0, 30)

    Enemy.call(this, improvements, 5, 3)
    this.rectangles.push(new Rectangle (this.pos.x, this.pos.y, 34, 173, 3, 14))
    this.image_name = "enemy_ship"
    this.moving = true
    this.stationary = 0
    this.move_animation = 0
    this.shot_step = 0
}

//Cambiarlo
EnemyShip.prototype.exit_screen = function(next_pos){
    return!(next_pos.x < 510 && next_pos.x > -45  && next_pos.y < 510 && next_pos.y > -200)
}

EnemyShip.prototype.draw = function(ctx){
    if(this.move_animation % 2 == 0 && this.move_animation != 0)
	this.img_mv = 0
    else
	this.img_mv = 1
    if(!this.moving)
	this.img_mv = 1

       GameObject.prototype.draw.call(this, ctx)
       this.move_animation ++
}

EnemyShip.prototype.update_physics = function(delta_time){
    if(this.pos.y >= 100 && this.pos.y <= 200 && (this.stationary == 0 || this.stationary % 150 != 0)){
	this.speed.y = 0
	this.moving = false
	this.stationary ++
    }
    else{
	this.speed.y = 10
	this.moving = true
    }

    GameObject.prototype.update_physics.call(this, delta_time)
}

EnemyShip.prototype.shoot = function(players, world){
    
    if(!this.moving){
        var direcction = 10
        if(this.place == 1)
            direcction *= -1

        if(this.shot_step % 20 == 0){
           world.new_enemy_shot(this.pos.x + 18, this.pos.y + 82, direcction, 0, 0, 0)
           world.new_enemy_shot(this.pos.x + 18, this.pos.y + 82, direcction, direcction, 0, 0)
           world.new_enemy_shot(this.pos.x + 18, this.pos.y + 82, direcction, -direcction, 0, 0)
           world.new_enemy_shot(this.pos.x + 18, this.pos.y + 82, 0, 10, 0, 0)
        }
    }
    if(this.shot_step % 15 == 0)
       Enemy.prototype.shoot.call(this, players, world, new Coord(18, 82))
    this.shot_step ++
}
