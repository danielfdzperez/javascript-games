function Sound(stack, src, volume, name, loop){
    if(stack){
        this.stack = {}
	this.stack_length = 0
	this.stack_mode = true
	this.max_sounds = src
    }
    else{
        this.sound = new Audio()
        this.sound.src = src
        this.sound.loop = loop || false
        this.sound.volume = volume * 0.1 || 1
	this.sound.name = name
        this.sound.endend = false
	this.stack_mode = false
    }
}

Sound.prototype.add_to_stack = function(src, name){
    if(this.stack_mode){
	var free_stack = true
	for(var i=0; i<this.stack_length; i++)
	    if(name in this.stack && this.stak[i].enden)
		free_stack = false

	if(free_stack){
	    this.stack[name] = new Img(false, src, width, height, n_sprites)
	    this.stack_length++
	}
    }
}
