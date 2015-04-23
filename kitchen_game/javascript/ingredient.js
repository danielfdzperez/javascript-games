function Ingredient(img){
    this.image = img
}

Ingredient.prototype.draw = function(ctx, position, width, height){
	ctx.drawImage(this.image, position.x, position.y, width, height)
}
/*TODO sobrecargar el metodo draw de GameObject*/