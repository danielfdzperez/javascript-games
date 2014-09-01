LoopEnemy.prototype = new GameObject
LoopEnemy.prototype.constructor = LoopEnemy

function LoopEnemy(px, py, sx, sy, ax, ay){
    GameObject.call(this, px, py, sx, sy, ax, ay)
    this.rectangles.push(new Rectangle(px, py, 32, 32, 0, 0))
    this.looping = false
    this.looped  = false
}
