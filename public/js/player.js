function Player(ctx) {
  this.ctx = ctx;
  this.x = config.boardWidth / 2 - 28
  this.y = config.boardHeight / 5
  this.limitRight = config.boardWidth - 56
  this.limitleft = 1.5
  this.width = 50
  this.height = 56
  this.xSpeed = 0;
  this.movement = 4;
  this.gravity = 0.01;
  this.isMoving = false;
  this.direction = undefined;
  this.bobaImg = new Image();
  this.bobaImg.src = 'assets/boba.png';
  this.life = 3;
};

Player.prototype.drawPlayer = function () {
  this.ctx.drawImage(this.bobaImg, 0, 0, 102, 120, this.x, this.y, this.width, this.height)
};


Player.prototype.activeMove = function () {
  this.isMoving = true;
  this.xSpeed = this.movement;
};

Player.prototype.movePlayer = function () {
  if (this.isMoving === true && this.direction === 'right') {
    if (this.x <= this.limitRight) {
      this.xSpeed += this.gravity;
      this.x += this.xSpeed;
    } else {
      this.x = this.limitRight + 6; //evita que salga por la derecha
    }
  }
  if (this.isMoving === true && this.direction === 'left') {
    if (this.x >= this.limitleft) {
      this.xSpeed -= this.gravity;
      this.x -= this.xSpeed;
    } else {
      this.x = 0; //evita que salga por la izquierda
    }
  }
};

Player.prototype.drawLife = function () {
  this.ctx.font = '30px impact';
  this.ctx.fillStyle = 'black';
  this.ctx.fillText(this.life, config.boardWidth - 40, 45);
}

// Player.prototype.playerDead = function() {
//   https://www.w3schools.com/graphics/tryit.asp?filename=trygame_gravity_bottom
// };
