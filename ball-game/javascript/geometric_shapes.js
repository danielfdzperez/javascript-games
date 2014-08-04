function GeometricShapes(x, y, mass, elasticity){
    this.pos = new Coord(x, y)
    this.mass = mass
    this.elasticity = elasticity || 0
}
GeometricShapes.prototype.get_coord_x = function(){
    return this.pos.x
}

GeometricShapes.prototype.get_coord_y = function(){
    return this.pos.y
}

GeometricShapes.prototype.get_mass = function(){
   return this.mass
}
