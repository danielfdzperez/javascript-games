(function(){
   //window.addEventListener("load", initialize, false)
   var client = null
   var world  = null
   var app    = angular.module('app', ['ngRoute']) 
   app.controller('lobby_control', function($scope) {
       $scope.player = []
       $scope.game   = []
       $scope.lobby_update = function(obj){
          //obj = client.lobby.lobby_update()
          $scope.player = obj.player
	  $scope.game   = obj.game
	  $scope.$apply()
       }
       client = new Client($scope)
       $scope.create_game = function(){
          $("#CreateGame").toggleClass('hide show')
       } 
       $scope.join_game   = function(id){
          client.socket.emit('join_game', id)
       }
       $scope.start_game   = function(){
          client.socket.emit('start_game')
       }
       $scope.left_game   = function(){}
      // $scope.create_game = client.lobby.create_game()
      // $scope.join_game = client.lobby.join_game()
      // $scope.left_game = client.lobby.left_game()
       client.socket.on('lobby_update', $scope.lobby_update)
       client.socket.on('go_run', start_game)
    })

    app.controller('player_name', function($scope){
        $scope.send_name = function (){
        	var name = $("#Name").val()
        	client.socket.emit('player_name', name)
        	$("#PlayerName").toggleClass('show hide')
        	$("#Lobby").toggleClass('hide show')
            }
    })

    app.controller('create_game', function($scope){
	$scope.n_players
	$scope.n_rounds
        $scope.create_game = function (){
        	client.socket.emit('create_game', $scope.n_players, $scope.n_rounds)
        	$("#CreateGame").toggleClass('show hide')
		change_button("#Create", "#StartGame")
        }
    })
    
    function change_button(hidden, show){
        $(hidden).toggleClass('user_action user_action_hide')
        $(show).toggleClass('user_action_hide user_action')
    }
    function start_game(){
          $("#Lobby").toggleClass('show hide')
          $("#Game").toggleClass('hide show')
          $("#Canvas").toggleClass('hide show')
	  world = new World("Canvas", client, null)
    }
})()
