function Player(ctx) {
  this.ctx = ctx;
  this.x = config.boardWidth / 2 - 28
  this.y = config.boardHeight / 5
  this.limitRight = config.boardWidth - 56;
  this.limitleft = 1.5;
  this.limitBottom =
    this.width = 50;
  this.height = 56;
  this.xSpeed = 4;
  this.xGravity = 0.01;
  this.isMoving = false;
  this.direction = undefined;
  this.ySpeed = 0;
  this.yGravity = 0.05;
  this.life = 100;
  //Sprite
  this.bobaImg = new Image();
  this.bobaImg.src = 'assets/boba-sprite.png';
  this.sourceX = 5;
  this.sourceY = 5;
  this.sourceWidth = 106;
  this.sourceHeight = 120;
  this.currentFrame = 0;
  this.frameCount = 3;
  this.updateFramePlayer();
};

Player.prototype.drawPlayer = function () {
  this.ctx.drawImage(this.bobaImg, this.sourceX, this.sourceY, this.sourceWidth, this.sourceHeight, this.x, this.y, this.width, this.height);
};

Player.prototype.updateFramePlayer = function () {
  clearInterval(this.intervalPlayer);
  this.intervalPlayer = setInterval(function () {
    this.currentFrame = ++this.currentFrame % this.frameCount;
    this.sourceX = this.currentFrame * this.sourceWidth;
  }.bind(this), 100);
};


Player.prototype.activeMove = function () {
  this.isMoving = true;
};

Player.prototype.movePlayer = function () {
  if (this.isMoving && this.direction === 'right') {
    if (this.x < this.limitRight) {
      this.xSpeed += this.xGravity;
      this.x += this.xSpeed;
    } else {
      this.x = this.limitRight + 6;
    };
  };
  if (this.isMoving && this.direction === 'left') {
    if (this.x > this.limitleft) {
      this.xSpeed -= this.xGravity;
      this.x -= this.xSpeed;
    } else {
      this.x = 0;
    };
  };
};

Player.prototype.drawLife = function () {
  this.ctx.fillStyle = '#00b359';
  this.ctx.fillRect(config.boardWidth - 120, 28, 100, 15);
  this.ctx.fillStyle = '#006633';
  this.ctx.fillRect(config.boardWidth - 120, 28, this.life, 15);
  this.ctx.strokeStyle = '#000000';
  this.ctx.strokeRect(config.boardWidth - 120, 28, 100, 15);
};

Player.prototype.playerDead = function () {
  this.ySpeed += this.yGravity;
  this.y += this.ySpeed;
  if (this.y > config.boardHeight - this.height - 1) {
    this.y = config.boardHeight - this.height + 2;
    this.isMoving = false;
    this.xSpeed = 0;
  };
};