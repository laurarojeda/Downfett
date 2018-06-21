function Bullet(ctx, player) {
  this.ctx = ctx;
  this.x = player.x;
  this.y = player.y;
  this.speed = 1;
  this.gravity = 1;
}

Bullet.prototype.drawShot = function () {
  this.grd = this.ctx.createLinearGradient(0, 350, 0, 0);
  this.grd.addColorStop(0, 'red');
  this.grd.addColorStop(1, 'orange');
  this.ctx.fillStyle = this.grd;
  this.ctx.fillRect(this.x, this.y, 8, 18);
};

Bullet.prototype.moveBullet = function () {
  this.speed += this.gravity;
  this.y += this.speed;
};
