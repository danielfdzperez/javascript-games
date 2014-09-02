Player.prototype = new GameObject
Player.prototype.constructor = Player

//Player.image = new Img(false, "img/player-sprite.png", 65, 65, 3)
function Player(px, py, number, sx, sy, ax, ay){
    GameObject.call(this, px, py, sx, sy, ax, ay)
    this.init_pos = new Coord(px, py)
    this.rectangles.push(new Rectangle(px, py, 37.5, 17, 13, 40))
    this.rectangles.push(new Rectangle(px, py, 59, 22, 3, 17))
    this.rectangles.push(new Rectangle(px, py, 10, 2, 28, 14))
    this.temp_shot = 1
    this.number = number
    this.image_name = "player_" + this.number
    this.lives = 3
    this.alive = true
    this.startup = false
    this.startup_step = 1
    this.next_extra_live = 1
}

Player.prototype.action = function(events, world){
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
	this.speed.y = -10 
    if ((83 in events.keys_down && this.number == 2) || (40 in events.keys_down && this.number == 1))  // down
	this.speed.y = 10 
    if ((65 in events.keys_down && this.number == 2) || (37 in events.keys_down && this.number == 1))  // left
	this.speed.x = -10 
    if ((68 in events.keys_down && this.number == 2) || (39 in events.keys_down && this.number == 1))  // right
	this.speed.x = 10 
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
	world.new_player_shot(this.pos.x + 30, this.pos.y + 10, 0, -15, 0, 0, this.number)
	this.temp_shot = 1
    }
    else
	this.temp_shot++
}

Player.prototype.draw_info = function(ctx){
   ctx.fillText("Score: " + this.score, 200, 20+((this.number-1)*32), 100)
   for(var i=0; i<this.lives; i++)
       ctx.drawImage(GameObject.image_stack.stack["player_" + this.number + "_live"].image, i*32+10, (0+this.number-1)*32) 
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
    if(this.startup_step % 20 == 0){
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
       this.regenerate()
    }
}
