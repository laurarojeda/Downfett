function Enemy(ctx) {
  this.ctx = ctx;
  this.x = config.boardWidth / 2 - 25 //--> random en el futuro
  this.y = config.boardHeight
  this.width = 50;
  this.height = 0;
  this.speed = 5;
  this.growing = true;
  this.xRandom = undefined;
  this.completeCycle = undefined;
  this.score = 0;
};

Enemy.prototype.drawEnemy = function () {
  this.grd = this.ctx.createLinearGradient(0, 600, 0, 0);
  this.grd.addColorStop(0, '#4d0000');
  this.grd.addColorStop(1, '#00802b');
  this.ctx.fillStyle = this.grd;
  this.ctx.fillRect(this.x, this.y - this.height, this.width, this.height);

  if (this.completeCycle === false) {
    this.randomEnemy()
    this.x = this.xRandom;
  }
};

Enemy.prototype.tentacleAppears = function (player) {
  if (this.height < config.boardHeight - player.y - 25 && this.growing) {
    this.height += this.speed;
    this.completeCycle = true;
    if (this.height === 0) { this.score++ }
    //console.log(this.height)
  } else {
    this.growing = false;
    this.height -= this.speed;
    if (this.height < 0) {
      this.completeCycle = false;
      this.growing = true;
    }
  }
};

Enemy.prototype.randomEnemy = function () {
  this.xRandom = Math.floor(Math.random() * (config.boardWidth - this.width))
};

