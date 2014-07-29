function World(id, gravity){
   this.canvas = document.getElementById(id)
   this.ctx    = canvas.getContext("2d")
   this.balls  = []
   this.gates  = []
   this.ctx.transform(1,0,0,-1,canvas.width/2,canvas.height)
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

World.prototype.refresh = function() {
    this.ctx.clearRect(-(this.canvas.width/2),0,this.canvas.width,this.canvas.height)
    for(var i=0; i<this.balls.length; i++){
        this.balls[i].draw(this.ctx) 
	this.balls[i].update_physics(this.gravity, this.canvas)
    }
    for(var i=0; i<this.gates.length; i++)
	this.gates[i].draw(this.ctx)
}

World.prototype.update_mouse_position = function(evt){
    this.mouse.x=evt.pageX-this.canvas.offsetLeft
    this.mouse.y=evt.pageY-this.canvas.offsetTop
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
