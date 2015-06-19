module.exports = ServerWorld
var DRAW = 'pintar' //constante del nombre del mensaje con el que se indica que se pinta
var ANSWER = 'answer' 
function ServerWorld(max_players, n_rounds, id){
   this.n_rounds           = n_rounds  //Cantidad de rondas
   this.round              = 0      //Ronda actual
   this.max_players        = max_players //Numero maximo de jugadores
   this.n_players          = 0    //Numero actual de jugadores
   this.player             = []   //Todos los jugadores
   this.drawer             = null //El jugador que dibuja
   this.player_to_find     = [] //Lista de los jugadores que adivinan
   this.id                 = id
   this.is_running         = false
   this.word               = require("./words.js")
   this.n_player_loaded    = 0
}

//Añade un nuevo jugador al mundo
ServerWorld.prototype.add_player = function(player){
   var that = this
   if(this.n_players < this.max_players){
      this.player.push(player)
      if(this.n_players == 0)
	   this.drawer = player
      else
	  this.player_to_find.push(player)
          
      player.socket.on(DRAW, function(msg){that.draw(msg, this)})
      player.socket.on(ANSWER, this.answer)
      player.socket.on('loaded', function(){that.player_loaded()})
      this.n_players ++
      player.is_playing = true
      player.world_id   = this.id
      return true
   }
   else
      return false
}

//ServerWorld.prototype.add

ServerWorld.prototype.new_round = function(){
   for (var i in this.player)
       this.player[i].socket.emit('new_round')

   this.round ++
   var round = this.round - 1
   this.drawer = this.player[round]
   this.player_to_find = []
   for(var i = 0; i < this.n_players; i++)
      if(i != round)
         this.player_to_find.push(this.player[i])

   this.drawer.socket.emit('rol', "drawer")	     
   for(var i in this.player_to_find)
	this.player_to_find[i].socket.emit('rol', "browser")
}

ServerWorld.prototype.run = function(){
    if(this.n_player_loaded == this.n_players){
       this.is_running = true
       this.new_round()
       for (var i in this.player)
          this.player[i].socket.emit('run')
    }else
       for (var i in this.player)
          this.player[i].socket.emit('go_run')
    
}

ServerWorld.prototype.get_players = function(){
    return this.player
}

ServerWorld.prototype.get_game_info = function(){
    return {n_players: this.n_players, n_rounds: this.n_rounds, max_players:this.max_players, id:this.id}
}

//Hacerlos privados y posiblemente van en el usuario
ServerWorld.prototype.draw = function(msg, client){
   if(!this.is_running)
      return	 
   if(client == this.drawer.socket)
      for(var i = 0; i < this.player_to_find.length; i++)
         this.player_to_find[i].socket.emit(DRAW, msg);
}
ServerWorld.prototype.answer = function(msg){
   if(!this.is_running)
      return	 
   //if(this != that.drawer.socket)
}
ServerWorld.prototype.player_loaded = function(){
    this.n_player_loaded ++
    if(this.n_player_loaded == this.n_players)
	this.run()
}
