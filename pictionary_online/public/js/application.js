var canvas = null
var ctx = null
var clicking = false
var before = {x:null, y:null}
function init(){ 

   canvas = document.getElementById('canvas')
   ctx = canvas.getContext("2d")
   canvas.addEventListener("mousedown", click);
   canvas.addEventListener("mouseup", noclick);
   canvas.addEventListener("mouseleave", noclick);
   canvas.addEventListener("mousemove", move);
}
var socket = io();
function prueba(event){
   console.log("aa")
} 
socket.on('pintar', function(msg){
   draw(msg)
   //ctx.fillRect(msg.x,msg.y,5,5); 
});
function click(event){
   clicking = true  
   before.x = event.pageX
   before.y = event.pageY
	 //socket.emit('pintar',  {x:event.pageX, y:event.pageY})
}
function noclick(){
   clicking = false
}
function move(event){
    if(clicking){
       if(before.x != event.pageX || before.y != event.pageY){
          var point = { previous:{x:before.x, y:before.y}, last:{x:event.pageX, y:event.pageY} }
	  draw(point)
          socket.emit('pintar',  point)
          before.x = event.pageX
          before.y = event.pageY
       }
    }
}

function draw(msg){
   ctx.beginPath();
   ctx.moveTo(msg.previous.x-canvas.offsetLeft, msg.previous.y-canvas.offsetTop);
   ctx.lineTo(msg.last.x-canvas.offsetLeft, msg.last.y-canvas.offsetTop);
   ctx.stroke();
}
