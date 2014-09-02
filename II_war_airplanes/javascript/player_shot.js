PlayerShot.prototype = new GameObject
PlayerShot.prototype.constructor = PlayerShot

//PlayerShot.image = new Img(false, "img/player-shot-1.png", 9, 20, 1)
function PlayerShot(px, py, sx, sy, ax, ay, player){
    GameObject.call(this, px, py, sx, sy, ax, ay)
    this.rectangles.push(new Rectangle(px, py, 10, 19, 0, 0))
    this.image_name = "shot_1"
    this.player = player
}

PlayerShot.prototype.exit_screen = function(next_pos){
    return!(next_pos.x < 510 && next_pos.x > -45  && next_pos.y < 510 && next_pos.y > -45)
}

