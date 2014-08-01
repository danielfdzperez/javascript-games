Box.prototype = new Square
Box.prototype.constructor = Box

/*
 * Parametros
 *    {Number} x & y X and Y position.
 *    Optativos
 *        {Number} side El tamaño del cuadrado. Si se omite 30.
 *        {Number} speed La velocidad. Si se omite 0.
 *        {Number} angle El ángulo. Si se omite 0.
 */
function Box(x, y, side, speed, angle){
    Square.call(this, x, y, side || 30)
    this.speed = new Coord(speed || 0)
    this.next  = new Coord()
    this.angle = angle || 0
    this.radians = this.angle * Math.PI/180
    this.speed.x = Math.cos(this.radians) * this.speed.x
    this.speed.y = Math.sin(this.radians) * this.speed.y
}

Box.prototype.update_physics = function(gravity, canvas){
   this.speed.y += gravity
   this.next.y = this.pos.y + this.speed.y
   this.next.x = this.pos.x + this.speed.x
   var half_side = this.side/2
   if (this.next.x >= (canvas.width/2 - (half_side))|| 
	   this.next.x <= (-canvas.width/2) ) {
       this.speed.x *= -1
   } 
   

   if (this.next.y >= (canvas.height - (half_side))){
       this.speed.y *= -1
   }
   if(this.next.y <= 0) {
      if(this.speed.y < 0)
         this.speed.y *= -1
      if(this.speed.x < 0)
       this.speed.x +=  0.1
      else
       this.speed.x -=  0.1
      this.next.y = 0
   }
   
   if(this.next.y <= 0 && this.speed.y < 1 && this.speed.y > -1){
       this.pos.y = 0
       this.speed.y = 0
       this.stop_y = true
   }
   if(this.speed.x < 0.3 && this.speed.x > -1){
       this.speed.x = 0
       this.stop_x = true
   }   
   if(this.stop_y){
           this.next.y = this.pos.y
	   this.speed.y = 0
       }
   this.pos.y = this.next.y
   this.pos.x = this.next.x
   this.stop_y = false
}

Box.prototype.box_impact = function(box){
    //if(this.pos.y <= box.pos.y + box.side && this.pos.x < box.pos.x + box.side && this.pos.x + this.side > box.pos.x && 
    //	    this.speed.y < 1 && this.speed.y > -1){
    //        if(this.pos.y + this.size + box.pos.y + box.side && this.speed.y < 1 && this.speed.y > -1)
    //    	this.stop_y = true
    //}
    //else
	if(this.pos.x < box.pos.x + box.side && this.pos.x + this.side > box.pos.x && (this.pos.y - 3) < box.pos.y + box.side 
	    && this.pos.y + this.side > box.pos.y){
	    if((this.pos.y - 3) > box.pos.y && this.speed.y < 1 && this.speed.y > -1){
		this.pos.y = box.pos.y + box.side + 2
		this.stop_y = true
	    }
	    else
		if(!(this.speed.y < 1 && this.speed.y > -1))
	           return true
	}
    return false
}

Box.prototype.ball_impact = function(ball){
   var cdx=Math.abs(ball.pos.x - this.pos.x - this.side/2)
   var cdy=Math.abs(ball.pos.y - this.pos.y - this.side/2)
   //alert(cdx)

 //  alert(cdy + " " + (this.side/2 + ball.radius))
   if( cdx <= (this.side/2 + ball.radius) && cdy <= (this.side/2 + ball.radius) )
       this.collision(ball)
}

Box.prototype.collision = function(ball){
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

}
