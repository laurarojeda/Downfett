function Munition(ctx) {
  this.ctx = ctx;
  this.x = 100;
  this.y = -100;
  this.width = 18;
  this.height = 27;
  this.speed = 2;
  //Sprite
  this.munitionImg = new Image();
  this.munitionImg.src = 'assets/mun-sprite.png';
  this.sourceX = 5;
  this.sourceY = 5;
  this.sourceWidth = 70;
  this.sourceHeight = 110;
  this.currentFrame = 0;
  this.frameCount = 2;
  this.updateFrameMunition();
};

Munition.prototype.drawMunition = function () {
  this.ctx.drawImage(this.munitionImg, this.sourceX, this.sourceY, this.sourceWidth, this.sourceHeight, this.x, this.y, this.width, this.height);
};

Munition.prototype.updateFrameMunition = function () {
  clearInterval(this.intervalMunition);
  this.intervalMunition = setInterval(function () {
    this.currentFrame = ++this.currentFrame % this.frameCount;
    this.sourceX = this.currentFrame * this.sourceWidth;
  }.bind(this), 500);
};

Munition.prototype.moveMunition = function () {
  this.y += this.speed;
};