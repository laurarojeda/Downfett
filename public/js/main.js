window.onload = function () {
  var canvas = document.getElementById('game-board');
  var ctx = canvas.getContext('2d');
  var game = new Game({
    ctx: ctx
  });
  game.controls();
  game.start();
} 