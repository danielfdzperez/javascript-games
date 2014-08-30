Player.prototype = new GameObject
Player.prototype.constructor = Player

//Player.image = new Img(false, "img/player-sprite.png", 65, 65, 3)
function Player(px, py, number, sx, sy, ax, ay){
    GameObject.call(this, px, py, sx, sy, ax, ay)
    this.rectangles.push(new Rectangle(px, py, 37.5, 17, 13, 40))
    this.rectangles.push(new Rectangle(px, py, 59, 22, 3, 17))
    this.rectangles.push(new Rectangle(px, py, 10, 2, 28, 14))
    this.temp_shot = 1
    this.number = number
    this.image_name = "player_1"
    this.lives = 3
    this.alive = true
}

Player.prototype.action = function(events, world){
    if ((87 in events.keys_up && this.number == 1) || (38 in events.keys_up && this.number == 2)){  // up
	this.acceleration.y = 0 
	this.speed.y = 0 
    }
    if ((83 in events.keys_up && this.number == 1) || (40 in events.keys_up && this.number == 2)){  // down
	this.acceleration.y = 0 
	this.speed.y = 0 
    }
    if ((65 in events.keys_up && this.number == 1) || (37 in events.keys_up && this.number == 2)){  // left
	this.acceleration.x = 0 
	this.speed.x = 0 
    }
    if ((68 in events.keys_up && this.number == 1) || (39 in events.keys_up && this.number == 2)){  // right
	this.acceleration.x = 0 
	this.speed.x = 0 
    }
	
	    /*If keys down*/
    if ((87 in events.keys_down && this.number == 1) || (38 in events.keys_down && this.number == 2))  // up
	this.acceleration.y = -10 
    if ((83 in events.keys_down && this.number == 1) || (40 in events.keys_down && this.number == 2))  // down
	this.acceleration.y = 10 
    if ((65 in events.keys_down && this.number == 1) || (37 in events.keys_down && this.number == 2))  // left
	this.acceleration.x = -10 
    if ((68 in events.keys_down && this.number == 1) || (39 in events.keys_down && this.number == 2))  // right
	this.acceleration.x = 10 
}

Player.prototype.exit_screen = function(next_pos){
    return!(next_pos.x < 435 && next_pos.x > -10  && next_pos.y < 435 && next_pos.y > -20)
}

Player.prototype.update_pos = function(delta){
    var next_pos = new Coord((this.pos.x + this.speed.x*delta), (this.pos.y + this.speed.y*delta))
    if(!this.exit_screen(next_pos)){
         this.pos.x += this.speed.x*delta
         this.pos.y += this.speed.y*delta
         this.update_rectangle_positions()
    }
}

Player.prototype.shot = function(world){
    if(this.temp_shot % 15 == 0){
	world.new_player_shot(this.pos.x + 30, this.pos.y + 10, 0, -15, 0, 0)
	this.temp_shot = 1
    }
    else
	this.temp_shot++
}

Player.prototype.draw_lives = function(ctx){
   for(var i=0; i<this.lives; i++)
       ctx.drawImage(GameObject.image_stack.stack["player_1_live"].image, i*32+10, (0+this.number-1)*32) 
}
