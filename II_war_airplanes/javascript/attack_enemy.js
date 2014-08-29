Attack_enemy.prototype = new GameObject
Attack_enemy.prototype.constructor = Attack_enemy

//Attack_enemy.image = new Img(false, "img/attack-enemy-sprite.png", 32, 32, 3)
function Attack_enemy(px, py, sx, sy, ax, ay){
    GameObject.call(this, px, py, sx, sy, ax, ay)
	this.rectangles.push(new Rectangle(px, py, 27, 12, 3, 15))
	this.rectangles.push(new Rectangle(px, py, 14, 7, 9, 27))
	this.rectangles.push(new Rectangle(px, py, 14, 11, 9, 2))
        this.image_name = "attack_enemy"
	this.shot = false
}

Attack_enemy.prototype.enemy_actions = function(){
    if(this.pos.y >= 250 && this.pos.y <= 252)
	console.log("Disparo")
}

Attack_enemy.prototype.exit_screen = function(next_pos){
    return!(next_pos.x < 510 && next_pos.x > -45  && next_pos.y < 510 && next_pos.y > -45)
}

Attack_enemy.prototype.shoot = function(player, world){
    if(this.pos.y > 300 && this.pos.y < 400)
	this.shot = false

    if(((this.pos.y <= 500 && this.pos.y >= 450) || (this.pos.y >= 200 && this.pos.y <= 300)) && this.shot == false){
        var x = player.pos.x - this.pos.x + 32
        var y = player.pos.y - this.pos.y + 32
        var angle = (Math.atan2(y,x)*360)/(2*Math.PI)
        var radians = angle * Math.PI/180
        var sx = Math.cos(radians) * 10
        var sy= Math.sin(radians) * 10
        world.new_enemy_shot(this.pos.x, this.pos.y, sx, sy, 0, 0)
        this.shot = true
    }
}
