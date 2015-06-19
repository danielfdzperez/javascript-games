
function Lobby(socket, scope){
    this.socket = socket
    var that = this
    this.scope = Object.assign({}, scope)
    this.socket.on('lobby_update', function(obj){
               that.scope.lobby_update(obj)
	    })
}
Lobby.prototype.create_game = function(){
}
Lobby.prototype.join_game = function(){
}
Lobby.prototype.left_game = function(){
}
Lobby.prototype.lobby_update = function(obj){
  
} 
