function Level(world){
    this.number = 1             //El nivel
    this.max_enemies = this.number*10//Máximo de enemigos por nivel
    this.enemies_dead = 0         //Los enemigos muertos
    this.current_enemies = 0
    this.max_current_enemies = 10
    this.world = world
}

Level.prototype.create_new_enemy = function(){
    if(this.enemies_dead < this.max_enemies && this.current_enemies < this.max_current_enemies){
       //switch(Math.floor((Math.random() * 2))){
       switch(1){
	   case 0:
	       var squad = Math.floor((Math.random() * 4))
	       var x = Math.floor((Math.random() * 400) + 10)
	       var vx = Math.floor((Math.random() * 1))
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
			   this.world.new_kamikaze_enemy(x, y, vx, vy, 0, 0, "kamikaze_enemy")
			   break;
		       case 1:
			   y = 0
			   //x = Math.floor((Math.random() * 200) + 200)
			   x = 490
			   vy = 10
			   vx = -10
			   this.world.new_kamikaze_enemy(x, y, vx, vy, 0, 0, "kamikaze_enemy")
			   break;
		       case 2:
			   x = Math.floor((Math.random() * 200))
			   y = 490
			   vx = 10
			   vy = -10
			   this.world.new_kamikaze_enemy(x, y, vx, vy, 0, 0, "kamikaze_enemy")
			   break;
		       case 3:
			   y = x = 500
			   vy = vx = -10
			   this.world.new_kamikaze_enemy(x, y, vx, vy, 0, 0, "kamikaze_enemy")
			   break;
		       this.current_enemies++
		   }
	       break;
       }
    }
}
