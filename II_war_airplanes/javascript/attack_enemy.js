Attack_enemy.prototype = new GameObject
Attack_enemy.prototype.constructor = Attack_enemy

Attack_enemy.image = new Img("img/attack-enemy-sprite.png", 32, 32, 3)
function Attack_enemy(px, py, sx, sy, ax, ay){
    GameObject.call(this, px, py, sx, sy, ax, ay)
	this.rectangles.push(new Rectangle(px, py, 27, 12, 3, 15))
	this.rectangles.push(new Rectangle(px, py, 14, 7, 9, 27))
	this.rectangles.push(new Rectangle(px, py, 14, 11, 9, 2))
}

Attack_enemy.prototype.enemy_actions = function(){
    if(this.pos.y >= 250 && this.pos.y <= 252)
	console.log("Disparo")
}

Attack_enemy.prototype.exit_screen = function(next_pos){
    return!(next_pos.x < 510 && next_pos.x > -45  && next_pos.y < 510 && next_pos.y > -45)
}

