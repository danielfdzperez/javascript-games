function ImageStock(){
    this.list={}
    this.weited=0
    this.loaded=0
}

ImageStock.prototype.load=function(list){
    var that = this
    this.weited = list.length
    for (var i = 0; i < this.weited; i++)
    {
        var img = new Image()
        img.src = list[i][1]
        img.onload = function(){
            that.loadedImage()
        }
        this.list[list[i][0]] = img
    }
}

ImageStock.prototype.loadedImage=function(){
    this.loaded ++
    if (this.loaded == this.weited)
    {
        this.completed()
    }
}

ImageStock.prototype.get=function(id){
    return this.list[id]
}

ImageStock.prototype.completed=function(){}