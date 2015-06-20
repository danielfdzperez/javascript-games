var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/', function(req, res) {
   res.sendFile(__dirname + '/index.html')
})

app.use(express.static(__dirname + '/public'))
//Clases importadas
var ServerWorld = require('./javascript/server_world.js')
var Player      = require('./javascript/player.js')
var Lobby       = require('./javascript/lobby.js')

//Variables del servidor
var client = {}
var player_id = 0
var world_id  = 0
var lobby  = new Lobby()
var world  = {}

//world[world_id] = new ServerWorld(4,4,world_id)
io.on('connection', function(socket){
  var that = this

  client[socket.id] = new Player(socket, player_id, "connecting")
  //world[0].add_player(client[socket.id])

  lobby.add_waiting_player(client[socket.id])
  player_id ++
  //Eventos de los usuarios
  socket.on('disconnect', player_leave);
  socket.on('player_name', player_name)
  socket.on('create_game',create_game)
  socket.on('leave_game', leave_game)
  socket.on('join_game', join_game)
  socket.on('start_game', start_game)

  console.log('new player')
})

http.listen(3000, function(){
  console.log('listening on *:3000')
})

//Funciones de los usuarios en espera
function player_leave(){
    var player = client[this.id]
    lobby.remove_player(player) 
    console.log(player.name + " leave")
}
function player_name(name){
    var player = client[this.id]
    player.set_name(name)
    lobby.send_lobby_info()
}
function create_game(players,rounds){
    console.log("new game")
    world[world_id] = new ServerWorld(players, rounds, world_id)
    lobby.add_game(world[world_id])
    world[world_id].finish = function(){
	delete world[this.id]
    }

    var player = client[this.id]
    world[world_id].add_player(player)
    lobby.add_player_in_non_start_game(player)
    world_id ++	
    //lobby.send_lobby_info()
}
function leave_game(){
  var player = client[this.id]
  lobby.add_waiting_player(player)
}
function join_game(id){
    var player = client[this.id]
    if(world[id].add_player(player))
	lobby.add_player_in_non_start_game(player)
}
function start_game(){
    var player = client[this.id]
    lobby.start_game(world[player.world_id])
    world[player.world_id].run()
}
