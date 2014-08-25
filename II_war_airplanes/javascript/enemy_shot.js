EnemyShot.prototype = new GameObject
EnemyShot.prototype.constructor = EnemyShot


function EnemyShot(px, py, sx, sy, ax, ay){
    GameObject.call(this, px, py, sx, sy, ax, ay)
}


EnemyShot.prototype.exit_screen = function(next_pos){
    return!(next_pos.x < 510 && next_pos.x > -45  && next_pos.y < 510 && next_pos.y > -45)
}
