function World(id, gravity, friction){
   this.canvas = document.getElementById(id)
   this.ctx    = canvas.getContext("2d")
   this.balls  = []
   this.gates  = []
   this.boxes  = []
   this.walls  = []
   this.ctx.transform(1,0,0,-1,canvas.width/2,canvas.height)
   this.friction = friction || 0
   if(gravity == 0)
       this.gravity = 0
   else
       this.gravity = gravity || -0.98
   this.mouse = new Coord() 
   this.press = new Coord() 
} 

World.prototype.new_ball = function(x, y, r, speed, angle){
   this.balls.push(new Ball(x, y, r, speed, angle))
}

World.prototype.new_gate = function(x, y, r){
   this.gates.push(new Gate(x, y, r))
}

World.prototype.new_box = function(x, y, side, speed, angle){
  this.boxes.push(new Box(x, y, side, speed, angle))
}

World.prototype.new_wall = function(x, y, height, width){
    this.walls.push(new Rectangle(x, y, height, width))
}
World.prototype.refresh = function() {
    /*Clear the canvas*/
    this.ctx.clearRect(-(this.canvas.width/2),0,this.canvas.width,this.canvas.height)

    /*Draw the walls*/
    for(var i=0; i<this.walls.length; i++)
	this.walls[i].draw(this.ctx)
    /*Update the balls*/
    for(var i=0; i<this.balls.length; i++){
	var ball_die = false
	for(var z=0; z<this.gates.length && ball_die != true; z++)
	if(this.balls[i].gate_collision(this.gates[z])){
	    this.balls.splice(i, 1)
	    ball_die = true
	}
	if(!ball_die){
           for(var z=0; z<this.balls.length; z++){
	       if(z != i)
	          if(this.balls[i].ball_impact(this.balls[z])){
	   	   this.balls[i].ball_collision(this.balls[z])
	           this.balls[z].update_physics(this.canvas, this.gravity, this.friction)
	          }
	   }
	//   for(var z=0; z<this.boxes.length; z++)
	   this.balls[i].update_physics(this.canvas, this.gravity, this.friction)
	   if(i == 0)
             this.balls[i].draw(this.ctx, 'blue')
	   else
             this.balls[i].draw(this.ctx)

	}
    }
    /*Upadte the boxes*/
    for(var i=0; i<this.boxes.length; i++){
	for(var z=0; z<this.balls.length; z++){
	    if(this.boxes[i].ball_impact(this.balls[z])){
	       this.boxes[i].collision(this.balls[z])
               this.balls[z].update_physics(this.canvas, this.gravity, this.friction)
	    }
	}
        for(var z=0; z<this.boxes.length; z++)
	    if(i != z)
	       if(this.boxes[i].box_impact(this.boxes[z])){
		   this.boxes[i].collision(this.boxes[z])
		   this.boxes[z].update_physics(this.gravity, this.canvas)
	}
	this.boxes[i].update_physics(this.gravity, this.canvas)
        this.boxes[i].draw(this.ctx)
    }

    /*Print the gates*/
    for(var i=0; i<this.gates.length; i++)
	this.gates[i].draw(this.ctx)
}

World.prototype.get_n_balls = function(){
    return this.balls.length
} 

World.prototype.update_mouse_position = function(evt){
    this.mouse.x=evt.pageX-this.canvas.offsetLeft
    this.mouse.y=evt.pageY-this.canvas.offsetTop
    var speed;
    var x = (this.mouse.x - this.press.x)
    var y = (this.mouse.y - this.press.y)*-1
    var angle = ((Math.atan2(y,x)) * 360)/(2*Math.PI)
    if(y<0)
	angle += 360
    else
       if(x<0 && y<0)
	  angle += 180

    if(Math.abs(x) >= 30 || Math.abs(y) >= 30){
             speed = 30
    }
    else
      if(Math.abs(x)>Math.abs(y)){
         speed = Math.abs(x)
      }
      else{
         speed = Math.abs(y)
      }
    speed = (speed * 100) / 30
    document.getElementById("power").innerHTML = "Power: " + speed + "%" + "<br>\n" + "Angle: " + angle + "º"
}

World.prototype.update_angle_and_speed_ball = function(evt){
    var x = (this.mouse.x - this.press.x)
    var y = (this.mouse.y - this.press.y)*-1
    //alert(x +" " + y)
    this.balls[0].shoot(x,y)
}

World.prototype.mouse_press = function(evt){
    this.press.x = this.mouse.x
    this.press.y = this.mouse.y
    
}
