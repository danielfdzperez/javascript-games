Attack_enemy.prototype = new GameObject
Attack_enemy.prototype.constructor = Attack_enemy

Attack_enemy.image = new Img("img/attack-enemy-sprite.png", 32, 32, 3)
function Attack_enemy(px, py, sx, sy, ax, ay){
    GameObject.call(this, px, py, sx, sy, ax, ay)
}

