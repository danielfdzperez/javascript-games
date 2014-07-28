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
