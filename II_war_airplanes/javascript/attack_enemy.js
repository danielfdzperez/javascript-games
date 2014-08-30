Attack_enemy.prototype = new GameObject
Attack_enemy.prototype.constructor = Attack_enemy

//Attack_enemy.image = new Img(false, "img/attack-enemy-sprite.png", 32, 32, 3)
function Attack_enemy(px, py, sx, sy, ax, ay){
    GameObject.call(this, px, py, sx, sy, ax, ay)
	this.rectangles.push(new Rectangle(px, py, 27, 12, 3, 15))
	this.rectangles.push(new Rectangle(px, py, 14, 7, 9, 27))
	this.rectangles.push(new Rectangle(px, py, 14, 11, 9, 2))
        this.image_name = "attack_enemy"
	this.shot = false
}

Attack_enemy.prototype.exit_screen = function(next_pos){
    return!(next_pos.x < 510 && next_pos.x > -45  && next_pos.y < 510 && next_pos.y > -45)
}

/*Comprueba si puede disparar y calcula la direccion del disparo*/
Attack_enemy.prototype.shoot = function(players, world){
    //Comprueba que puede disparar otra vez
    if(this.pos.y > 300 && this.pos.y < 400)
	this.shot = false
   
    //comprueba si puede disparar
    if(!this.shot && ((this.pos.y <= 500 && this.pos.y >= 450) || (this.pos.y >= 200 && this.pos.y <= 300)) && 
	    world.players_alive() != -1){
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
}
