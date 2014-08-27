function Rectangle(x, y, width, height, ix, iy){
    this.pos = new Coord(x, y)
    this.width = width   //Ancho
    this.height = height //Alto
    this.increment = new Coord(ix, iy)
    this.update_position(this.pos.x, this.pos.y)
} 

Rectangle.prototype.update_position = function(x, y){
    if(this.constructor.name == KamikazeEnemy){
       this.pos.x = (x + this.increment.x) * 0
       this.pos.y = (y + this.increment.y) * 0
    }else{
       this.pos.x = x + this.increment.x
       this.pos.y = y + this.increment.y
    }
}
