function Level(world){
    this.number = 1             //El nivel
    this.max_enemies = this.number*10//Máximo de enemigos por nivel
    this.enemies_dead = 0         //Los enemigos muertos
    this.current_enemies = 0
    this.max_current_enemies = 10
    this.world = world
}

Level.prototype.create_new_enemie = function(){
    if(this.enemies_dead < this.max_enemies && this.current_enemies < this.max_current_enemies){
       switch(Math.floor((Math.random() * 1))){
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
       }
    }
}
