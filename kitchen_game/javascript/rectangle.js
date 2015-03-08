function Rectangle(x, y, width, height){
    this.position = new Position(x, y)
    this.width = this.position.x + width
    this.height = this.position.y + height
}

//TODO Hacer la funcion que detencte que el puntero ha pinchado
//dentro del rectangulo
