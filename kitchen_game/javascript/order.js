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
    this.time = 0
    this.addProducts(n_max_producs, products)
}

Order.prototype.addProducts = function(max, products){
    var n_products = Math.floor(Math.random() * max)+1
    for(var i = 0; i < n_products; i++){
	   var random_product = Math.floor(Math.random() * products.length)
	   this.products.push(products[random_product])
	   this.time += products[random_product].time
    }
}

Order.prototype.getProducts = function(){
  return this.products
}

Order.prototype.getProduct = function(i){
  return this.products[i]
}

/* NO!!!
 * Debe pintar sus productos en la zona donde se le asigne y los ingredientes en otra zona que se le asigne
 * El pedido es el encargado de redimensionar las imagenes para que quepan en el espacio dispuesto
 * y disponerlas
 */
/*Order.prototype.draw = function(ctx, position, width, height){
}*/

/*
  Funcion para saber si me vale un ingrediente

  recibir el ingrediente 
  pasarselo a los productos para ver si los quieren
  si alguno lo quiere acabo y lo notifico -> true
  si nadie lo quiere acabo y lo notifico -> false
*/

/*
  Comprobar si algun pedido se ha finalizado y pintarlo diferente
*/
