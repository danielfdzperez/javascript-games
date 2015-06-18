function Background(){
    this.map = [
	         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	         [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
 	         [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
	         [0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	         [0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
 	         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 	         [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
	         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
	         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 	         [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
	         [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]

	       ]
    this.tiles = []
    this.max_tiles = 4
    this.show_map = 0
    this.index = [15, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    this.advance = 0 //Avance lento del mapa
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
    	ctx.drawImage(this.tiles[this.map[this.index[y]][x]], x*64, (y-1)*64 + this.advance)
    }
    this.advance++
    if(this.advance >= 64){
	this.index.pop()
	var new_row = Background.wrap_index((this.index[0]-1), this.map.length)
        this.random_map(new_row)	
	this.index.unshift(new_row)
	this.advance = 0
    }
}

Background.wrap_index = function(number, max_number){
    return ((number % max_number) + max_number) % max_number
}

Background.prototype.random_map = function(row){
    for(var x=0; x<this.map[row].length; x++)
	if(Math.floor((Math.random() * 10)) == 3 && (x != 0 && x != 10))
	   this.map[row][x] = Math.floor((Math.random() * (this.max_tiles-1)) + 1)
	else
	   this.map[row][x] = 0
}
