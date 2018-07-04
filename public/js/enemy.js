function Enemy(ctx) {
  this.ctx = ctx;
  this.x = config.boardWidth / 2 - 25;
  this.y = config.boardHeight;
  this.width = 80;
  this.height = 487;
  this.speed = 5;
  this.growing = true;
  this.xRandom = undefined;
  this.completeCycle = undefined;
  //Sprite
  this.sarlaccImg = new Image();
  this.sarlaccImg.src = 'assets/sarlacc-sprite.png';
  this.sourceX = 10;
  this.sourceY = 8;
  this.sourceWidth = 100;
  this.sourceHeight = 506;
  this.currentFrame = 0;
  this.frameCount = 5;
  this.updateFrameEnemy();
};

Enemy.prototype.drawEnemy = function () {
  this.ctx.drawImage(this.sarlaccImg, this.sourceX, this.sourceY, this.sourceWidth, this.sourceHeight, this.x, this.y, this.width, this.height);
  if (this.completeCycle === false) {
    this.x = Math.floor(Math.random() * (config.boardWidth - this.width));
  };
};

Enemy.prototype.updateFrameEnemy = function () {
  clearInterval(this.intervalPlayer);
  this.intervalPlayer = setInterval(function () {
    this.currentFrame = ++this.currentFrame % this.frameCount;
    this.sourceX = this.currentFrame * this.sourceWidth;
  }.bind(this), 100);
};

Enemy.prototype.tentacleAppears = function (player) {
  var maxHeight = player.y + 30;
  var minY = config.boardHeight;
  if (this.y > maxHeight && this.growing) {
    this.y -= this.speed;
    this.completeCycle = true;
  } else {
    this.y += this.speed;
    this.growing = false;
    if (this.y > minY) {
      this.growing = true;
      this.completeCycle = false;
    };
  };
};