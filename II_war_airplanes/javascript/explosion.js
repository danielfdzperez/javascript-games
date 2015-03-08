Explosion.prototype = new GameObject
Explosion.prototype.constructor = Explosion

//Explosion.image = new Img(false, "img/player-sprite.png", 65, 65, 7)
function Explosion(pos, speed, accel){
    GameObject.call(this, pos.x, pos.y, speed.x, speed.y, accel.x, accel.y)
    this.life = 0
    this.image_name = "big_explosion"
    this.sound_name = "explosion"
    this.sound_src  = "../sounds/bomb.wav"
    this.play_sound()   
}

Explosion.prototype.update_physics = function(delta_time){
    GameObject.prototype.update_physics.call(this, delta_time)
    this.life ++
}
