module.exports = Lobby
/*Lobby
 *
 * Parametros
 * world  -> Array con todos los mundos del servidor
 * player -> Array con todos los jugadores del servidor
 */
function Lobby(){
    //this.world          = world
    this.game                     = [] //Mundos que no han comenzado la partida
    //this.player         = payer
    this.player_waiting           = [] //Jugadores sin partida
    this.player_in_non_start_game = [] //Jugadores en una partida sin empezar

}

Lobby.prototype.add_game = function(game){
    this.game.push(game)
    this.send_lobby_info()
}

Lobby.prototype.add_waiting_player = function(player){
    this.player_waiting.push(player)
    this.send_lobby_info()
}

Lobby.prototype.add_player_in_non_start_game = function(player){
    this.remove_player_waiting(player)
    this.player_in_non_start_game.push(player)
    this.send_lobby_info()
}

//Cuando empieza una partida se sacan a los jugadores del array de jugadores en una partida sin empezar y a la partida
Lobby.prototype.start_game = function(game){
    if(!game)
	return
    var player = game.get_players()
    for(var i = 0; i < player.length; i++)
      this.remove_player_non_start_game(player[i]) 

    var pos = this.game.indexOf(game)
    this.game.splice(pos,1)
    this.send_lobby_info()
}

Lobby.prototype.remove_player_non_start_game = function(player){
    var pos = this.player_in_non_start_game.indexOf(player)
    this.player_in_non_start_game.splice(pos, 1)
}

Lobby.prototype.player_leave_non_start_game = function(player){
    this.remove_player_non_start_game(player)
    this.add_waiting_player(player)
}

Lobby.prototype.remove_player_waiting = function(player){
    var pos = this.player_waiting.indexOf(player)
    this.player_waiting.splice(pos, 1)
}

Lobby.prototype.remove_player = function(player){
    //this.remove_player_non_start_game(player)
    this.remove_player_waiting(player)
    this.send_lobby_info()
}

Lobby.prototype.send_lobby_info = function(){
    var player_data = []
    for(var i = 0; i < this.player_waiting.length; i++)
	player_data.push(this.player_waiting[i].get_data())
    var game_data = []
    for(var i = 0; i < this.game.length; i++)
	game_data.push(this.game[i].get_game_info())
    //for(var i = 0; i < this.player_in_non_start_game.length; i++)
	//player_data.push(this.player_in_non_start_game[i].get_data())

    for(var i = 0; i < this.player_waiting.length; i++){
	this.player_waiting[i].socket.emit('lobby_update', {player:player_data, game:game_data})
    }


    for(var i = 0; i < this.player_in_non_start_game.length; i++)
	this.player_in_non_start_game[i].socket.emit('lobby_update', {player:player_data, game:game_data})
    //console.log("------ lobby update ------")
    //for(var i in player_data)
    //	console.log(player_data[i].name)
    //console.log("--------------------------")
}
