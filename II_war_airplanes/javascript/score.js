function Score(score){
    if(arguments.length < 1)
	score = "0"
    this.score = score.split(",") || 0
    this.number_conversion()
}

Score.prototype.number_conversion = function(){
    for(var i=0; i<this.score.length; i++)
	this.score[i] = parseInt(this.score[i])
}

Score.prototype.save_score = function(){
    localStorage.setItem("war", this.score)
}

Score.prototype.get_score = function(){
    this.score = localStorage.getItem("war").split(",")
    this.number_conversion()
}

Score.prototype.add_score = function(score){
    this.score.push(score)
}

Score.prototype.arrange = function(){
}
