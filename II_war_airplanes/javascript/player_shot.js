PlayerShot.prototype = new GameObject
PlayerShot.prototype.constructor = PlayerShot

PlayerShot.image = new Img("img/player-shot-1.png", 9, 20, 1)
function PlayerShot(px, py, sx, sy, ax, ay){
    GameObject.call(this, px, py, sx, sy, ax, ay)
    this.rectangles.push(new Rectangle(px, py, 10, 19, 0, 0))
}

PlayerShot.prototype.exit_screen = function(next_pos){
    return!(next_pos.x < 510 && next_pos.x > -45  && next_pos.y < 510 && next_pos.y > -45)
}

