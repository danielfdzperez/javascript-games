KamikazeEnemy.prototype = new Enemy
KamikazeEnemy.prototype.constructor = KamikazeEnemy

function KamikazeEnemy(px, py, sx, sy, ax, ay, img){
    GameObject.call(this, px, py, sx, sy, ax, ay, 50)
    this.rectangles.push(new Rectangle(px, py, 32, 32, 0, 0))
    this.image_name = img
}

KamikazeEnemy.prototype.exit_screen = function(next_pos){
    return!(next_pos.x < 510 && next_pos.x > -45  && next_pos.y < 510 && next_pos.y > -45)
}

//KamikazeEnemy.prototype.draw = function(ctx){
//    ctx.save()
//    ctx.translate(this.pos.x, this.pos.y)
//    ctx.rotate(100 * Math.PI / 180)
//    ctx.drawImage(GameObject.image_stack.stack[this.image_name].image, 
//	    this.img_mv%GameObject.image_stack.stack[this.image_name].n_sprites*GameObject.image_stack.stack[this.image_name].width, 0, 
//	    GameObject.image_stack.stack[this.image_name].width, GameObject.image_stack.stack[this.image_name].height, 
//            GameObject.image_stack.stack[this.image_name].width/2, GameObject.image_stack.stack[this.image_name].height/2,
//	    GameObject.image_stack.stack[this.image_name].width, GameObject.image_stack.stack[this.image_name].height)
//    ctx.restore()
//    ctx.strokeStyle = "black"
//    for(var i=0; i<this.rectangles.length; i++)
//        ctx.strokeRect(this.rectangles[i].pos.x, this.rectangles[i].pos.y, this.rectangles[i].width, this.rectangles[i].height)
//
//}
