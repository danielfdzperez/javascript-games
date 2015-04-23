/**
 * Class Product
 *
 *
 * Parameters
 * ingredietns {Array} Array with the ingredints form the product, in order of creation.
 */
function Product(ingredients, time, image){
    this.time = time
    this.image = image
    this.ingredients = ingredients

    /*Agregamos estados para cambiar la forma de pintar*/
    /*Implementar clase EstateMachine*/
    this.estate = "incomplete"
    this.draw_estates = {incomplete: this.drawIncomplete, complete: this.drawComplete}
    this.draw = this.draw_estates[this.estate]
}

Product.prototype.getIngredients = function(){
	return this.ingredients
}
Product.prototype.getIngredient = function(i){
	return this.ingredients[i]
}
	
/*
 Funcion parasaber si quiero un producto

  Recibir un product y comprobar si es el primero de mis ingredientes
  	si lo es 
  		lo quito de la lista, compruebo si tengo que cambiar de estado y notifico que lo quiero -> true
  	si no
		notifico que no lo quiero -> flase
*/

/*
 * En su función draw tendra 2 estados, cuando aun no esta echo el producto, se pintara opaco
 * y cuando ya este echo se pintara normal
 */
 Product.prototype.drawIncomplete = function(ctx, position, width, height){
 	ctx.drawImage(this.image, position.x, position.y, width, height)
}
 Product.prototype.drawComplete = function(ctx, position, width, height){
 	ctx.drawImage(this.image, position.x, position.y, width, height)
}
/*TODO sobrecargar el metodo draw de GameObject*/
