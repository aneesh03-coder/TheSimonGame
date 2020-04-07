// alert("Hell! It is working!");


var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started = false;

$(document).keydown(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function nextSequence(){
userClickedPattern=[];
  level++;
    $("#level-title").text("Level " + level);
  var randomNumber=Math.floor(Math.random()*4);
  // console.log(randomNumber);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  var randomChosenColourElement="#"+randomChosenColour;
  $(randomChosenColourElement).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosenColour);




}
$(".btn").click(function(event){
   // console.log(event.toElement.id);
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playsound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  console.log(userClickedPattern);
});

function playsound(musicToPlay){
  var audio= new Audio("sounds/"+musicToPlay+".mp3");
  audio.play();

}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
$("#"+currentColour).removeClass("pressed");

},100);
}


function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    console.log("success");
    if((currentLevel+1)===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
      userClickedPattern=[];
    }
    else{

    }
  }
  else{
    playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    console.log("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level=0;
  gamePattern=[];

  started=false;
}
