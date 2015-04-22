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
    this.finalized = false
}

/*
 Funcion parasaber si quiero un producto

  Recibir un product y comprobar si es el primero de mis ingredientes
  	si lo es 
  		lo quito de la lista y notifico que lo quiero -> true
  	si no
		notifico que no lo quiero -> flase
*/
