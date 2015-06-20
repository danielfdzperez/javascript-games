function World(canvas, player, players){
   var that = this


   //Canvas funcionalidades
   this.canvas = document.getElementById(canvas)
   this.ctx = this.canvas.getContext("2d")
   this.canvas.addEventListener("mousedown",  function(event){
       that.is_clicking    = true
       that.before_point.x = event.pageX - that.canvas.offsetLeft
       that.before_point.y = event.pageY - that.canvas.offsetTop
   })
   this.canvas.addEventListener("mouseup",    no_click);
   this.canvas.addEventListener("mouseleave", no_click);
   function no_click(event){
      that.is_clicking = false
   }

   this.canvas.addEventListener("mousemove",  function(event){
        if(that.player.rol != "drawer")
    	   return
        if(that.is_clicking)
    	if(that.before_point.x != event.pageX || that.before_point.y != event.pageY){
    	   var point = { previous:{x:that.before_point.x, y:that.before_point.y}, 
    	                 last:{x:event.pageX - that.canvas.offsetLeft, y:event.pageY - that.canvas.offsetTop} }
    	   that.draw(point)
           that.player.socket.emit('pintar',  point)
           that.before_point.x = event.pageX - that.canvas.offsetLeft
           that.before_point.y = event.pageY - that.canvas.offsetTop
    	}
   })

   //Acciones del jugador
   this.player = player
   this.player.socket.on('pintar', function(point){that.draw(point)})
   this.player.socket.on('wait', this.waiting)
   this.player.socket.on('run', this.run)
   this.player.socket.on('new_round', function(){that.new_round()})
   this.player.socket.on('rol', function(rol){that.change_rol(rol)})
   this.player.socket.on('word', function(word){$("#Drawer span").text(word)})
   this.player.socket.on('wrong_word', function(){$("#Answer").val("Error")})
   this.players = players

   this.is_clicking = false
   this.before_point = {x:null, y:null}
   this.player.socket.emit('loaded')
}

World.prototype.draw = function(point){
   this.ctx.beginPath();
   this.ctx.moveTo(point.previous.x-8, point.previous.y-8);
   this.ctx.lineTo(point.last.x-8, point.last.y-8);
   this.ctx.stroke();
}
World.prototype.new_round = function(){
    this.canvas.height = this.canvas.height
}
World.prototype.change_rol = function(rol){
    var browser = $("#Browser")
    var drawer  = $("#Drawer")
    if(rol == "drawer"){
	browser.removeClass( "show_action" ).addClass( "hide_action" )
	drawer.removeClass("hide_action").addClass("show_action")
    }else{
	drawer.removeClass( "show_action" ).addClass( "hide_action" )
	browser.removeClass("hide_action").addClass("show_action")
    }

    this.player.set_rol(rol)
}

World.prototype.send_answer = function(word){
    this.player.socket.emit('answer', word)
}


World.prototype.waiting = function(){
}
World.prototype.run = function(){
}

