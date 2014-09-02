function Level(world){
    this.number = 1             //El nivel
    this.max_enemies = this.number*10//Máximo de enemigos por nivel
    this.enemies_dead = 0         //Los enemigos muertos
    this.current_enemies = 0
    this.max_current_enemies = 10
    this.world = world
}

Level.prototype.level_up = function(){
    this.number ++
    this.max_enemies += 7
    this.max_current_enemies += 5
    this.enemies_dead = 0
}

Level.prototype.new_level = function(){
    this.number = 1             //El nivel
    this.max_enemies = this.number*10//Máximo de enemigos por nivel
    this.enemies_dead = 0         //Los enemigos muertos
    this.current_enemies = 0
    this.max_current_enemies = 10
}

Level.prototype.create_new_enemy = function(){
    if(this.enemies_dead < this.max_enemies && this.current_enemies < this.max_current_enemies){
       switch(Math.floor((Math.random() * 4))){
       //switch(3){
	   case 2:
	   case 0:
	       var squad = Math.floor((Math.random() * 4))
	       var x = Math.floor((Math.random() * 300) + 100)
	       var vx = 0//Math.floor((Math.random() * 1))
	       //vy = Math.floor((Math.random() * 5) + 5)
	       var vy = 7
	       for(var i=0; i<squad; i++){
	           this.world.new_attack_enemy(x, 0, vx, vy, 0, 0)
		   if(i % 2 == 0)
		      x += 50
		   else
		      x += -100
	       }
	       this.current_enemies += squad
	       break;
	   case 1:
	       var corner = Math.floor((Math.random() * 4))
	       var x = null
	       var y = null
	       var vx = null
	       var vy = null
		   switch(corner){
		       case 0:
			   y = 0
			   x = Math.floor((Math.random() * 200))
			   vy = vx = 10
			   this.world.new_kamikaze_enemy(x, y, vx, vy, 0, 0, "kamikaze_enemy_0")
			   break;
		       case 1:
			   y = 0
			   //x = Math.floor((Math.random() * 200) + 200)
			   x = 490
			   vy = 10
			   vx = -10
			   this.world.new_kamikaze_enemy(x, y, vx, vy, 0, 0, "kamikaze_enemy_1")
			   break;
		       case 2:
			   x = Math.floor((Math.random() * 200))
			   y = 490
			   vx = 10
			   vy = -10
			   this.world.new_kamikaze_enemy(x, y, vx, vy, 0, 0, "kamikaze_enemy_2")
			   break;
		       case 3:
			   y = x = 500
			   vy = vx = -10
			   this.world.new_kamikaze_enemy(x, y, vx, vy, 0, 0, "kamikaze_enemy_3")
			   break;
		       this.current_enemies++
		   }
	       break;
	   case 3:
	       var y = 0
	       var x = Math.floor((Math.random() * 300) + 100)
	       var sy = 10
	       var ay = 1
	       this.world.new_loop_enemy(x, 0, 0, 5, 0, ay)
	       break;
       }
    }
}
