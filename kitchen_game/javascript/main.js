var canvas = null
var ctx    = null
var image_stack = null

var order_table = null
function init(){
    canvas = document.getElementById("canvas")
    ctx    = canvas.getContext("2d")
    canvas.width = document.documentElement.clientWidth - 30
    canvas.height = document.documentElement.clientHeight - 30
    image_stack = new ImageStock()
    image_stack.completed = initializeComponents
    loadImages()
}

function initializeComponents(){
    order_table = new OrdersTable(200, 200, 200, 100, image_stack.get("order_table"))
    draw()
}

function loadImages(){
    var load_images = 0
    var images = [["background", "images/background.png"], ["order_table", "images/order_table.png"]]
    image_stack.load(images)
}

function draw(){
    ctx.drawImage(image_stack.get("background"),0,0, canvas.width, canvas.height+10)
    //ctx.fillRect(20,20,150,100);
    order_table.draw(ctx)
}
