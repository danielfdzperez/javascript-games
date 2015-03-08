OrdersTable.prototype = new GameObject
OrdersTable.prototype.constructor = OrdersTable

function OrdersTable(x, y, width, height, image){
    GameObject.call(this, x, y, width, height, image)
    this.order = null
}

OrdersTable.prototype.draw = function(ctx){
    GameObject.prototype.draw.call(this, ctx)
}
