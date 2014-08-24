function GameObject(px, py, sx, sy, ax, ay){
    this.pos = new Coord(px,py)
    this.speed = new Coord(sx || 0, sy)
    this.acceleration = new Coord(ax || 0, ay)
    this.rectangles = []


    this.giro = 0
    this.img_mv = 0

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

    ctx.drawImage(this.image(), this.img_mv%this.image_n_sprites()*this.image_measures("width"), 0, 
	    this.image_measures("width"), this.image_measures("height"), this.pos.x, this.pos.y, 
	    this.image_measures("width"), this.image_measures("height"))
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

GameObject.prototype.image_n_sprites = function(){
    return eval(this.constructor.name + ".image.n_sprites")
}

GameObject.prototype.collision = function(obj){
    var collision = false
    for(var i=0; i<this.rectangles.length; i++)
	for(var j=0; j<obj.rectangles.length; j++)
	    if(this.rectangles[i].pos.x < obj.rectangles[i].pos.x + obj.rectangles[j].width &&
		    this.rectangles[i].pos.x + this.rectangles[i].width > obj.rectangles[j].pos.x &&
		    this.rectangles[i].pos.y < obj.rectangles[j].pos.y + obj.rectangles[j].height &&
		    this.rectangles[i].pos.y + this.rectangles[i].height > obj.rectangles[j].pos.y)
		collision = true
    return collision
}
GameObject.prototype.update_physics = function(){
    this.speed.x += this.acceleration.x
    this.speed.y += this.acceleration.y
    var next_pos = new Coord((this.pos.x + this.speed.x), (this.pos.y + this.speed.y))
    if(next_pos.x < 445 && next_pos.x > -20 && next_pos.y < 445 && next_pos.y > -20){
         this.pos.x += this.speed.x
         this.pos.y += this.speed.y
         this.update_rectangle_positions()
    }
}

GameObject.prototype.update_rectangle_positions = function(){
    for(var i=0; i<this.rectangles.length; i++)
	this.rectangles[i].update_position(this.pos.x, this.pos.y)
}
