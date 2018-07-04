function Background(ctx) {
  this.ctx = ctx;
  this.x = config.boardWidth + 100;
  this.y = config.boardHeight + 100;
  this.widthCanvas = config.boardWidth;
  this.heightCanvas = config.boardWidth;
  this.bgSpeed = -2;
  this.area = 0;
  this.dessert = new Image();
  this.dessert.src = 'assets/sand.png';
};

Background.prototype.movePattern = function () {
  this.ctx.save();
  this.ctx.translate(this.area, this.bgSpeed * this.area);
  var pattern = this.ctx.createPattern(this.dessert, 'repeat');
  this.ctx.fillStyle = pattern;
  this.ctx.rect(0, 0, config.boardWidth, config.boardHeight);
  this.ctx.fill();
  this.ctx.restore();
  this.area++;
};

Background.prototype.stopMovePattern = function () {
  this.area = 0;
  this.bgSpeed = 0;
};