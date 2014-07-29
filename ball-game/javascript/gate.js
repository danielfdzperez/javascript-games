Gate.prototype = new Circle
Gate.prototype.constructor = Gate

function Gate(posx, posy, radius){
    Circle.call(this, posx, posy, radius)
}

Gate.prototype.draw = function(ctx){
    ctx.beginPath()
    ctx.strokeStyle = "black"
    ctx.lineWidth = 5
    ctx.arc(this.get_coord_x(), this.get_coord_y(),this.get_radius(), 0, (Math.PI/180)*360, false)
    ctx.stroke()
    ctx.closePath()
}

