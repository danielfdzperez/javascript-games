function Background(){
    this.map = [
	         [0, 0, 0, 0, 0, 0, 0, 0],
	         [1, 1, 1, 1, 1, 1, 1, 1],
 	         [2, 2, 2, 2, 2, 2, 2, 2],
	         [3, 3, 3, 3, 3, 3, 3, 3],
                 [0, 0, 0, 0, 0, 0, 0, 0],
	         [1, 1, 1, 1, 1, 1, 1, 1],
 	         [2, 2, 2, 2, 2, 2, 2, 2],
	         [0, 0, 0, 0, 0, 0, 0, 0],

                 [0, 0, 0, 0, 0, 0, 0, 0],
	         [1, 1, 1, 1, 1, 1, 1, 1],
 	         [2, 2, 2, 2, 2, 2, 2, 2],
	         [1, 1, 1, 1, 1, 1, 1, 1],
                 [1, 1, 1, 1, 1, 1, 1, 1],
	         [1, 1, 1, 1, 1, 1, 1, 1],
 	         [2, 2, 2, 2, 2, 2, 2, 2],
	         [0, 0, 0, 0, 0, 0, 0, 0]

	       ]
    this.tiles = []
    this.max_tiles = 4
    this.show_map = 0
    this.index = [0, 1, 2, 3, 4, 5, 6, 7]
    this.cicle = 0
    this.s_time = new Date().getTime()
    this.e_time = null
}

Background.prototype.load_tiles = function(){
    for(var i=0; i<this.max_tiles; i++){
	this.tiles.push(new Image())
	this.tiles[i].src = "img/tile" + i + ".png"
    }
}

Background.prototype.draw = function(ctx){

    for(var y=0; y<this.index.length; y++){
        for(var x=0; x<this.map[y].length; x++)
    	ctx.drawImage(this.tiles[this.map[this.index[y]][x]], x*64, y*64)
    }
    //if(this.cicle % 2 == 0){
    this.e_time = new Date().getTime()
    var diference = this.e_time - this.s_time
    if(this.e_time >= this.s_time + 100){
	this.index.pop()
	var new_row = Background.wrap_index((this.index[0]-1), this.map.length)
        this.random_map(new_row)	
	this.index.unshift(new_row)
        this.s_time = new Date().getTime()
    }
    this.cicle++
}

Background.wrap_index = function(number, max_number){
    return ((number % max_number) + max_number) % max_number
}

Background.prototype.random_map = function(row){
    for(var x=0; x<this.map[row].length; x++)
	if(Math.floor((Math.random() * 10)) == 3)
	   this.map[row][x] = Math.floor((Math.random() * (this.max_tiles-1)) + 1)
	else
	   this.map[row][x] = 0
}

