function Client(/*scope*/){
   this.socket = io();
   this.rol    = null
   //this.lobby  = new Lobby(this.socket, scope);
}

Client.prototype.set_rol = function(rol){
    this.rol = rol
}
