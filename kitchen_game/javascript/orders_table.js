OrdersTable.prototype = new GameObject
OrdersTable.prototype.constructor = OrdersTable

function OrdersTable(x, y, width, height, image){
    GameObject.call(this, x, y, width, height, image)
    this.order = null

    /*Agregamos estados para cambiar la forma de pintar*/
    /*Implementar clase EstateMachine*/
    this.estate = "free"
    this.draw_estates = {free: this.drawFree, busy: this.drawBusy}
    this.draw = this.draw_estates[this.estate]
}

OrdersTable.prototype.newOrder = function(n_max_producs, products){
	if(this.estate != "busy"){
	   this.order = new Order(n_max_producs, products)
	   this.estate = "busy"
	   this.draw = this.draw_estates[this.estate]
    }
}

/*
 * Se comprobará y actualizará el tiempo del pedido, y se actuara en consecuencia si es 0 o menor. 
 */
OrdersTable.prototype.update = function(){

}

/*
 * Debe especificar donde se pintan los productos y sus ingredientes
 */
 OrdersTable.prototype.drawFree = function(ctx){
    GameObject.prototype.draw.call(this, ctx)
}
OrdersTable.prototype.drawBusy = function(ctx){
    GameObject.prototype.draw.call(this, ctx)
    this.drawProducts(ctx)
    this.drawIngredietns(ctx)
}

OrdersTable.prototype.drawProducts = function(ctx){
	var products_length = this.order.getProducts().length
    var product_width = this.width/products_length
    var y_position = this.position.y + this.height/2
    for(var i = 0; i<products_length; i++){
    	var x = (product_width * i) + this.position.x
        this.order.getProduct(i).draw(ctx, new Position(x,y_position), product_width, this.height/2 )
    }
}

OrdersTable.prototype.drawIngredietns = function(ctx){
	var products_length = this.order.getProducts().length
    for(var i = 0; i<products_length; i++){
    	var product = this.order.getProduct(i)
    	var ingredietns_length = product.getIngredients().length
    	var ingredient_width = 10//this.width/ingredietns_length
    	var y = this.position.y
    	for(var j = 0; j < ingredietns_length; j++){
			var x = (ingredient_width * j) + this.position.x
		    product.getIngredient(j).draw(ctx, new Position(x,y+(10*(i+1))), 10, 10)
        }
    }
}

/*
funcion para cuando me dan un ingrediente
	Me pasan un array de ingredientes
	Le pregunto a mi pedido si quiere el primer ingrediente
	si lo quiere : quito el ingrediente y acabo
	si no lo quiere : sigo con el siguiente y repito pasos hasta acabar ingredientes
*/

/* TODO 
 * Debe tener 2 estados [Ocupada y libre]
 * Se necesita una función que registre el click del usuario
 * y saber si el ingrediente es valido y reaccionar*1.
 *
 *  *1-> comprobar si se ha completado el pedido, o si algun producto se ha completado 
 */