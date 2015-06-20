function World(canvas, player, players){
   var that = this
   this.end = false

   //Canvas funcionalidades
   this.canvas = document.getElementById(canvas)
   this.ctx = this.canvas.getContext("2d")
   this.canvas.addEventListener("mousedown",  click)
   this.canvas.addEventListener("touchstart",  click)
   function click(event){
       var x
       var y
       switch(event.type){
	   case "mousedown":
	       x = event.pageX
	       y = event.pageY
	       break;
	   case "touchstart":
	       x = event.changedTouches[0].pageX
 	       y = event.changedTouches[0].pageY
	       break;
       }
       that.is_clicking    = true
       that.before_point.x = x - that.canvas.offsetLeft
       that.before_point.y = y - that.canvas.offsetTop
   }
   this.canvas.addEventListener("mouseup",    no_click);
   this.canvas.addEventListener("touchend",    no_click);
   this.canvas.addEventListener("mouseleave", no_click);
   this.canvas.addEventListener("touchleave",    no_click);
   function no_click(event){
      that.is_clicking = false
   }

   this.canvas.addEventListener("mousemove",  move)
   this.canvas.addEventListener("touchmove",  move)
   function move(event){
       var x
       var y
       switch(event.type){
	   case "mousemove":
	       x = event.pageX
	       y = event.pageY
	       break;
	   case "touchmove":
	       x = event.changedTouches[0].pageX
 	       y = event.changedTouches[0].pageY
	       break;
       }
       x -= that.canvas.offsetLeft
       y -= that.canvas.offsetTop
       if(that.player.rol != "drawer")
          return
       if(that.is_clicking)
       if(that.before_point.x != x || that.before_point.y != y){
    	   var point = { previous:{x:that.before_point.x, y:that.before_point.y}, 
    	                 last:{x:x, y:y} }
    	   that.draw(point)
           that.player.socket.emit('pintar',  point)
           that.before_point.x = x
           that.before_point.y = y 
      }
   }

   //Acciones del jugador
   this.player = player
   this.player.socket.on('pintar', function(point){that.draw(point)})
   this.player.socket.on('wait', this.waiting)
   this.player.socket.on('run', this.run)
   this.player.socket.on('new_round', function(){that.new_round()})
   this.player.socket.on('rol', function(rol){that.change_rol(rol)})
   this.player.socket.on('word', function(word){$("#Drawer span").text(word)})
   this.player.socket.on('wrong_word', function(){$("#Answer").val("Error")})
   this.player.socket.on('end_game', function(){that.end_game()})
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
World.prototype.end_game = function(){
    var ENTER = 13
    var that = this
    this.end = true
    this.canvas.width = this.canvas.width
    this.ctx.font = "50px Serif"
    this.ctx.fillText("Final del juego", this.canvas.width/2-100, this.canvas.height/2)
    this.ctx.font = "20px Arial"
    this.ctx.fillText("Presionar enter para continuar", this.canvas.width/2-50, this.canvas.height/2+100, 400)
    window.addEventListener("keydown", function(e){
	    if(e.keyCode == ENTER && that.end){
	      that.player.socket.emit('leave_game')
	      that.finish() 
	    }
       }, false)
}

World.prototype.waiting = function(){
}
World.prototype.run = function(){
}

