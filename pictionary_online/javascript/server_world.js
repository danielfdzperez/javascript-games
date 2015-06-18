module.exports = ServerWorld
function ServerWorld(max_players, n_rounds, id){
   this.n_rounds           = n_rounds  //Cantidad de rondas
   this.round              = 0      //Ronda actual
   this.max_players        = max_players //Numero maximo de jugadores
   this.n_players          = 0    //Numero actual de jugadores
   this.player             = []   //Todos los jugadores
   this.drawer             = null //El jugador que dibuja
   this.player_to_find     = [] //Lista de los jugadores que adivinan
   this.id                 = id
}

ServerWorld.prototype.add_player = function(player){
   var that = this
   if(this.n_players < this.max_players){
      this.player.push(player)
      if(this.n_players == 0){
	   this.drawer = player
           this.drawer.socket.on('pintar', function(msg){
              for(var i = 0; i < that.player_to_find.length; i++)
                 that.player_to_find[i].socket.emit('pintar', msg);
           })
      }else
	  this.player_to_find.push(player)
      this.n_players ++
   }
}

ServerWorld.prototype.new_round = function(){
   this.round ++
   var round = this.round - 1
   this.drawer = this.player[round]
   this.player_to_find = []
   for(var i = 0; i < this.n_players; i++)
      if(i != round)
         this.player_to_find.push(this.player[i])
}

ServerWorld.prototype.run = function(){
}

ServerWorld.prototype.get_players = function(){
    return this.player
}

ServerWorld.prototype.get_game_info = function(){
    return {n_players: this.n_players, n_rounds: this.n_rounds}
}
