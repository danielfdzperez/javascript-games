PlayerShot.prototype = new GameObject
PlayerShot.prototype.constructor = PlayerShot

//PlayerShot.image = new Img(false, "img/player-shot-1.png", 9, 20, 1)
function PlayerShot(px, py, sx, sy, ax, ay, player, type){
    GameObject.call(this, px, py, sx, sy, ax, ay)
    this.image_name = "shot_" + type
    this.rectangles.push(new Rectangle(px, py, GameObject.image_stack.stack[this.image_name].width, 
		GameObject.image_stack.stack[this.image_name].height, 0, 0))
    this.player = player
}

PlayerShot.prototype.exit_screen = function(next_pos, canvas){
    return!(next_pos.x < (canvas.width+10) && next_pos.x > -45  && next_pos.y < (canvas.height+10) && next_pos.y > -45)
}

