function World(id, n_players){
    this.canvas = document.getElementById(id)
    this.ctx    = this.canvas.getContext("2d")
    this.n_players        = n_players // El numero de jugadores que hay en el mundo
    this.players          = [] //Jugadores
    this.players_shots    = [] //Disparos de los jugadores
    this.enemy_shots      = [] //Disparos enemigos
    this.enemies          = [] 
    this.improvements     = [] //Mejoras
    this.explosions       = [] //Explosiones
    this.background = new Background()    //Gestiona el fondo
    this.ev = new Events()                //Gestiona los eventos
    this.level = new Level(this)          //Gestiona el nivel
    this.delta = new FrameRateCounter(15) //Gestiona el tiempo delta FPS
    this.end = false
    this.menu = new Menu(this.canvas)
    this.menu_on = false
    this.background_music = new Sound(false, "../sounds/back.mp3", 10, "backgorund", true) 
    this.total_score = new Score()
}

/*Agrega a su correspondiente array el nuevo objeto al mundo*/
World.prototype.new_player = function(x, y, number, sx, sy, ax, ay){
    this.players.push(new Player(x, y, number, sx, sy, ax, ay))
}

World.prototype.new_player_shot = function(x, y, sx, sy, ax, ay, player, t){
    this.players_shots.push(new PlayerShot(x, y, sx, sy, ax, ay, player, t))
}

World.prototype.new_improvement = function(x, y, sx, sy, ax, ay, type){
    this.improvements.push(new Improvement(x, y, sx, sy, ax, ay, type))
}

World.prototype.new_attack_enemy = function(x, y, sx, sy, ax, ay, improvement){
    this.enemies.push(new Attack_enemy(x, y, sx, sy, ax, ay, improvement))
}

World.prototype.new_enemy_shot = function(x, y, sx, sy, ax, ay){
    this.enemy_shots.push(new EnemyShot(x, y, sx, sy, ax, ay))
}

World.prototype.new_loop_enemy = function(x, y, sx, sy, ax, ay, improvement){
    this.enemies.push(new LoopEnemy(x, y, sx, sy, ax, ay, improvement))
}

World.prototype.new_kamikaze_enemy = function(x, y, sx, sy, ax, ay, img, improvement){
    this.enemies.push(new KamikazeEnemy(x, y, sx, sy, ax, ay, img, improvement))
}

World.prototype.new_enemy_ship = function(place, improvement){
    this.enemies.push(new EnemyShip(place, improvement))
}

World.prototype.new_explosion = function(pos, speed, accel){
    this.explosions.push(new Explosion(pos, speed, accel))
}

/*Carga todo lo necesario*/
World.prototype.start = function(restart){
    if(!restart){
       GameObject.load_images()
       this.background.load_tiles()
       this.background_music.sound.play()
    }
    this.total_score.get_score()
    console.log(this.total_score.score)
    this.level.new_level()
    for(var i=0; i<this.n_players; i++)
       this.new_player(400/(i+1), 400, i+1, 0, 0, 0, 0)
    this.end = false
    this.menu_on = false
}

World.prototype.delete_obj = function(){
    this.players.splice(0, this.players.length)
    this.enemies.splice(0, this.enemies.length)
    this.explosions.splice(0, this.explosions.length)
    this.enemy_shots.splice(0, this.enemy_shots.length)
    this.players_shots.splice(0, this.players_shots.length)
    this.improvements.splice(0, this.improvements.length)
}

/*Refresca los graficos*/
World.prototype.refresh_graphics = function(){
   this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)


   this.background.draw(this.ctx)
   for(var i=0; i<this.enemies.length; i++)
       this.enemies[i].draw(this.ctx)
   this.ctx.font = "20px Arial"
   this.ctx.fillText("Level " + this.level.number, this.canvas.width-100, 20, 400)
   var level_end = this.level.enemies_dead * 100
   level_end /= this.level.max_enemies
   this.ctx.fillText("End " + Math.floor(level_end) + "%", this.canvas.width-100, 40, 400)
   //this.ctx.fillText("E_dead " + this.level.enemies_dead, 400, 40, 400)


   for(var i=0; i<this.players.length; i++){
       if(this.players[i].alive)
          this.players[i].draw(this.ctx)
       this.players[i].draw_info(this.ctx, this.canvas)
   }

   for(var i=0; i<this.players_shots.length; i++)
       this.players_shots[i].draw(this.ctx)

   for(var i=0; i<this.enemy_shots.length; i++)
       this.enemy_shots[i].draw(this.ctx)

   for(var i=0; i<this.explosions.length; i++)
       this.explosions[i].draw(this.ctx)

   for(var i=0; i<this.improvements.length; i++)
       this.improvements[i].draw(this.ctx)
}

/*Actualiza las fisicas y comprueba colisiones*/
World.prototype.update_physics = function(){
    this.delta.count_frames() 
    var delta_time = this.delta.step

    /*Player*/
    for(var i=0; i<this.players.length; i++){
       if(this.players[i].alive){
	   this.players[i].extra_live()
           this.players[i].update_physics(delta_time, this.canvas)
           this.players[i].shot(this)
	   for(var j=0; j<this.improvements.length; j++){
	       if(this.players[i].collision(this.improvements[j])){
		   this.players[i].improve(this.improvements[j].type, 1)
		   this.improvements.splice(j, 1)
	       }
	   }
	   if(this.players[i].startup)
	       this.players[i].restart()
	   //var impact = false
           for(var j=0; j<this.enemies.length /*&& !impact*/; j++)
                  if(!this.players[i].startup && this.enemies[j].constructor.name != "EnemyShip" &&  
			  this.players[i].collision(this.enemies[j])){
		      if(this.enemies[j].dead(this))
    	                 this.enemies.splice(j, 1)
    	             this.new_explosion(this.players[i].pos, new Coord(0, -1), new Coord(0))
    	             this.players[i].damage()
    	             this.level.current_enemies--
		     //impact = true
    	          }
       }
    }

    /*Attack enemies*/
    for(var i=0; i<this.enemies.length; i++){
       this.enemies[i].update_physics(delta_time)
       if(this.enemies[i].exit_screen(this.enemies[i].pos, this.canvas)){
           if(this.enemies[i].constructor.name == "EnemyShip")
	      this.level.ship = false
	   this.enemies.splice(i, 1)
	   i--
	   this.level.current_enemies--
       }
    }

    //for(var i=0; i<this.enemy_ships.length; i++){
    //    this.enemy_ships[i].update_physics(delta_time)
    //    if(this.enemy_ships[i].exit_screen(this.enemy_ships[i].pos)){
    //        this.enemy_ships.splice(i, 1)
    //        i--
    //        this.level.current_enemies--
    //    }
    //}

    /*Player shots*/
    var shot_delete = false
    for(var i=0; i<this.players_shots.length; i++){
	shot_delete = false
	this.players_shots[i].update_physics(delta_time)
        for(var j=0; j<this.enemies.length; j++)
           if(!shot_delete && this.players_shots[i].collision(this.enemies[j])){
		      if(this.enemies[j].dead(this)){
	                 this.players[this.players_shots[i].player-1].score += this.enemies[j].score
	                 this.enemies[j].improvement(this)
                         if(this.enemies[j].constructor.name == "EnemyShip")
			     this.level.ship = false
	                 this.enemies.splice(j, 1)
	                 this.level.current_enemies--
	                 this.level.enemies_dead ++
		      }else{
	                  this.new_explosion(this.players_shots[i].pos, new Coord(0), new Coord(0))
		      }
	       shot_delete = true
	   }
        if(!shot_delete && this.players_shots[i].exit_screen(this.players_shots[i].pos, this.canvas)){
	   shot_delete = true
	}
	if(shot_delete){
	   this.players_shots.splice(i, 1)
	   i--
	}
    }

    /*Enemy shots*/
    for(var i=0; i<this.enemy_shots.length; i++){
       shot_delete = false
       this.enemy_shots[i].update_physics(delta_time)
       for(var j=0; j<this.players.length; j++)
	   if(!this.players[j].startup && this.players[j].alive && !shot_delete && this.enemy_shots[i].collision(this.players[j])){
	       this.new_explosion(this.players[j].pos, this.players[j].speed, new Coord(0))
	       this.players[j].damage()
	       shot_delete = true
	   }
       if(!shot_delete && this.enemy_shots[i].exit_screen(this.enemy_shots[i].pos, this.canvas)){
	   shot_delete = true
       }
       if(shot_delete){
	   this.enemy_shots.splice(i, 1)
	   i--
       }
    }

    /*Explosions*/
    for(var i=0; i<this.explosions.length; i++){
	this.explosions[i].update_physics(delta_time)
        if(this.explosions[i].life >= GameObject.image_stack.stack[this.explosions[i].image_name].n_sprites){
	    this.explosions.splice(i, 1)
	}
    }

    /*Improvements*/
    for(var i=0; i<this.improvements.length; i++){
	this.improvements[i].update_physics(delta_time)
         if(this.improvements[i].exit_screen(this.improvements[i].pos, this.canvas))
	     this.improvements.splice(i, 1)
    }

    this.enemy_shot()
    this.level.create_new_enemy()
    this.level_up()
}

World.prototype.level_up = function(){
    if(this.level.enemies_dead >= this.level.max_enemies){
	this.level.level_up()
        for(var i=0; i<this.players.length; i++)
	    this.players[i].revive()
    }
}

/*Comprueba si todos los jugadores estan muertos*/
World.prototype.end_game = function(){
    var count = 0
    for(var i=0; i<this.players.length; i++)
	if(!this.players[i].alive)
	    count++
    if(this.n_players - count == 0)
       return true
    else
       return false
}

/*Comprueba que jugadores estan vivos
  Devuelve 2 si todos estan vivos
  Devuelve -1 si estan tdos muertos
  Devuelve el indice del jugador vivo
 */
World.prototype.players_alive = function(){
    var player_alive = []
    for(var i=0; i<this.players.length; i++)
	if(this.players[i].alive)
	    player_alive.push(i)
    if(player_alive.length > 1)
	return 2
    else
	if(player_alive.length < 1)
	    player_alive.push(-1)
    return player_alive[0]
}

/*Crea disparos de los enemigos*/
World.prototype.enemy_shot = function(){
   for(var i=0; i<this.enemies.length; i++)
      if(this.enemies[i].constructor.name != "KamikazeEnemy")
            this.enemies[i].shoot(this.players, this)

   //for(var i=0; i<this.enemy_ships.length; i++)
      // this.enemy_ships[i].shoot(this.players, this)
}

/*Gestiona los eventos*/
World.prototype.events = function(e){
    this.players[0].action(this.ev)
    if(this.n_players > 1)
       this.players[1].action(this.ev)
    if(77 in this.ev.keys_down)
	   this.background_music.mute()

    //if(this.end && 13 in this.ev.keys_down)
	
}

/*Muestra fin del juego*/
World.prototype.game_over = function(){
    this.ctx.font = "50px Serif"
    this.ctx.fillText("Game Over", this.canvas.width/2-100, this.canvas.height/2, 400)
    this.ctx.font = "20px Arial"
    this.ctx.fillText("Press enter to continue", this.canvas.width/2-50, this.canvas.height/2+100, 400)
    this.end = true
    this.n_players = 0
    this.total_score.add_score(this.players[0].score)
    this.total_score.save_score()
}

World.prototype.show_menu = function(){
    if(!this.menu.ready){
      this.canvas.width = this.canvas.width
      this.ctx.font = "50px Serif"
      this.ctx.fillText("Loading", this.canvas.width/2-100, this.canvas.height/2)
      setTimeout(this.show_menu, 10)
    }
    this.menu.draw(this.ctx)
    this.menu_on = true
}

World.prototype.mouse_press = function(e){
   if(this.menu_on){
      var mouse = {pos: new Coord((e.pageX-this.canvas.offsetLeft), (e.pageY-this.canvas.offsetTop))}
      this.menu.click(mouse.pos.x, mouse.pos.y, this)
   }
}
