function World(id, n_players){
    this.canvas = document.getElementById(id)
    this.ctx    = this.canvas.getContext("2d")
    this.n_players        = n_players // El numero de jugadores que hay en el mundo
    this.players          = [] //Jugadores
    this.players_shots    = [] //Disparos de los jugadores
    this.enemy_planes     = [] //Aviones enemigos
    this.enemy_shots      = [] //Disparos enemigos
    this.explosions       = [] //Explosiones
    this.background = new Background()    //Gestiona el fondo
    this.ev = new Events()                //Gestiona los eventos
    this.ev.enable_inputs()               //Activa los eventos
    this.level = new Level(this)          //Gestiona el nivel
    this.delta = new FrameRateCounter(15) //Gestiona el tiempo delta FPS
}

/*Agrega a su correspondiente array el nuevo objeto al mundo*/
World.prototype.new_player = function(x, y, number, sx, sy, ax, ay){
    this.players.push(new Player(x, y, number, sx, sy, ax, ay))
}

World.prototype.new_player_shot = function(x, y, sx, sy, ax, ay){
    this.players_shots.push(new PlayerShot(x, y, sx, sy, ax, ay))
}

World.prototype.new_attack_enemy = function(x, y, sx, sy, ax, ay){
    //this.attack_enemies.push(new Attack_enemy(x, y, sx, sy, ax, ay))
    this.enemy_planes.push(new Attack_enemy(x, y, sx, sy, ax, ay))
}

World.prototype.new_enemy_shot = function(x, y, sx, sy, ax, ay){
    this.enemy_shots.push(new EnemyShot(x, y, sx, sy, ax, ay))
}

World.prototype.new_kamikaze_enemy = function(x, y, sx, sy, ax, ay, img){
    this.enemy_planes.push(new KamikazeEnemy(x, y, sx, sy, ax, ay, img))
}

World.prototype.new_explosion = function(pos, speed, accel){
    this.explosions.push(new Explosion(pos, speed, accel))
}

/*Carga todo lo necesario*/
World.prototype.start = function(){
    GameObject.load_images()
    this.background.load_tiles()
    for(var i=0; i<this.n_players; i++)
       this.new_player(150*(i+1), 400, i+1, 0, 0, 0, 0)
}

/*Refresca los graficos*/
World.prototype.refresh_graphics = function(){
   this.ctx.clearRect(0, 0, 500, 500)

   this.background.draw(this.ctx)
   this.ctx.font = "20px Serif"
   this.ctx.fillText("Level " + this.level.number, 400, 20, 400)
   this.ctx.fillText("E_dead " + this.level.enemies_dead, 400, 40, 400)

   for(var i=0; i<this.players.length; i++){
       if(this.players[i].alive){
          this.players[i].draw(this.ctx)
          this.players[i].draw_lives(this.ctx)
       }
   }

   for(var i=0; i<this.enemy_planes.length; i++)
       this.enemy_planes[i].draw(this.ctx)

   for(var i=0; i<this.players_shots.length; i++)
       this.players_shots[i].draw(this.ctx)

   for(var i=0; i<this.enemy_shots.length; i++)
       this.enemy_shots[i].draw(this.ctx)

   for(var i=0; i<this.explosions.length; i++)
       this.explosions[i].draw(this.ctx)
}

/*Actualiza las fisicas y comprueba colisiones*/
World.prototype.update_physics = function(){
    this.delta.count_frames() 
    var delta_time = this.delta.step

    /*Player*/
    for(var i=0; i<this.players.length; i++){
       if(this.players[i].alive){
           this.players[i].update_physics(delta_time)
           this.players[i].shot(this)
           for(var j=0; j<this.enemy_planes.length; j++)
                  if(this.players[i].collision(this.enemy_planes[j])){
    	          this.new_explosion(this.players[i].pos, new Coord(0, -1), new Coord(0))
    	          this.new_explosion(this.enemy_planes[j].pos, this.enemy_planes[j].speed, this.enemy_planes[j].acceleration)
    	          this.enemy_planes.splice(j, 1)
    	          this.players[i].lives--
    	          this.level.current_enemies--
    	          if(this.players[i].lives <= 0)
    		      this.players[i].alive = false
    	   }
       }
    }

    /*Attack enemies*/
    for(var i=0; i<this.enemy_planes.length; i++){
       this.enemy_planes[i].update_physics(delta_time)
       if(this.enemy_planes[i].exit_screen(this.enemy_planes[i].pos)){
	   this.enemy_planes.splice(i, 1)
	   this.level.current_enemies--
       }
    }

    /*Player shots*/
    for(var i=0; i<this.players_shots.length; i++){
	var shot_delete = false
	this.players_shots[i].update_physics(delta_time)
        for(var j=0; j<this.enemy_planes.length; j++)
           if(!shot_delete && this.players_shots[i].collision(this.enemy_planes[j])){
	       this.new_explosion(this.enemy_planes[j].pos, this.enemy_planes[j].speed, this.enemy_planes[j].acceleration)
	       this.enemy_planes.splice(j, 1)
	       this.players_shots.splice(i, 1)
	       this.level.current_enemies--
	       this.level.enemies_dead ++
	       shot_delete = true

	   }
        if(!shot_delete && this.players_shots[i].exit_screen(this.players_shots[i].pos)){
	   this.players_shots.splice(i, 1)
	   shot_delete = true
	}
    }

    /*Enemy shots*/
    var shot_delete = false
    for(var i=0; i<this.enemy_shots.length; i++){
       shot_delete = false
       this.enemy_shots[i].update_physics(delta_time)
       for(var j=0; j<this.players.length; j++)
	   if(this.players[j].alive && !shot_delete && this.enemy_shots[i].collision(this.players[j])){
	       this.new_explosion(this.players[j].pos, this.players[j].speed, new Coord(0))
	       this.players[j].lives--
	       shot_delete = true
	       if(this.players[j].lives <= 0)
	           this.players[j].alive = false	   
	   }
       if(!shot_delete && this.enemy_shots[i].exit_screen(this.enemy_shots[i].pos)){
	   shot_delete = true
       }
       if(shot_delete)
	   this.enemy_shots.splice(i, 1)
    }

    /*Explosions*/
    for(var i=0; i<this.explosions.length; i++){
	this.explosions[i].update_physics(delta_time)
        if(this.explosions[i].life >= GameObject.image_stack.stack[this.explosions[i].image_name].n_sprites){
	    this.explosions.splice(i, 1)
	}
    }

    this.enemy_shot()
    this.create_enemy()
    this.level_up()
}

World.prototype.level_up = function(){
    if(this.level.enemies_dead >= this.level.max_enemies)
	this.level.new_level()
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
   for(var i=0; i<this.enemy_planes.length; i++)
      if(this.enemy_planes[i].constructor.name == "Attack_enemy")
            this.enemy_planes[i].shoot(this.players, this)
}

/*Crea nuevos enemigos*/
World.cicle = 0
World.prototype.create_enemy = function(){
    var create = Math.floor(Math.random() * 10)
    if( create == 5 && (create+World.cicle)%2 ==0)
    this.level.create_new_enemy()
    World.cicle++
}

/*Gestiona los eventos*/
World.prototype.events = function(){
    //if(87 == this.ev.last_key || 38 == this.ev.last_key || 83 == this.ev.last_key || 40 == this.ev.last_key || 
     //  65 == this.ev.last_key || 37 == this.ev.last_key || 68 == this.ev.last_key || 39 == this.ev.last_key){
    this.players[0].action(this.ev, this)
    this.players[1].action(this.ev, this)
   // }
}

/*Muestra fin del juego*/
World.prototype.game_over = function(){
    this.ctx.font = "50px Serif"
    this.ctx.fillText("Game Over", 100, 250, 400)
}
