var t = false 
function Level(world){
    this.number = 1            //El nivel
    this.max_enemies = this.number*10//Máximo de enemigos por nivel
    this.enemies_dead = 0         //Los enemigos muertos
    this.current_enemies = 0
    this.max_current_enemies = 5
    this.improvement = false
    this.cicle = 0
    this.max_cicle = 30
    this.world = world
    this.ship = false
    this.ship_time = 0
}

Level.prototype.level_up = function(){
    this.number ++
    this.max_enemies += 7
    this.max_current_enemies += 2
    this.enemies_dead = 0
    if((this.max_cicle > 15 && this.number < 7) || (this.max_cicle > 5 && this.number >= 7))
	this.max_cicle -= 5

    if(this.number % 2 == 0)
	this.world.new_improvement(this.world.canvas.width/2, 0, 0, 1, 0, 0, "shot")
    else{
        var type = ["shot", "shield", "speed"]
	this.world.new_improvement(this.world.canvas.width/2, 0, 0, 1, 0, 0, type[Math.floor(Math.random()*3)])
    }
}

Level.prototype.new_level = function(){
    this.number = 1             //El nivel
    this.max_enemies = this.number*10//Máximo de enemigos por nivel
    this.enemies_dead = 0         //Los enemigos muertos
    this.current_enemies = 0
    this.max_current_enemies = 10
    this.cicle = 0
    this.max_cicle = 30
    this.ship_time = 0
    this.ship = false
}

Level.prototype.create_new_enemy = function(){
    if(!t && this.cicle % this.max_cicle == 0 && this.cicle != 0){
        this.ship_time++
        if(this.enemies_dead < this.max_enemies && this.current_enemies < this.max_current_enemies){
           this.improvement = false
           if(Math.floor((Math.random() * 15)) == 5)
              this.improvement = true
	   var enemy = null
	   if(this.number > 4 && !this.ship && this.ship_time > 50)
	       enemy = Math.floor(Math.random() * 5)
	   else
	       enemy = Math.floor(Math.random() * 4)
           switch(enemy){
           //switch(0){
               case 2:
               case 0:
                   var squad = Math.floor((Math.random() * 4))
                   //var x = Math.floor((Math.random() * (this.world.canvas.width-this.world.canvas.width/2)) + 200)
		   var x = Math.floor((Math.random() * (500) + 100))
		   //console.log(x)
                   var vx = 0//Math.floor((Math.random() * 1))
                   //vy = Math.floor((Math.random() * 5) + 5)
                   var vy = 7
                   for(var i=0; i<squad; i++){
                       this.world.new_attack_enemy(x, 0, vx, vy, 0, 0, this.improvement)
            	   this.improvement = false
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
            		   x = Math.floor(Math.random() * (this.world.canvas.width/2))
            		   vy = vx = 10
            		   this.world.new_kamikaze_enemy(x, y, vx, vy, 0, 0, "kamikaze_enemy_0", this.improvement)
            		   break;
            	       case 1:
            		   y = 0
            		   //x = Math.floor((Math.random() * 200) + 200)
            		   x = this.world.canvas.width - 10
            		   vy = 10
            		   vx = -10
            		   this.world.new_kamikaze_enemy(x, y, vx, vy, 0, 0, "kamikaze_enemy_1", this.improvement)
            		   break;
            	       case 2:
            		   x = Math.floor(Math.random() * (this.world.canvas.width/2))
            		   y = this.world.canvas.height - 10
            		   vx = 10
            		   vy = -10
            		   this.world.new_kamikaze_enemy(x, y, vx, vy, 0, 0, "kamikaze_enemy_2", this.improvement)
            		   break;
            	       case 3:
            		   x = this.world.canvas.width
			   y = this.world.canvas.height
            		   vy = vx = -10
            		   this.world.new_kamikaze_enemy(x, y, vx, vy, 0, 0, "kamikaze_enemy_3", this.improvement)
            		   break;
            	       this.current_enemies++
            	   }
                   break;
               case 3:
                   var y = 0
                   //var x = Math.floor((Math.random() * (this.world.canvas.width-this.world.canvas.width/2)) + 200)
		   var x = Math.floor((Math.random() * (500) + 100))
		   //console.log(x)
                   var sy = 10
                   var ay = 1
                   this.world.new_loop_enemy(x, 0, 0, 5, 0, ay, this.improvement)
                   break;
	       case 4:
		      var place = Math.floor(Math.random() * 2)
		      this.world.new_enemy_ship(place, true)
		      this.ship = true
		      this.ship_time = 0
		   break;
           }//Fin switch
        }//Fin if
        this.cicle = 0
    }
    else
	this.cicle++
}
