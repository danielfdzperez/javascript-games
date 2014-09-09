EnemyShot.prototype = new GameObject
EnemyShot.prototype.constructor = EnemyShot


function EnemyShot(px, py, sx, sy, ax, ay){
    GameObject.call(this, px, py, sx, sy, ax, ay)
    this.image_name = "enemy_shot"
    this.rectangles.push(new Rectangle(px, py, 9, 9, 0, 0))
}



EnemyShot.prototype.exit_screen = function(next_pos, canvas){
    return!(next_pos.x < (canvas.width+10) && next_pos.x > -45  && next_pos.y < (canvas.height+10) && next_pos.y > -45)
}
