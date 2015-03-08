/**
 * Class Order
 *
 *
 * parameters
 * n_max_product {Number}
 * products      {Array} Array with products that the order can choose.
 */
function Order(n_max_producs, products){
    this.products = []
    this.addProducts()
    this.time = null
}

Order.prototype.addProducts(max, products){
    var n_products = Math.floor(Math.random() * max)
    for(var i = 0; i < n_products; i++){
	var random_product = Math.floor(Math.random() * products.length)
	this.products.push(products[random_product])
    }
}

/*Debe pintar sus productos en la zona donde se le asigne
 *El pedido es el encargado de redimensionar las imagenes para que quepan en el espacio dispuesto y disponerlas
 */
Order.prototype.draw = function(ctx, position, width, height){
}
