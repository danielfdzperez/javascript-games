function World(id){
    this.canvas = document.getElementById(id)
    this.ctx    = this.canvas.getContext("2d")
    this.players          = []
    this.attack_enemies   = []
    this.explosions       = []
    this.background = new Background()
    this.background.load_tiles()
}

World.prototype.new_player = function(x, y, src, sx, sy, ax, ay){
    this.players.push(new Player(x, y, src, sx, sy, ax, ay))
}

World.prototype.new_attack_enemy = function(x, y, src, sx, sy, ax, ay){
    this.attack_enemies.push(new Attack_enemy(x, y, src, sx, sy, ax, ay))
}

World.prototype.new_explosion = function(){
    this.explosions.push()
}

World.prototype.refresh_graphics = function(){

   this.ctx.clearRect(0, 0, 500, 500)
   this.background.draw(this.ctx)
   for(var i=0; i<this.players.length; i++)
       this.players[i].draw(this.ctx)
   for(var i=0; i<this.attack_enemies.length; i++)
       this.attack_enemies[i].draw(this.ctx)
}

World.prototype.update_physics = function(){
    for(var i=0; i<this.players.length; i++){
       this.players[i].update_physics()
   for(var i=0; i<this.attack_enemies.length; i++)
       this.attack_enemies[i].update_physics()
       //for(var j=0; j<this.players.length; j++)
       //    if(j != i)
       //       if(this.players[i].collision(this.players[j]))
    }
}

World.prototype.events = function(events){
    if(87 == events.last_key || 38 == events.last_key || 83 == events.last_key || 40 == events.last_key || 
       65 == events.last_key || 37 == events.last_key || 68 == events.last_key || 39 == events.last_key){
           this.players[0].action(events)
    }
}
