function Countdown(time, stop, on_tick){
    this.time         = time
    this.current_time = null
    this.on_stop      = stop || null
    this.on_tick      = on_tick || null
    this.is_running   = false
    this.timeout      = null
}

Countdown.prototype.start = function(){
    var that = this
    var start = Date.now()
    this.is_running = true
    
    ;(function count(){
    	that.current_time = that.time - ( ( (Date.now() - start) /1000 ) | 0 )
   
    	if(that.current_time > 0 && that.is_running)
    	   that.timeout =  setTimeout(count, 1000)
    	else{
    	   that.is_running = false
    	   if(that.on_stop)
    	      that.on_stop()
    	}
    	if(that.on_tick)
    	   that.on_tick()
     }())
}

Countdown.prototype.stop = function(){
    this.is_running = false
    clearTimeout(this.timeout)
}

Countdown.prototype.to_string = function(){
    return ((this.current_time / 60) | 0) + ":" + ((this.current_time % 60) | 0)
}
