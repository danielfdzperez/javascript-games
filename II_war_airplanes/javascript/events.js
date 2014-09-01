function Events(){
    this.keys_down = {}
    this.keys_up = {}
    this.last_key = null
}

Events.prototype.enable_inputs = function(){
    var that = this
    addEventListener("keydown", function (e) {
	    that.keys_down[e.keyCode] = true 
	    that.last_key = e.keyCode
	    delete that.keys_up[e.keyCode] 
	    }, false) 

    addEventListener("keyup", function (e) {
	    that.keys_up[e.keyCode] = true 
	    that.last_key = e.keyCode
	    delete that.keys_down[e.keyCode] 
	    }, false)
}

Events.prototype.add_key_down = function(e){
     this.keys_down[e.keyCode] = true 
     this.last_key = e.keyCode
     delete this.keys_up[e.keyCode]
}

Events.prototype.add_key_up = function(e){
    this.keys_up[e.keyCode] = true 
    this.last_key = e.keyCode
    delete this.keys_down[e.keyCode]
}
