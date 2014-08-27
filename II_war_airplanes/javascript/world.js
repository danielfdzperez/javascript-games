function World(id){
    this.canvas = document.getElementById(id)
    this.ctx    = this.canvas.getContext("2d")
    this.players          = []
    this.players_shots    = []
    //this.attack_enemies   = []
    //this.kamikaze_enemies = []
    this.enemy_planes     = []
    this.explosions       = []
    this.background = new Background()
    this.background.load_tiles()
    this.ev = new Events()
    this.ev.enable_inputs()
    this.level = new Level(this)
    this.delta = new FrameRateCounter(15)
    GameObject.load_images()
}

World.prototype.new_player = function(x, y, sx, sy, ax, ay){
    this.players.push(new Player(x, y, sx, sy, ax, ay))
}

World.prototype.new_player_shot = function(x, y, sx, sy, ax, ay){
    this.players_shots.push(new PlayerShot(x, y, sx, sy, ax, ay))
}

World.prototype.new_attack_enemy = function(x, y, sx, sy, ax, ay){
    //this.attack_enemies.push(new Attack_enemy(x, y, sx, sy, ax, ay))
    this.enemy_planes.push(new Attack_enemy(x, y, sx, sy, ax, ay))
}

World.prototype.new_kamikaze_enemy = function(x, y, sx, sy, ax, ay, img){
    this.enemy_planes.push(new KamikazeEnemy(x, y, sx, sy, ax, ay, img))
}

World.prototype.new_explosion = function(pos, speed, accel){
    this.explosions.push(new Explosion(pos, speed, accel))
}

World.prototype.refresh_graphics = function(){
   this.ctx.clearRect(0, 0, 500, 500)
   this.background.draw(this.ctx)

   for(var i=0; i<this.players.length; i++)
       this.players[i].draw(this.ctx)

   //for(var i=0; i<this.enemy_planes.length; i++)
     //  this.enemy_planes[i].draw(this.ctx)

   for(var i=0; i<this.enemy_planes.length; i++)
       this.enemy_planes[i].draw(this.ctx)

   for(var i=0; i<this.players_shots.length; i++)
       this.players_shots[i].draw(this.ctx)

   for(var i=0; i<this.explosions.length; i++)
       this.explosions[i].draw(this.ctx)
}

World.prototype.update_physics = function(){
    this.delta.count_frames() 
    var delta_time = this.delta.step
    /*Player*/
    for(var i=0; i<this.players.length; i++){
       this.players[i].update_physics(delta_time)
       for(var j=0; j<this.enemy_planes.length; j++)
           if(this.players[i].collision(this.enemy_planes[j])){
	       this.new_explosion(this.players[i].pos, new Coord(0, -1), new Coord(0))
	       this.new_explosion(this.enemy_planes[j].pos, this.enemy_planes[j].speed, this.enemy_planes[j].acceleration)
	       this.enemy_planes.splice(j, 1)
	       this.level.current_enemies--
	   }
       this.players[i].shot(this)

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

    /*Explosions*/
    for(var i=0; i<this.explosions.length; i++){
	this.explosions[i].update_physics(delta_time)
        if(this.explosions[i].life >= GameObject.image_stack.stack[this.explosions[i].image_name].n_sprites){
	    this.explosions.splice(i, 1)
	}
    }

    this.create_enemy()
}
World.cicle = 0

World.prototype.create_enemy = function(){
    var create = Math.floor(Math.random() * 10)
    if( create == 5 && (create+World.cicle)%2 ==0)
    this.level.create_new_enemy()
    World.cicle++
}

World.prototype.events = function(){
    //if(87 == this.ev.last_key || 38 == this.ev.last_key || 83 == this.ev.last_key || 40 == this.ev.last_key || 
     //  65 == this.ev.last_key || 37 == this.ev.last_key || 68 == this.ev.last_key || 39 == this.ev.last_key){
    this.players[0].action(this.ev, this)
   // }
}
