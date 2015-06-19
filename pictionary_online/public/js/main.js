(function(){
   //window.addEventListener("load", initialize, false)
   var client = null
   var lobby = angular.module('lobby_app', ['ngRoute']) 
   lobby.controller('lobby_control', function($scope) {
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
          client.socket.emit('create_game')
       } 
       $scope.join_game   = function(){}
       $scope.left_game   = function(){}
      // $scope.create_game = client.lobby.create_game()
      // $scope.join_game = client.lobby.join_game()
      // $scope.left_game = client.lobby.left_game()
       client.socket.on('lobby_update', $scope.lobby_update)
    })

})()
