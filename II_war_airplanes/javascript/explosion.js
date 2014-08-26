Explosion.prototype = new GameObject
Explosion.prototype.constructor = Explosion

Explosion.image = new Img("img/explosion-sprite.png", 65, 65, 7)
function Explosion(pos, speed, accel){
    GameObject.call(this, pos.x, pos.y, speed.x, speed.y, accel.x, accel.y)
    this.life = 0
}

Explosion.prototype.update_physics = function(delta_time){
    GameObject.prototype.update_physics.call(this, delta_time)
    this.life ++
}
