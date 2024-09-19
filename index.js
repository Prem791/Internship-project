function randomNumber(){
    var num = Math.random();
    num *= 4;
    num = Math.floor(num);
    return num;
}
var buttonColour = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var gamePattern = [];
var level=0;
started=false;
var i=0;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

function nextSequence(){
    level++;
    $("h1").text("Level "+level);
    setTimeout(function(){
        randomChosenColor = buttonColour[randomNumber()];
        gamePattern.push(randomChosenColor);
        $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
        var audio = new Audio("./sounds/"+randomChosenColor+".mp3");
        audio.play();
    }, 500);
    i = 0;
}
function gameOver(){
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");

    level = 0;
    gamePattern = [];
    started = false;
    i=0;
}

$(".btn").on("click", function(){
    $(this).fadeOut(100).fadeIn(100);
    userInput =  $(this).attr("id");
    var audio = new Audio("./sounds/"+userInput+".mp3");
    audio.play();
    if(userInput===gamePattern[i]){
        i++;
        if(i===gamePattern.length){
            nextSequence();
        }
    }else{
        gameOver();
    }
});