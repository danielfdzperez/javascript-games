function Img(stack, src, width, height, n_sprites){
    if(stack){
        this.stack = {}
        this.stack_length = 0
	this.stack_mode = true
    }
    else{
        this.image = new Image()
        this.image.src = src
        this.width = width
        this.height = height
        this.n_sprites = n_sprites
        this.stack_mode = false
    }

}

Img.prototype.add_to_stack = function(src, width, height, n_sprites, name){
    if(this.stack_mode){
	if(!(name in this.stack)){
	    this.stack[name] = new Img(false, src, width, height, n_sprites)
	    this.stack_length++
	}
    }
}
