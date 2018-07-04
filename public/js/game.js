function Game(options) {
  this.ctx = options.ctx;
  this.isMusicOn = options.isMusicOn;
  this.areSoundEffectsOn = options.areSoundEffectsOn;
  this.player = new Player(options.ctx);
  this.background = new Background(options.ctx);
  this.enemy = new Enemy(options.ctx);
  this.intervalGame = undefined;
  this.intervalTimer = undefined;
  this.isPlayerDead = false;
  this.timerScore = 220;
  this.progressBar = 220;
  this.timeInGame = 0;
  this.bulletArray = [];
  this.bulletCount = 3;
  this.isBulletImpact = true;
  this.munitionArray = [];
  this.munitionXRandom = undefined;
  this.munitionCount = 0;
  this.canCreateNewMunition = false;
  this.shotImpactCount = 0;
  this.isGamePaused = false;
  this.isGameOver = false;
};

Game.prototype.controls = function () {
  document.addEventListener('keydown', function (e) {
    event.preventDefault();
    switch (e.keyCode) {
      case 68: //D = right
        this.player.direction = 'right';
        this.player.activeMove();
        break;
      case 65: //A = left
        this.player.direction = 'left';
        this.player.activeMove();
        break;
      case 27: //ESC = pause
        this.isGamePaused = !this.isGamePaused;
        if (!this.isGamePaused) {
          this.start();
          this.player.updateFramePlayer();
        } else {
          this.pause();
        }
        break;
    }
  }.bind(this));

  document.addEventListener('keyup', function (e) {
    event.preventDefault();
    switch (e.keyCode) {
      case 32: //Space = shot
        this.createNewBullet(this.bulletCount);
        break;
      case 68: //D
        this.player.isMoving = false;
        break;
      case 65: //A
        this.player.isMoving = false;
        break;
    }
  }.bind(this));
};

Game.prototype.increaseDifficulty = function () {
  this.enemy.speed += this.shotImpactCount;
};

Game.prototype.collisionWith = function (elementA, elementB) {
  var aLeft = elementA.x;
  var aRight = elementA.x + elementA.width;
  var aTop = elementA.y;
  var aBottom = elementA.y + elementA.height;

  var bLeft = elementB.x;
  var bRight = elementB.x + elementB.width;
  var bTop = elementB.y;
  var bBottom = elementB.y + elementB.height;
  var crash = true;
  if ((aBottom < bTop) || (aTop > bBottom) || (aRight < bLeft) || (aLeft > bRight)) {
    crash = false;
  };
  return crash;
};

//Bullets
Game.prototype.createNewBullet = function (bulletCount) {
  if (this.bulletArray.length < bulletCount) {
    this.bulletArray.push(new Bullet(this.ctx, this.player));
    this.bulletCount--;
  }
};

Game.prototype.controlBullet = function () {
  this.bulletArray.forEach(function (bullet, index) {
    bullet.drawShot();
    if (this.areSoundEffectsOn) { shot.play(); };
    bullet.moveBullet();
    if (this.collisionWith(this.enemy, bullet)) {
      this.bulletArray.splice(index, 1);
      if (this.areSoundEffectsOn) { sarlaccHowl.play(); };
      this.shotImpactCount += 0.01;
      this.timerScore++;
      this.increaseDifficulty();
    }
    if (bullet.y >= config.boardHeight) {
      this.bulletArray.splice(index, 1);
      shot.pause();
    }
  }.bind(this));
};

//Munition
Game.prototype.createNewMunition = function () {
  if (!this.isGameOver) {
    if (!this.isPlayerDead && this.munitionArray.length < 1) {
      this.munitionArray.push(new Munition(this.ctx));
      this.canCreateNewMunition = true;
    } else {
      this.canCreateNewMunition = false;
    };
  };
};

Game.prototype.controlMunition = function () {
  if (!this.isGameOver) {
    this.munitionArray.forEach(function (munition, index) {
      if (this.canCreateNewMunition) {
        munition.x = Math.floor(Math.random() * (config.boardWidth - munition.width));
      };
      munition.drawMunition();
      munition.moveMunition();
      if (this.collisionWith(this.player, munition)) {
        this.munitionArray.splice(index, 1);
        if (this.areSoundEffectsOn) { reloadWeapon.play() };
        //for each munition, 3 bullets
        this.bulletCount += 3;
        this.munitionCount++;
        if (!this.timerScore === 220) { this.timerScore += 5 };
      };
      if (this.collisionWith(this.enemy, munition)) {
        this.munitionArray.splice(index, 1);
        this.timerScore -= 5;
      };
      if (munition.y >= config.boardHeight) {
        this.munitionArray.splice(index, 1);
      };
    }.bind(this));
  }
};

//NOTE: collisions
Game.prototype.checkCollisions = function () {
  if (this.collisionWith(this.enemy, this.player) && this.player.life > 0) {
    if (this.areSoundEffectsOn) { bobaYell.play() };
    this.player.life -= 2;
    this.timerScore--;
  };
  if (this.player.life <= 0) {
    this.isGameOver = true;
    this.isPlayerDead = true;
    this.player.life = 0;
  };
};

//NOTE: game over, pause, intervals, score...
Game.prototype.drawTimer = function () {
  this.ctx.fillStyle = '#cc0000';
  this.ctx.fillRect(20, 28, this.progressBar, 15);
  this.ctx.fillStyle = '#880000';
  this.ctx.fillRect(20, 28, this.timerScore, 15);
  this.ctx.strokeStyle = '#000000';
  this.ctx.strokeRect(20, 28, this.progressBar, 15);
}

Game.prototype.timerCount = function () {
  this.intervalTimer = setInterval(function () {
    if (!this.isGameOver) {
      this.timerScore -= 2;
      this.timeInGame++;
    }
  }.bind(this), 500);
};

Game.prototype.drawGameOver = function () {
  this.ctx.font = '50px starjedi';
  this.ctx.fillStyle = '#000000';
  this.ctx.textAlign = 'center';
  this.ctx.fillText('game over', 200, 140);
};

Game.prototype.drawResults = function () {
  var time = this.timeInGame * 2;
  var life = this.player.life;
  var impacts = Math.round(this.shotImpactCount * 100);
  var munition = this.munitionCount;
  var totalScore = time + life + impacts + munition;

  this.ctx.font = '20px impact';
  this.ctx.fillStyle = '#000000';
  this.ctx.textAlign = 'center';
  this.ctx.fillText('Life: ' + life, 200, 190);
  this.ctx.fillText('Shots: ' + impacts, 200, 230);
  this.ctx.fillText('Munition: ' + munition, 200, 270);
  this.ctx.fillText('Time: ' + time + ' sec', 200, 310);
  this.ctx.fillText('Total score: ' + totalScore, 200, 360);
};

Game.prototype.gameOver = function (munition) {
  if (this.isPlayerDead || this.timerScore <= 0) {
    this.isGameOver = true;
    this.canCreateNewMunition = false;
    clearInterval(this.intervalTimer);
    clearInterval(this.player.intervalPlayer);
    this.drawGameOver();
    this.drawResults();
    this.player.playerDead();
    this.enemy.y = config.boardHeight;
    this.background.stopMovePattern();
    soundInGame.pause();
    shot.pause();
    if (this.isMusicOn) { endingGame.play(); };
    $('#end-game').css('display', 'inline');
  }
};

Game.prototype.pause = function () {
  window.cancelAnimationFrame(this.intervalGame);
  clearInterval(this.player.intervalPlayer);
  soundInGame.pause();
  shot.pause();

  this.ctx.font = '50px starjedi';
  this.ctx.fillStyle = '#000000';
  this.ctx.textAlign = 'center';
  this.ctx.fillText('Pause', 200, 230);
};

Game.prototype.eraseCanvas = function () {
  this.ctx.clearRect(0, 0, config.boardWidth, config.boardHeight);
};

Game.prototype.update = function () {
  this.eraseCanvas();
  this.background.movePattern();
  this.checkCollisions();
  this.enemy.drawEnemy();
  this.player.drawPlayer();
  this.player.movePlayer();
  this.enemy.tentacleAppears(this.player);
  this.createNewMunition();
  this.controlMunition();
  this.player.drawLife();
  this.drawTimer();
  this.controlBullet();
  this.gameOver();
  this.intervalGame = window.requestAnimationFrame(this.update.bind(this));
};

Game.prototype.start = function () {
  this.update();
  if (this.isMusicOn) { soundInGame.play() };
  if (this.timerScore === this.progressBar && !this.isGameOver) {
    this.timerCount();
  };
};