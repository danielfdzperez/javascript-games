var test = false
function GameObject(px, py, sx, sy, ax, ay, score){
    this.pos = new Coord(px,py)
    this.speed = new Coord(sx, sy)
    this.acceleration = new Coord(ax, ay)
    this.rectangles = []
    this.score = score || 0


    this.giro = 0
    this.img_mv = 0
}

GameObject.image_stack = new Img(true)

GameObject.load_images = function(){
    GameObject.image_stack.add_to_stack("img/player-sprite.png", 65, 65, 3, "player_1")
    GameObject.image_stack.add_to_stack("img/player2-sprite.png", 65, 65, 3, "player_2")
    GameObject.image_stack.add_to_stack("img/player-live.png", 32, 32, 1, "player_1_live")
    GameObject.image_stack.add_to_stack("img/player-shield.png", 14, 14, 1, "player_shield")
    GameObject.image_stack.add_to_stack("img/player2-live.png", 32, 32, 1, "player_2_live")
    GameObject.image_stack.add_to_stack("img/player-shot-1.png", 9, 20, 1, "shot_1")
    GameObject.image_stack.add_to_stack("img/player-shot-2.png", 13, 13, 1, "shot_2")
    GameObject.image_stack.add_to_stack("img/player-shot-3.png", 13, 13, 1, "shot_3")
    GameObject.image_stack.add_to_stack("img/player-shot-4.png", 9, 20, 1, "shot_4")
    GameObject.image_stack.add_to_stack("img/player-shot-5.png", 13, 13, 1, "shot_5")
    GameObject.image_stack.add_to_stack("img/player-shot-6.png", 13, 13, 1, "shot_6")
    GameObject.image_stack.add_to_stack("img/shot-improvement.png", 24, 25, 1, "shot_improvement")
    GameObject.image_stack.add_to_stack("img/shield-improvement.png", 20, 29, 1, "shield_improvement")
    GameObject.image_stack.add_to_stack("img/speed-improvement.png", 20, 28, 1, "speed_improvement")
    GameObject.image_stack.add_to_stack("img/attack-enemy-sprite.png", 32, 32, 3, "attack_enemy")
    GameObject.image_stack.add_to_stack("img/loop-enemy-sprite.png", 32, 32, 5, "loop_enemy")
    GameObject.image_stack.add_to_stack("img/kamikaze-enemy-sprite.png", 32, 32, 3, "kamikaze_enemy")
    GameObject.image_stack.add_to_stack("img/kamikaze-enemy-sprite-0.png", 32, 32, 3, "kamikaze_enemy_0")
    GameObject.image_stack.add_to_stack("img/kamikaze-enemy-sprite-1.png", 32, 32, 3, "kamikaze_enemy_1")
    GameObject.image_stack.add_to_stack("img/kamikaze-enemy-sprite-2.png", 32, 32, 3, "kamikaze_enemy_2")
    GameObject.image_stack.add_to_stack("img/kamikaze-enemy-sprite-3.png", 32, 32, 3, "kamikaze_enemy_3")
    GameObject.image_stack.add_to_stack("img/ship-enemy-sprite.png", 41, 197, 2, "enemy_ship")
    GameObject.image_stack.add_to_stack("img/explosion-sprite.png", 65, 65, 7, "big_explosion")
    GameObject.image_stack.add_to_stack("img/enemy-shot.png", 9, 9, 1, "enemy_shot")
    console.log(GameObject.image_stack)
}

GameObject.prototype.draw = function(ctx){
    //ctx.save()
    //ctx.translate(this.pos.x, this.pos.y)	   
    ctx.strokeStyle = "black"
    //ctx.drawImage(this.img, this.pos.x, this.pos.y)
    //ctx.rotate(this.giro*Math.PI / 180)
    //ctx.strokeRect(-65/2+28, -65/2+14, 10, 2)
    //ctx.strokeRect(-65/2+3, -65/2+17, 59, 22)
    //ctx.strokeRect(-65/2+13, -65/2+40, 37.5, 17)
    if(test)
       for(var i=0; i<this.rectangles.length; i++)
           ctx.strokeRect(this.rectangles[i].pos.x, this.rectangles[i].pos.y, this.rectangles[i].width, this.rectangles[i].height)
    //ctx.drawImage(this.img, this.img_mv%3*65, 0, 65, 65, -65/2, -65/2, 65, 65)
    //ctx.restore()

    //ctx.drawImage(this.image(), this.img_mv%this.image_n_sprites()*this.image_measures("width"), 0, 
//	    this.image_measures("width"), this.image_measures("height"), this.pos.x, this.pos.y, 
//	    this.image_measures("width"), this.image_measures("height"))
    ctx.drawImage(GameObject.image_stack.stack[this.image_name].image, 
	    this.img_mv%GameObject.image_stack.stack[this.image_name].n_sprites*GameObject.image_stack.stack[this.image_name].width, 0, 
	    GameObject.image_stack.stack[this.image_name].width, GameObject.image_stack.stack[this.image_name].height, 
	    this.pos.x, this.pos.y, 
	    GameObject.image_stack.stack[this.image_name].width, GameObject.image_stack.stack[this.image_name].height)
    this.img_mv++
}

GameObject.prototype.image = function(){
    return eval(this.constructor.name + ".image.image")
}

GameObject.prototype.image_measures = function(measure){
    switch(measure){
        case "height"://altura
	    return eval(this.constructor.name + ".image.height")
	    break;
        case "width"://ancho
	    return eval(this.constructor.name + ".image.width")
	    break;
    }
}

//GameObject.prototype.image_n_sprites = function(){
  //  return eval(this.constructor.name + ".image.n_sprites")
//}

GameObject.prototype.collision = function(obj){
    var collision = false
    for(var i=0; i<this.rectangles.length; i++)
	for(var j=0; j<obj.rectangles.length; j++)
	    if(this.rectangles[i].pos.x < obj.rectangles[j].pos.x + obj.rectangles[j].width &&
		    this.rectangles[i].pos.x + this.rectangles[i].width > obj.rectangles[j].pos.x &&
		    this.rectangles[i].pos.y < obj.rectangles[j].pos.y + obj.rectangles[j].height &&
		    this.rectangles[i].pos.y + this.rectangles[i].height > obj.rectangles[j].pos.y)
		collision = true
    return collision
}

GameObject.prototype.update_physics = function(delta, canvas){
    this.speed.x += this.acceleration.x
    this.speed.y += this.acceleration.y
    if(this.constructor.name == "Player")
	 this.update_pos(delta, canvas)
    else{
	   this.pos.x += this.speed.x*delta
           this.pos.y += this.speed.y*delta
           this.update_rectangle_positions()
    }
}

GameObject.prototype.update_rectangle_positions = function(){
    for(var i=0; i<this.rectangles.length; i++)
	this.rectangles[i].update_position(this.pos.x, this.pos.y)
}
