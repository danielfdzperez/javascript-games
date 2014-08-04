Square.prototype = new GeometricShapes
Square.prototype.constructor = Square
function Square(posx, posy, side, elasticity){
   GeometricShapes.call(this, posx, posy, side, elasticity)
   this.side = side
}

Square.prototype.draw = function(ctx){
    ctx.fillStyle  = 'brown'
    ctx.strokeStyle = 'black'
    ctx.lineWidth  = 3
    ctx.strokeRect(this.pos.x-this.side/2,this.pos.y,this.side,this.side)
    ctx.fillRect(this.pos.x-this.side/2,this.pos.y,this.side,this.side)
}
