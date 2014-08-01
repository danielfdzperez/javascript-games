Circle.prototype = new GeometricShapes
Circle.prototype.constructor = Circle

function Circle(posx,posy, radius){
   GeometricShapes.call(this, posx, posy, radius)
   this.radius = radius
}

Circle.prototype.get_radius = function(){
   return this.radius
}

Circle.prototype.draw = function(ctx, color){
    //Dibuja el circulo
    color = color || 'black'
    ctx.beginPath()
    ctx.fillStyle  = color
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
