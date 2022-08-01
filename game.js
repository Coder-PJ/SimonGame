var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userPattern=[];
var started=false;
var level=0;

function makesound(color){

      var audio= new Audio("sounds/"+color+".mp3");
      audio.play();

  }



function nextSequence(){
  userPattern=[];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  makesound(randomChosenColor);
}

function animatepress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function() {
       $("#"+currentColor).removeClass("pressed");
   }, 100);

}

function checkAnswer(currentlevel){
  if (gamePattern[currentlevel] === userPattern[currentlevel]) {
    console.log("success");
    if (userPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
   else {
     var audio= new Audio("sounds/wrong.mp3");
     audio.play();
     $("body").addClass("game-over");
     setTimeout(function(){
       $("body").removeClass("game-over");
     },200);
     $("#level-title").text("game over, Click Here to restart");
     //userPattern=[];
     gamePattern=[];
     started=false;
     level=0;
  }
}
$("h1").click(function(){
  if(!started){
    nextSequence();
    started=true;
  }
});

$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});


$(".btn").on("click", function () {
  userChosenColor=$(this).attr("id");
  userPattern.push(userChosenColor);
  makesound(userChosenColor);
  animatepress(userChosenColor);

  checkAnswer(userPattern.length-1);

});
