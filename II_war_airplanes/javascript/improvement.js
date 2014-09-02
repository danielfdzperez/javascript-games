Improvement.prototype = new GameObject
Improvement.prototype.constructor = Improvement

function Improvement(x, y, sx, sy, ax, ay){
    GameObject.call(this, x, y, sx, sy, ax, ay)
    this.image_name = "shot_improvement"
}
