var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;  // The game is NOT started yet, by default

$(document).keydown(function() {
  if (!started){        // If started is NOT FALSE anymore
    $("#level-title").text("Level " + level);
    nextSequence();        // We run the function, and the game starts
    started = true;
  }
  });

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");  
    userClickedPattern.push(userChosenColor);
   
    playSound(userChosenColor);
    
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {      //To check if the userClickedPattern array === gamePattern array at the GIVEN LEVEL
    if (userClickedPattern.length === gamePattern.length ) {                 //This is just to check if the SEQUENCE completed of not
      setTimeout(nextSequence(), 1000);
    }
  
  } else {
      playSound("wrong");
  
      $("body").addClass("game-over");
           setTimeout(function () {
      $("body").removeClass("game-over");
        }, 200);
      
      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();
    }
    }


function nextSequence() {
  userClickedPattern = [];                            // To ZERO OUT the userClickedPattern array at the beginning of the NEW LEVEL

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

};


function startOver() {
  gamePattern = [];
  level = 0;
  started = false;
}


function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}


function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");         
       sound.play();
};