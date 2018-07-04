function Bullet(ctx, player) {
  this.ctx = ctx;
  this.x = player.x;
  this.y = player.y;
  this.width = 8;
  this.height = 8;
  this.speed = 1;
  this.gravity = 1;
};

Bullet.prototype.drawShot = function () {
  this.grd = this.ctx.createLinearGradient(0, 850, 0, 0);
  this.grd.addColorStop(0, '#FF4547');
  this.grd.addColorStop(1, '#FF4547');
  this.ctx.fillStyle = this.grd;
  this.ctx.fillRect(this.x + 3, this.y + 38, this.width, this.height);
  // this.ctx.clearRect(this.x + 5, this.y + 40, this.width - 4, this.height - 4)
};

Bullet.prototype.moveBullet = function () {
  this.speed += this.gravity;
  this.y += this.speed;
};