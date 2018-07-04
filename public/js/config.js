var config = {
  boardWidth: 400,
  boardHeight: 640,
};

//Music
var introGame = new Audio(); introGame.src = 'music/star-wars-intro.mp3'; introGame.volume = 0.1;
var soundInGame = new Audio(); soundInGame.src = 'music/cantina-theme.mp3'; soundInGame.loop = true; soundInGame.volume = 0.1;
var endingGame = new Audio(); endingGame.src = 'music/star-wars-ending.mp3'; endingGame.volume = 0.2;
//Sounds
var sarlaccHowl = new Audio(); sarlaccHowl.src = 'music/sarlacc.mp3'; sarlaccHowl.volume = 1;
var bobaYell = new Audio(); bobaYell.src = 'music/bobaYell.mp3'; bobaYell.volume = 1;
var shot = new Audio(); shot.src = 'music/blaster.mp3'; shot.volume = 1;
var reloadWeapon = new Audio(); reloadWeapon.src = 'music/reload-weapon.mp3'; reloadWeapon.volume = 0.1;