function Game(options) {
  this.ctx = options.ctx;
  this.intervalGame = undefined;
  this.player = new Player(options.ctx)
  this.background = new Background(options.ctx)
  this.enemy = new Enemy(options.ctx)
  this.score = this.enemy.score
  this.bulletArray = []
}

Game.prototype.controls = function () {
  document.addEventListener('keydown', function (e) {
    //Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.
    event.preventDefault();
    switch (e.keyCode) {
      case 68: //D = right
        this.player.direction = 'right'
        this.player.activeMove()
        break;
      case 65: //A = left
        this.player.direction = 'left'
        this.player.activeMove()
        break;
      case 32:
        if(this.bulletArray.length < 3){
          this.bulletArray.push(new Bullet(this.ctx, this.player))
        }
        break;
    }
  }.bind(this));

  document.addEventListener('keyup', function (e) {
    event.preventDefault();
    switch (e.keyCode) {
      case 68: //D
        this.player.isMoving = false
        break;
      case 65: //A
        this.player.isMoving = false
        break;
    }
  }.bind(this));
};

Game.prototype.drawScore = function () {
  this.ctx.font = '30px impact';
  this.ctx.fillStyle = 'black';
  this.ctx.fillText(this.enemy.score, 20, 45);
}

Game.prototype.controlBullet = function () {
  this.bulletArray.forEach(function(bullet, index){
    bullet.drawShot();
    bullet.moveBullet();
    if (bullet.y >= config.boardHeight){
      this.bulletArray.splice(index,1)
    }
  }.bind(this))
};

Game.prototype.eraseCanvas = function () {
  this.ctx.clearRect(0, 0, config.boardWidth, config.boardHeight);
};

Game.prototype.update = function () {
  this.eraseCanvas() //--------------->Borra canvas
  this.background.movPattern()
  this.drawScore()
  this.enemy.drawEnemy();
  this.player.drawPlayer();
  this.player.movePlayer();
  this.enemy.tentacleAppears(this.player);
  this.player.drawLife();
  this.controlBullet();
  this.intervalGame = window.requestAnimationFrame(this.update.bind(this)); //----------->Bucle principal
};

Game.prototype.start = function () {
  this.update();
};






