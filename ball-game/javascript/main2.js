window.addEventListener("load", eventWindowLoaded, false)
var canvas  = null
var context = null
function eventWindowLoaded(){
    canvasApp()
}
function canvasApp(){
   canvas = document.getElementById("canvas")
   context = canvas.getContext("2d")
   context.transform(1,0,0,-1,150,300)
   enableInputs()
   go()
}
var yspeed  = 30
var ball = {y:10, x:10, radius:10, nexty:null, nextx:null, stop_x:false, stop_y:false, mass:10}
var target = {y:70, x:10, radius:10}
var xspeed  = 90
var gravity = -0.985
//hacer un vector
var angle = 80
var radians = angle * Math.PI/180
//calcular los pixeles
xspeed = Math.cos(radians) * xspeed
yspeed = Math.sin(radians) * yspeed
var mousex = null
var mousey = null
var pressx = null
var pressy = null
var shoot = false
var phi = null 
var squeare = {x: -100 ,y: 10, lado: 20, mass:20}
function drawScreen(){

    //context.save()
    //Limpia el canvas
    //context.fillStyle = '#EEEEEE'
    //context.fillRect(-150, 0, canvas.width, canvas.height)
    context.clearRect(-150,0,300,300)

    //Dibuja el circulo
    context.beginPath()
    //context.strokeStyle = "black"
    context.fillStyle  = '#000000'
    //context.lineWidth = 5
    context.arc(ball.x, ball.y, ball.radius+2, (Math.PI/180)*0, (Math.PI/180)*360, false)

    //full circle
    //context.stroke()
    context.fill()
    context.closePath()
    //context.restore()
    context.fillText('power: '+power,-100,40);

    context.fillRect(squeare.x, squeare.y, squeare.lado, squeare.lado)
    context.beginPath()
    context.strokeStyle = "black"
    context.arc(target.x, target.y, target.radius, (Math.PI/180)*0, (Math.PI/180)*360, false)
    context.stroke()
    context.closePath()
}

function updatePhisics(){
   yspeed += gravity
   ball.nexty = ball.y + yspeed
   ball.nextx = ball.x + xspeed
   //yspeed += gravity
   if (ball.nextx > (canvas.width/2 + (ball.radius+2))|| 
	   ball.nextx < (-canvas.width/2 + (ball.radius+2)) ) {
       //angle = 180 - angle;
       xspeed *= -1
       //updateBall();
   } 
   //se queda infinitamente en este if -V
   if (ball.nexty > canvas.height){
       yspeed *= -1
   }
   if(ball.nexty <= (ball.radius+2)) {
      if(yspeed < 0)
         yspeed *= -1
      if(xspeed < 0)
       xspeed +=  0.1
      else
       xspeed -=  0.1
   }
   if(xspeed < 0.3 && xspeed > -1){
       xspeed = 0
       ball.stop_x = true
   }
   if(ball.nexty < ball.radius+2 && yspeed < 1 && yspeed > -1){
       ball.nexty = 0 + ball.radius+2
       yspeed = 0
       ball.stop_y = true
   }


   ball.y = ball.nexty
   ball.x = ball.nextx
}

function updateBall() {
    radians = angle * Math.PI/ 180
    xunits = Math.cos(radians) * xspeed
    yunits = Math.sin(radians) * yspeed
}

var winer = false
function win(){
    var dx = ball.nextx - target.x
    var dy = ball.nexty - target.y
    var distance = (dx * dx + dy * dy)
    if (distance <= (ball.radius + target.radius) *
	    (ball.radius + target.radius) ) {
	winer = true
    }
}

function collision(){
    var dx = ball.nextx - squeare.x;
    var dy = ball.nexty - squeare.y;

    var collisionAngle = Math.atan2(dy, dx);

    var speed1 = Math.sqrt(xspeed * xspeed +
	    yspeed * yspeed);
    //var speed2 = Math.sqrt(ball2.velocityx * ball2.velocityx +
	    //ball2.velocityy * ball2.velocityy);

    var direction1 = Math.atan2(yspeed, xspeed);
   // var direction2 = Math.atan2(ball2.velocityy, ball2.velocityx);

    var velocityx_1 = speed1 * Math.cos(direction1 - collisionAngle);
    var velocityy_1 = speed1 * Math.sin(direction1 - collisionAngle);
   // var velocityx_2 = speed2 * Math.cos(direction2 - collisionAngle);
    //var velocityy_2 = speed2 * Math.sin(direction2 - collisionAngle);

    var final_velocityx_1 = ((ball.mass - squeare.mass) * velocityx_1 +
	    (squeare.mass + squeare.mass) * 0)/(ball.mass + squeare.mass);
    //var final_velocityx_2 = ((ball.mass + ball.mass) * velocityx_1 +
	    //(ball2.mass - ball.mass) * velocityx_2)/(ball1.mass + ball2.mass);

    var final_velocityy_1 = velocityy_1;
    //var final_velocityy_2 = velocityy_2;

    xspeed = Math.cos(collisionAngle) * final_velocityx_1 +
	Math.cos(collisionAngle + Math.PI/2) * final_velocityy_1;
    yspeed = Math.sin(collisionAngle) * final_velocityx_1 +
	Math.sin(collisionAngle + Math.PI/2) * final_velocityy_1;
    //ball2.velocityx = Math.cos(collisionAngle) * final_velocityx_2 +
	//Math.cos(collisionAngle + Math.PI/2) * final_velocityy_2;
    //ball2.velocityy = Math.sin(collisionAngle) * final_velocityx_2 +
	//Math.sin(collisionAngle + Math.PI/2) * final_velocityy_2;

    ball.nextx = (ball.nextx += xspeed);
    ball.nexty = (ball.nexty += yspeed);
    //ball2.nextx = (ball2.nextx += ball2.velocityx);
    //ball2.nexty = (ball2.nexty += ball2.velocityy);
}

function impact(){
    var cdx=Math.abs(ball.nextx-squeare.x-squeare.lado/2);
    var cdy=Math.abs(ball.neyty-squeare.y-squeare.lado/2);

    //if(cdx>(squeare.lado/2+ball.radius)) 
    //if(cdy>(squeare.lado/2+ball.radius)) return false;

    if(cdx<=(squeare.lado/2+ball.radius) || cdy<=(squeare.lado/2+ball.radius)) collision()

    //var distancia=Math.pow(cdx-rec.get("ancho")/2,2)+Math.pow(cdy-rec.get("alto")/2,2);
    //return (distancia<=Math.pow(this.radio,2));
}

var power;
function user_move(){

yspeed  = power
xspeed  = power
//hacer un vector
//calcular los pixeles
radians = angle * Math.PI/180
xspeed = Math.cos(radians) * xspeed
yspeed = Math.sin(radians) * yspeed
ball.stop_y = false
ball.stop_x = false
    gameLoop()
    go()
}

function gameLoop(){
    if( ball.stop_y && ball.stop_x )
	go()
    requestAnimationFrame(gameLoop)

    updatePhisics()
    impact()
    win()
    drawScreen()
    if(winer)
	alert("Winer")
}

function enableInputs(){
    document.addEventListener('mousemove',function(evt){
	    mousex=evt.pageX-canvas.offsetLeft
	    mousey=evt.pageY-canvas.offsetTop
	    },false)
    canvas.addEventListener('mouseup',function(evt){
	    shoot = true
	    var x = (mousex - pressx)
	    var y = (mousey - pressy)
	    angle = ((Math.atan2(y,x)) * 360)/(2*Math.PI)
	    if(y<0)
	       angle += 360
	    //if(x < 0)
	      // x *= -1
	    //if(y < 0)
	      // x *= -1
	    if(x >= 50 || y >= 50)
	        power = 50
		else
	          if(x>y)
		     power = x
		     else
		       power = y
	    },false)
    canvas.addEventListener('mousedown',function(evt){
	    evt.preventDefault()
	    pressx = mousex
	    pressy = mousey
	    },false)
}
function go(){
    drawScreen()
   if(!shoot)
      setTimeout(go, 120)
   else{
   shoot  = false
   user_move()
   } 
}

