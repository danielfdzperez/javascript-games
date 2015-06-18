Player.prototype = new GameObject
Player.prototype.constructor = Player

//Player.image = new Img(false, "img/player-sprite.png", 65, 65, 3)

function Player(px, py, number, sx, sy, ax, ay){
    GameObject.call(this, px, py, sx, sy, ax, ay)
    this.init_pos = new Coord(px, py)
    this.rectangles.push(new Rectangle(px, py, 37.5, 17, 13, 40))
    this.rectangles.push(new Rectangle(px, py, 59, 22, 3, 17))
    this.rectangles.push(new Rectangle(px, py, 10, 2, 28, 14))
    this.temp_shot = 0
    this.shot_speed = 15
    this.mv = 10
    this.shot_type = 0
    this.shield = 0 
    this.number = number
    this.image_name = "player_" + this.number
    this.lives = 3
    this.alive = true
    this.startup = false
    this.startup_step = 1
    this.next_extra_live = 1
}

Player.prototype.action = function(events){
    if ((87 in events.keys_up && this.number == 2) || (38 in events.keys_up && this.number == 1)){  // up
	this.speed.y = 0 
    }
    if ((83 in events.keys_up && this.number == 2) || (40 in events.keys_up && this.number == 1)){  // down
	this.speed.y = 0 
    }
    if ((65 in events.keys_up && this.number == 2) || (37 in events.keys_up && this.number == 1)){  // left
	this.speed.x = 0 
    }
    if ((68 in events.keys_up && this.number == 2) || (39 in events.keys_up && this.number == 1)){  // right
	this.speed.x = 0 
    }
	
	    /*If keys down*/
    if ((87 in events.keys_down && this.number == 2) || (38 in events.keys_down && this.number == 1))  // up
	this.speed.y = -this.mv 
    if ((83 in events.keys_down && this.number == 2) || (40 in events.keys_down && this.number == 1))  // down
	this.speed.y = this.mv 
    if ((65 in events.keys_down && this.number == 2) || (37 in events.keys_down && this.number == 1))  // left
	this.speed.x = -this.mv 
    if ((68 in events.keys_down && this.number == 2) || (39 in events.keys_down && this.number == 1))  // right
	this.speed.x = this.mv
}

Player.prototype.exit_screen = function(next_pos){
    return!(next_pos.x < (canvas.width-65) && next_pos.x > -10  && next_pos.y < (canvas.height-65) && next_pos.y > -20)
}

Player.prototype.update_pos = function(delta, canvas){
    var next_pos = new Coord((this.pos.x + this.speed.x*delta), (this.pos.y + this.speed.y*delta))
    if(!this.exit_screen(next_pos, canvas)){
         this.pos.x += this.speed.x*delta
         this.pos.y += this.speed.y*delta
         this.update_rectangle_positions()
    }
}

Player.prototype.shot = function(world){
    if(this.temp_shot % this.shot_speed == 0 && this.temp_shot != 0){
	switch(this.shot_type){
	    case 0:
		world.new_player_shot(this.pos.x + 30, this.pos.y + 10, 0, -15, 0, 0, this.number, 1)
		break;
	    case 1:
		world.new_player_shot(this.pos.x + 40, this.pos.y + 10, 0, -15, 0, 0, this.number, 1)
		world.new_player_shot(this.pos.x + 20, this.pos.y + 10, 0, -15, 0, 0, this.number, 1)
		break;
	    case 2:
		world.new_player_shot(this.pos.x + 30, this.pos.y + 10, 0, -15, 0, 0, this.number, 1)
		world.new_player_shot(this.pos.x + 10, this.pos.y + 10, -15, -15, 0, 0, this.number, 3)
		world.new_player_shot(this.pos.x + 50, this.pos.y + 10, 15, -15, 0, 0, this.number, 2)
		break;
	    case 3:
		world.new_player_shot(this.pos.x + 40, this.pos.y + 10, 0, -15, 0, 0, this.number, 1)
		world.new_player_shot(this.pos.x + 20, this.pos.y + 10, 0, -15, 0, 0, this.number, 1)
		world.new_player_shot(this.pos.x + 10, this.pos.y + 10, -15, -15, 0, 0, this.number, 3)
		world.new_player_shot(this.pos.x + 50, this.pos.y + 10, 15, -15, 0, 0, this.number, 2)
		break;
	    case 4:
		world.new_player_shot(this.pos.x + 40, this.pos.y + 10, 0, -15, 0, 0, this.number, 1)
		world.new_player_shot(this.pos.x + 20, this.pos.y + 10, 0, -15, 0, 0, this.number, 1)
		world.new_player_shot(this.pos.x + 10, this.pos.y + 10, -15, -15, 0, 0, this.number, 3)
		world.new_player_shot(this.pos.x + 50, this.pos.y + 10, 15, -15, 0, 0, this.number, 2)
		world.new_player_shot(this.pos.x + 30, this.pos.y + 50, 0, 15, 0, 0, this.number, 4)
		break;
	    case 5:
		world.new_player_shot(this.pos.x + 40, this.pos.y + 10, 0, -15, 0, 0, this.number, 1)
		world.new_player_shot(this.pos.x + 20, this.pos.y + 10, 0, -15, 0, 0, this.number, 1)
		world.new_player_shot(this.pos.x + 10, this.pos.y + 10, -15, -15, 0, 0, this.number, 3)
		world.new_player_shot(this.pos.x + 50, this.pos.y + 10, 15, -15, 0, 0, this.number, 2)
		world.new_player_shot(this.pos.x + 30, this.pos.y + 50, 0, 15, 0, 0, this.number, 4)
		world.new_player_shot(this.pos.x + 10, this.pos.y + 50, -15, 15, 0, 0, this.number, 5)
		world.new_player_shot(this.pos.x + 50, this.pos.y + 50, 15, 15, 0, 0, this.number, 6)
		break;

	}
	this.temp_shot = 0
    }
    else
	this.temp_shot++
}

Player.prototype.draw_info = function(ctx, canvas){
   ctx.fillText("Score: " + this.score, canvas.width/2, 20+((this.number-1)*32), 100)
   for(var i=0; i<this.lives; i++)
       ctx.drawImage(GameObject.image_stack.stack["player_" + this.number + "_live"].image, i*32+10, (0+this.number-1)*32) 
   for(var i=0; i<this.shield; i++)
       ctx.drawImage(GameObject.image_stack.stack["player_shield"].image, i*14+10, (0+this.number)*32) 
}

Player.prototype.draw = function(ctx){
    if(!this.startup || (this.startup  && this.startup_step % 2 == 0))
	GameObject.prototype.draw.call(this, ctx)
}

Player.prototype.regenerate = function(){
    this.pos.x = this.init_pos.x
    this.pos.y = this.init_pos.y
    this.startup = true
}

Player.prototype.restart = function(){
    if(this.startup_step % 40 == 0){
        this.startup = false
        this.startup_step = 1
     }
     else
        this.startup_step++
}

Player.prototype.extra_live = function(){
    if(this.score >= 5000 * this.next_extra_live){
        this.lives ++
        this.next_extra_live ++
    }
}

Player.prototype.revive = function(){
    if(!this.alive){
       this.alive = true
       this.lives ++
       this.shot_type = 0
       this.regenerate()
    }
}

Player.prototype.improve = function(type, effect){
    switch(type){
	case "shot":
	    this.shot_improve(effect)
	    break;
	case "shield":
	    this.shield_improve(effect)
	    break;
	case "speed":
	    this.speed_improve(effect)
	    break;
    }
}

Player.prototype.shot_improve = function(effect){
    if(this.shot_type+1 < 6 && effect == 1)
       this.shot_type ++
    if(this.shot_type-1 >= 0 && effect == 0)
       this.shot_type --
}

Player.prototype.shield_improve = function(effect){
    if(this.shield < 3 && effect == 1)
	this.shield++
}

Player.prototype.speed_improve = function(effect){
//    if(this.shot_speed > 5 && effect == 1)
//	this.shot_speed -= 5
//    if(this.shot_speed < 15 && effect == 0)
//	this.shot_speed = 15
    if(this.mv < 20 && effect == 1)
	this.mv += 5
    if(this.mv > 10 && effect == 0)
	this.mv = 10

}

Player.prototype.damage = function(){
    if(this.shield <= 0){
        this.lives--
        this.regenerate()
        this.improve("shot", 0)
        this.improve("shot_speed", 0)
        if(this.lives <= 0)
           this.alive = false
    }	   
    else{
       this.startup = true
       this.shield--
    }
}
