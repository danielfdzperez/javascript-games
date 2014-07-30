function Circle(posx,posy, radius){
    this.pos = new Coord(posx, posy)
    this.radius = radius
    this.mass = radius
}

Circle.prototype.get_coord_x = function(){
    return this.pos.x
}

Circle.prototype.get_coord_y = function(){
    return this.pos.y
}

Circle.prototype.get_radius = function(){
   return this.radius
}

Circle.prototype.get_mass = function(){
   return this.mass
}

Circle.prototype.draw = function(ctx){
    //Dibuja el circulo
    ctx.beginPath()
    ctx.fillStyle  = '#000000'
    ctx.arc(this.get_coord_x(), this.get_coord_y(),this.get_radius(), 0, (Math.PI/180)*360, false)
    ctx.fill()
    ctx.closePath()
}

/*
 * Comprueba si una bola impacta con una puerta.
 *
 */
Circle.prototype.gate_collision = function(circle){
    var distance;
    if(circle instanceof Gate)
       distance = new Coord((this.next.x - circle.pos.x), (this.next.y - circle.pos.y))

    if(this instanceof Gate)
       distance = new Coord((this.pos.x - circle.next.x), (this.pos.y - circle.next.y))

    var total_distance = (distance.x * distance.x + distance.y * distance.y)
    if(total_distance <=(this.radius + circle.radius) * (this.radius + circle.radius))
	return true 
    else
	return false
}
