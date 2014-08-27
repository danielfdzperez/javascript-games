function FrameRateCounter(fps){
    this.fps = fps || 20
    this.last_frame_count = 0
    this.frame_last = new Date().getTime()
    this.frame_ctr = 0
    this.last_time = new Date().getTime()
    this.step = 1
}

FrameRateCounter.prototype.count_frames = function(){

    var date_temp = new Date()
    /*Se calcula el tiempo*/
    var time_difference = date_temp.getTime() - this.last_time
    this.step = (time_difference/1000) * this.fps
    this.last_time = date_temp.getTime()


    /*Mostrar los fps por consola*/
    this.frame_ctr++
    if(date_temp.getTime() >= this.frame_last+1000){
	this.last_frame_count = this.frame_ctr
	this.frame_ctr = 0
	this.frame_last = date_temp.getTime()
	//console.log(this.last_frame_count)
    }
    delete date_temp
}
