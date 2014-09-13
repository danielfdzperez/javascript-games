function Sound(stack, src, volume, name, loop){
    if(stack){
        this.stack = []
	this.stack_mode = true
	this.max_sounds = src
    }
    else{
        this.sound = new Audio()
        this.sound.src = src
        this.sound.loop = loop || false
        this.sound.volume = volume * 0.1 || 1
	this.stack_mode = false
	this.volume = this.sound.volume
	this.name = name
    }
}

Sound.prototype.play = function(src, name, volume, loop){
    if(this.stack_mode){
	var play = false
	for(var i=0; i<this.stack.length && !play; i++)
	   if(this.stack[i].name == name && this.stack[i].sound.ended){
	       this.stack[i].sound.play()
	       play = true
	   }
	if(!play)
           if(this.stack.length < this.max_sounds){
              this.stack[this.stack.length] = new Sound(false, src, volume, name, loop)
              this.stack[this.stack.length-1].sound.play()
           }
           else
              for(var i=0; i<this.stack.length; i++)
                 if(this.stack[i].sound.ended){
                     this.stack[i] = new Sound(false, src, volume, name, loop)
                     this.stack[i].sound.play()
                 }
    }
}

Sound.prototype.mute = function(){
    if(!this.stack_mode)
	if(this.sound.volume != 0) 
	    this.sound.volume = 0
	else
	    this.sound.volume = this.volume
    else
	for(var i=0; i<this.stack.length; i++)
	    this.stack[i].mute()
}
