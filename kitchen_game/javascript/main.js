var canvas = null
var ctx    = null
var image_stack = null

var order_table = null
var ingredient = []
var product = []

var game = null 
function init(){
    canvas = document.getElementById("canvas")
    ctx    = canvas.getContext("2d")
    canvas.width = document.documentElement.clientWidth - 30
    canvas.height = document.documentElement.clientHeight - 30
    image_stack = new ImageStock()
    image_stack.completed = initializeComponents
    loadImages()
    game = {
    	element: document.getElementById("canvas"),
    	width: 1280,
    	height: 800,
    	safeWidth: 1280,
    	safeHeight: 800
    }
    resizeGame()
}

function initializeComponents(){
    order_table = new OrdersTable(200, 200, 300, 200, image_stack.get("order_table"))
    ingredient.push(new Ingredient(image_stack.get("i1")))
    ingredient.push(new Ingredient(image_stack.get("i2")))
    product.push(new Product(ingredient, 0, image_stack.get("p1")))
    product.push(new Product([ingredient[0]], 0, image_stack.get("p2")))
    order_table.newOrder(2, product)
    draw()
}

function loadImages(){
    var load_images = 0
    var images = [["background", "images/background.png"], ["order_table", "images/order_table.png"], 
                  ["i1", "images/i1.png"], ["p1", "images/p1.png"], ["i2", "images/i2.png"], ["p2", "images/p2.png"]]
    image_stack.load(images)
}

function draw(){
    ctx.drawImage(image_stack.get("background"),0,0, canvas.width, canvas.height+10)
    //ctx.fillRect(20,20,150,100)
    order_table.draw(ctx)
    setTimeout(draw, 1000)
}


  
  resizeGame = function () {
	
    var viewport, newGameWidth, newGameHeight, newGameX, newGameY
					
    // Get the dimensions of the viewport
    viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    // Determine game size
    if (game.height / game.width > viewport.height / viewport.width) {
      if (game.safeHeight / game.width > viewport.height / viewport.width) {
          // A
          newGameHeight = viewport.height * game.height / game.safeHeight
          newGameWidth = newGameHeight * game.width / game.height
      } else {
          // B
          newGameWidth = viewport.width
          newGameHeight = newGameWidth * game.height / game.width
      }
    } else {
      if (game.height / game.safeWidth > viewport.height / viewport.width) {
        // C
        newGameHeight = viewport.height
        newGameWidth = newGameHeight * game.width / game.height
      } else {
        // D
        newGameWidth = viewport.width * game.width / game.safeWidth
        newGameHeight = newGameWidth * game.height / game.width
      }
    }
  
    game.element.style.width = newGameWidth + "px"
    game.element.style.height = newGameHeight + "px"
			
    newGameX = (viewport.width - newGameWidth) / 2
    newGameY = (viewport.height - newGameHeight) / 2
			
    // Set the new padding of the game so it will be centered
    //game.element.style.margin = newGameY + "px " + newGameX + "px"
  }

window.addEventListener("resize", resizeGame)

