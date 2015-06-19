function Player(name, rol){
   this.name = name //Nombre del jugador
   this.rol  = rol  //Rol que tiene en el juego dibujante o el que busca adivinar el dibujo
}

Player.prototype.assign_rol = function(new_rol){
   this.rol = new_rol
}
