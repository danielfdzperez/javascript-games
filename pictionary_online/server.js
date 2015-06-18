var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/', function(req, res) {
res.sendFile(__dirname + '/index.html')
})

app.use(express.static(__dirname + '/public'))
var client = {}
var player_id = 0
var ServerWorld = require('./javascript/server_world.js')
var Player      = require('./javascript/player.js')
var world  = []
world.push(new ServerWorld(4,4))
io.on('connection', function(socket){
  client[player_id] = new Player(socket, player_id, "")
  world[0].add_player(client[player_id], io)
  player_id ++
  console.log('new player')
  /*socket.on('pintar', function(msg){
    io.emit('pintar', msg);
  })*/
})


http.listen(3000, function(){
  console.log('listening on *:3000')
})
