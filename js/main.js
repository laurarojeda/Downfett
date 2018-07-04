window.onload = function () {
  var ctx = document.getElementById('game-board').getContext('2d');
  var isMusicOn = true;
  var areSoundEffectsOn = true;
  var game = new Game({
    ctx: ctx,
    isMusicOn: isMusicOn,
    areSoundEffectsOn: areSoundEffectsOn,
  });

  introGame.play();
  game.isMusicOn = true;
  game.areSoundEffectsOn = true;

  $("#start-btn").on("click", function () {
    $(".menu").toggle();
    $("canvas").toggle();
    introGame.pause();
    game.controls();
    game.start();
  });

  $("#instructions-btn").on("click", function () {
    $("#instructions-content").toggle();
  });
  $(".close-left").on("click", function () {
    $(".pop-up-left").toggle();
  });

  $("#options-btn").on("click", function () {
    $("#options-content").toggle();
  });
  $(".close-right").on("click", function () {
    $(".pop-up-right").toggle();
  });


  $("#music-btn").on("click", function () {
    $(this).toggleClass("red-large-btn");
    if ($(this).text() === "Music On") {
      $(this).text("Music Off");
      introGame.pause();
      game.isMusicOn = false;
    } else {
      $(this).text("Music On");
      introGame.play();
      game.isMusicOn = true;
    };
  });

  $("#sound-effects-btn").on("click", function () {
    $(this).toggleClass("red-large-btn");
    if ($(this).text() === "Sounds On") {
      $(this).text("Sounds Off");
      game.areSoundEffectsOn = false;
    } else {
      $(this).text("Sounds On");
      game.areSoundEffectsOn = true;
    };
  });

  $('#try-again-btn').on('click', function () {
    window.location.reload();
  });
};