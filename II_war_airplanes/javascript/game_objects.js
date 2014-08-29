function GameObject(px, py, sx, sy, ax, ay){
    this.pos = new Coord(px,py)
    this.speed = new Coord(sx, sy)
    this.acceleration = new Coord(ax, ay)
    this.rectangles = []


    this.giro = 0
    this.img_mv = 0
}

GameObject.image_stack = new Img(true)

GameObject.load_images = function(){
    GameObject.image_stack.add_to_stack("img/player-sprite.png", 65, 65, 3, "player_1")
    GameObject.image_stack.add_to_stack("img/player-live.png", 32, 32, 1, "player_1_live")
    GameObject.image_stack.add_to_stack("img/player-shot-1.png", 9, 20, 1, "shot_1")
    GameObject.image_stack.add_to_stack("img/attack-enemy-sprite.png", 32, 32, 3, "attack_enemy")
    GameObject.image_stack.add_to_stack("img/kamikaze-enemy-sprite.png", 32, 32, 3, "kamikaze_enemy")
    GameObject.image_stack.add_to_stack("img/kamikaze-enemy-sprite-0.png", 32, 32, 3, "kamikaze_enemy_0")
    GameObject.image_stack.add_to_stack("img/kamikaze-enemy-sprite-1.png", 32, 32, 3, "kamikaze_enemy_1")
    GameObject.image_stack.add_to_stack("img/kamikaze-enemy-sprite-2.png", 32, 32, 3, "kamikaze_enemy_2")
    GameObject.image_stack.add_to_stack("img/kamikaze-enemy-sprite-3.png", 32, 32, 3, "kamikaze_enemy_3")
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

GameObject.prototype.update_physics = function(delta){
    this.speed.x += this.acceleration.x
    this.speed.y += this.acceleration.y
    if(this.constructor.name == "Player")
	 this.update_pos(delta)
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
