function Menu(canvas){
    this.pos_1 = new Coord(canvas.width/2-50, canvas.height/2)
    this.pos_2 = new Coord(canvas.width/2-50, canvas.height/2+100)
    this.rectangles = []
    this.rectangles.push(new Rectangle(this.pos_1.x, this.pos_1.y, 100, 30, -10, -20))
    this.rectangles.push(new Rectangle(this.pos_2.x, this.pos_2.y, 100, 30, -10, -20))
    this.background = new Image()
    this.background.src = "img/menu.jpg"
}

Menu.prototype.draw = function(ctx){
   ctx.clearRect(0, 0, 500, 500)
   ctx.drawImage(this.background, 0, 0)
   ctx.font = "20px Arial"
   ctx.fillText("1 Player ", this.pos_1.x, this.pos_1.y, 400)
   ctx.fillText("2 Player", this.pos_2.x, this.pos_2.y, 400)
   ctx.save()
   for(var i=0; i<this.rectangles.length; i++){
        ctx.shadowOffsetX = 4
        ctx.shadowOffsetY = 4
        ctx.shadowColor = 'black'
	ctx.shadowBlur = 5
	ctx.lineWidth  = 5
        ctx.strokeRect(this.rectangles[i].pos.x, this.rectangles[i].pos.y, this.rectangles[i].width, this.rectangles[i].height)
   }
   ctx.restore()
}

Menu.prototype.click = function(x, y, world){
    var mouse = {pos: new Coord(x, y)}
    var player = 0
    for(var i=0; i<this.rectangles.length; i++)
	if( ( (mouse.pos.x > this.rectangles[i].pos.x) && (mouse.pos.x < (this.rectangles[i].pos.x + this.rectangles[i].width)) )
	   && ( (mouse.pos.y > this.rectangles[i].pos.y) && (mouse.pos.y < (this.rectangles[i].pos.y + this.rectangles[i].height))) )
	    player = i+1
    world.n_players = player
}
