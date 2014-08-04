Rectangle.prototype = new GeometricShapes
Rectangle.prototype.constructor = Rectangle

function Rectangle(posx, posy, heigth, width){
   GeometricShapes.call(this, posx, posy)
   this.width  = width
   this.heigth = heigth
}

Rectangle.prototype.draw = function(ctx){
   ctx.fillStyle = 'black'
   ctx.fillRect(this.pos.x-this.width, this.pos.y, this.width, this.heigth)
}
