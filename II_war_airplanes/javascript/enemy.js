Enemy.prototype = new GameObject
Enemy.prototype.constructor = Enemy

function Enemy(shot_improvement){
   this.shot = false
   this.shot_improvement = shot_improvement
}

Enemy.prototype.shoot = function(players, world){
    var player = null
    //Comprueba la cantidad de jugadores
    if(world.n_players > 1)
        if(world.players_alive() == 2){//Si estan todos vivos
            var player_1 = players[0]
            var player_2 = players[1]
            //Normaliza el vector de la distancia entre el enemigo y el jugador
            var distance_1 = Math.sqrt(Math.pow(2, Math.abs(player_1.pos.x - this.pos.x)) + 
    		Math.pow(2, Math.abs(player_1.pos.y - this.pos.y)))
            var distance_2 = Math.sqrt(Math.pow(2, Math.abs(player_2.pos.x - this.pos.x)) + 
    		Math.pow(2, Math.abs(player_2.pos.y - this.pos.y)))
    	//Escoge al jugador mas cercano
            if( distance_1 < distance_2)
                player = players[0]
            else
                player = players[1]
    
         }else//Coge al jugador vivo
             player = players[world.players_alive()]
    else//Solo si hay un jugador
        player = players[0]
    
           var x = player.pos.x - this.pos.x + 32//Calcula la posicion donde debe disparar
           var y = player.pos.y - this.pos.y + 32
           var angle = (Math.atan2(y,x)*360)/(2*Math.PI)
           var radians = angle * Math.PI/180
           var sx = Math.cos(radians) * 10
           var sy= Math.sin(radians) * 10
           world.new_enemy_shot(this.pos.x, this.pos.y, sx, sy, 0, 0)
           this.shot = true
}

Enemy.prototype.improvement = function(world){
    if(this.shot_improvement)
	world.new_improvement(this.pos.x, this.pos.y, 0, 1, 0, 0)
}
