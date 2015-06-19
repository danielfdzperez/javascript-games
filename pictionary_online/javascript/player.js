module.exports = Player
function Player(socket, id, name){
    this.socket     = socket
    this.world_id   = null
    this.id         = id
    this.name       = name
    this.puntuation = 0
    this.is_playing = false
    this.rol        = null
}

Player.prototype.get_data = function(){
    return {name: this.name, puntuation:this.puntuation}
}
