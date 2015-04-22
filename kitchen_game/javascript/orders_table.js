OrdersTable.prototype = new GameObject
OrdersTable.prototype.constructor = OrdersTable

function OrdersTable(x, y, width, height, image){
    GameObject.call(this, x, y, width, height, image)
    this.order = null
}

OrdersTable.prototype.new_order = function(n_max_producs, products){
	this.order = new Order(n_max_producs, products)
}

/*
 * Se comprobará y actualizará el tiempo del pedido, y se actuara en consecuencia si es 0 o menor. 
 */
OrdersTable.prototype.update = function(){

}

OrdersTable.prototype.draw = function(ctx){
    GameObject.prototype.draw.call(this, ctx)
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