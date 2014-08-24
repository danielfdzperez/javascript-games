Player.prototype = new GameObject
Player.prototype.constructor = Player

Player.image = new Img("img/player-sprite.png", 65, 65, 3)
function Player(px, py, sx, sy, ax, ay){
    GameObject.call(this, px, py, sx, sy, ax, ay)
    this.rectangles.push(new Rectangle(px, py, 37.5, 17, 13, 40))
    this.rectangles.push(new Rectangle(px, py, 59, 22, 3, 17))
    this.rectangles.push(new Rectangle(px, py, 10, 2, 28, 14))
}

Player.prototype.action = function(events){
    if (87 in events.keys_up || 38 in events.keys_up)  // up
	this.acceleration.y = 0 
	this.speed.y = 0 
    if (83 in events.keys_up || 40 in events.keys_up)  // down
	this.acceleration.y = 0 
	this.speed.y = 0 
    if (65 in events.keys_up || 37 in events.keys_up)  // left
	this.acceleration.x = 0 
	this.speed.x = 0 
    if (68 in events.keys_up || 39 in events.keys_up)  // right
	this.acceleration.x = 0 
	this.speed.x = 0 
	    /*If keys down*/
    if (87 in events.keys_down || 38 in events.keys_down)  // up
	this.acceleration.y = -20 
    if (83 in events.keys_down || 40 in events.keys_down)  // down
	this.acceleration.y = 20 
    if (65 in events.keys_down || 37 in events.keys_down)  // left
	this.acceleration.x = -20 
    if (68 in events.keys_down || 39 in events.keys_down)  // right
	this.acceleration.x = 20 

 //   if (32 in events.keys_down) //Space

}
