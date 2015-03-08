function GameObject(x, y, width, height, image){
    this.position = new Position(x, y)
    this.click_detector = new Rectangle(x, y, width, height)
    this.image = image
    this.width = width
    this.height = height
}

GameObject.prototype.draw = function(ctx){
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
}
