Ball.prototype = new Circle
Ball.prototype.constructor = Ball

function Ball(x,y, radius,speed, angle){
    Circle.call(this,x,y,radius)
    this.speed = new Coord(speed || 0)
    this.next  = new Coord()
    this.angle = angle || 0
    this.radians = this.angle * Math.PI/180
    this.speed.x = Math.cos(this.radians) * this.speed.x
    this.speed.y = Math.sin(this.radians) * this.speed.y
}

Ball.prototype.update_physics = function(canvas, gravity,friction){
   friction = friction || 0
   gravity = gravity || 0
   this.speed.y += gravity
   this.speed.y -= this.speed.y * friction
   this.speed.x -= this.speed.x * friction
   this.next.y = this.pos.y + (this.speed.y - this.speed.y * friction)
   this.next.x = this.pos.x + (this.speed.x - this.speed.x * friction)
   if (this.next.x >= (canvas.width/2 - (this.radius))|| 
	   this.next.x <= (-canvas.width/2 + (this.radius)) ) {
       this.speed.x *= -1
   } 
   if (this.next.y >= (canvas.height - (this.radius))){
       this.speed.y *= -1
   }
   if(this.next.y <= this.radius) {
      if(this.speed.y < 0)
         this.speed.y *= -1
      this.speed.x -= this.speed.x * 0.01
      //if(this.speed.x < 0)
      // this.speed.x +=  0.1
      //else
      // this.speed.x -=  0.1
   }
   if(this.speed.x < 0.3 && this.speed.x > -1){
       this.speed.x = 0
       this.stop_x = true
   }
   if(this.next.y <= this.radius && this.speed.y < 1 && this.speed.y > -1){
       this.next.y = 0 + this.radius
       this.speed.y = 0
       this.stop_y = true
   }
   this.pos.y = this.next.y
   this.pos.x = this.next.x
}

Ball.prototype.shoot = function(x,y){
    this.angle = ((Math.atan2(y,x)) * 360)/(2*Math.PI)
    if(y<0)
	this.angle += 360
    else
       if(x<0 && y<0)
	  this.angle += 180
    //alert("x: " + x + " y: " + y + " ang: " + this.angle)
    if(Math.abs(x) >= 30 || Math.abs(y) >= 30){
	     this.speed.x += 30
	     this.speed.y += 30
    }
    else
      if(Math.abs(x)>Math.abs(y)){
         this.speed.x += Math.abs(x)
         this.speed.y += Math.abs(x)
      }
      else{
         this.speed.y += Math.abs(y)
         this.speed.x += Math.abs(y)
      }
    this.radians = this.angle * Math.PI/180
    //alert(Math.cos(this.radians) + " sen: " + Math.sin(this.radians))
    //alert( " x: " + this.speed.x + " " + " y: " + this.speed.y)
    this.speed.x = Math.cos(this.radians) * this.speed.x
    this.speed.y = Math.sin(this.radians) * this.speed.y
    //alert( " x: " + this.speed.x + " " + " y: " + this.speed.y)
}

Ball.prototype.ball_impact = function(circle){
    var distance = new Coord((this.pos.x - circle.pos.x), (this.pos.y - circle.pos.y))

    var total_distance = (distance.x * distance.x + distance.y * distance.y)
    if(total_distance <=((this.radius + circle.radius) * (this.radius + circle.radius)))
	return true
    else
	return false
}

Ball.prototype.ball_collision = function(ball){
    var distance = new Coord(this.pos.x - ball.pos.x, this.pos.y - ball.pos.y)
    var collision_angle = Math.atan2(distance.y, distance.x);
    var this_speed = Math.sqrt(this.speed.x * this.speed.x + this.speed.y * this.speed.y);
    var ball_speed = Math.sqrt(ball.speed.x * ball.speed.x + ball.speed.y * ball.speed.y);

    var this_direction = Math.atan2(this.speed.y, this.speed.x);
    var ball_direction = Math.atan2(ball.speed.y, ball.speed.x);

    var this_velocity = new Coord(this_speed * Math.cos(this_direction - collision_angle), 
	    this_speed * Math.sin(this_direction - collision_angle))
    var ball_velocity = new Coord(ball_speed * Math.cos(ball_direction - collision_angle), 
	    ball_speed * Math.sin(ball_direction - collision_angle))

    //v'₁ = [(m₁ - m₂) v₁+ 2 m₂ v₂] / m₁ + m₂ 
    var this_final_velocity = new Coord( ((this.mass - ball.mass) * this_velocity.x +
	    (ball.mass + ball.mass) * ball_velocity.x) / (this.mass + ball.mass), this_velocity.y )

    var ball_final_velocity = new Coord( ((this.mass + this.mass) * this_velocity.x +
	    (ball.mass - this.mass) * ball_velocity.x) / (this.mass + ball.mass),  ball_velocity.y)

    this.speed.x = Math.cos(collision_angle) * this_final_velocity.x +
	Math.cos(collision_angle + Math.PI/2) * this_final_velocity.y

    this.speed.y = Math.sin(collision_angle) * this_final_velocity.x +
	Math.sin(collision_angle + Math.PI/2) * this_final_velocity.y

    ball.speed.x = Math.cos(collision_angle) * ball_final_velocity.x +
	Math.cos(collision_angle + Math.PI/2) * ball_final_velocity.y

    ball.speed.y = Math.sin(collision_angle) * ball_final_velocity.x +
	Math.sin(collision_angle + Math.PI/2) * ball_final_velocity.y

    this.pos.x = (this.pos.x += this.speed.x)
    this.pos.y = (this.pos.y += this.speed.y)
    ball.pos.x = (ball.pos.x += ball.speed.x)
    ball.pos.y = (ball.pos.y += ball.speed.y)
 //   alert( " ball:" + ball.next.x + " y:" + ball.next.y + " this:" + this.next.x + " y:" + this.next.y )
}
