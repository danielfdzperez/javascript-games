Ball.prototype = new Circle
Ball.prototype.constructor = Ball

function Ball(x,y, radius,speed, angle){
    Circle.call(this,x,y,radius)
    this.speed = new Coord(speed)
    this.next  = new Coord()
    this.angle = angle
    this.radians = this.angle * Math.PI/180
    this.speed.x = Math.cos(this.radians) * this.speed.x
    this.speed.y = Math.sin(this.radians) * this.speed.y
}

Ball.prototype.update_physics = function(gravity, canvas){
   this.speed.y += gravity
   this.next.y = this.pos.y + this.speed.y
   this.next.x = this.pos.x + this.speed.x
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
      if(this.speed.x < 0)
       this.speed.x +=  0.1
      else
       this.speed.x -=  0.1
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
    if(Math.abs(x) >= 50 || Math.abs(y) >= 50){
	     this.speed.x += 50
	     this.speed.y += 50
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

