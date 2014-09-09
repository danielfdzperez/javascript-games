Improvement.prototype = new GameObject
Improvement.prototype.constructor = Improvement

function Improvement(x, y, sx, sy, ax, ay, type){
    GameObject.call(this, x, y, sx, sy, ax, ay)
    this.rectangles.push(new Rectangle(x, y, 24, 29, 0, 0))
    this.type = type
    this.image_name = this.type + "_improvement"
}

Improvement.prototype.exit_screen = function(next_pos, canvas){
    return!(next_pos.x < (canvas.width+10) && next_pos.x > -45  && next_pos.y < (canvas.height+10) && next_pos.y > -45)
}
