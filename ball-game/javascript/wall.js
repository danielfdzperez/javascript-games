Wall.prototype = new Rectangle
Wall.prototype.constructor = Wall

function Wall(posx, posy, heigth, width){
    Rectangle.call(posx, posy, heigth, width)
}
