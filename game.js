
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var start = false;
var level = 0;

$(document).keypress(function(){
    if (!start){
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;
    }
})

$(".btn").click(function(){
    // var userChosenColor = $(this).attr("id");
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
})

function nextSequence(){
    // every time the level upgrade, reset the userClickedPattern   
    userClickedPattern = []
    level++;
    $("#level-title").text("Level " + level);

    var randomNumnber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumnber];

    gamePattern.push(randomChosenColor);
    console.log(gamePattern);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    var audio = new Audio('sounds/' + randomChosenColor + '.mp3');
    audio.play();

}

// add sound to the button
function playSound(name){
    $("#" + name).fadeOut(100).fadeIn(100);
    var color = new Audio('sounds/' + name + '.mp3');
    color.play();
}



// add animation to the button
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100); 
}

function checkAnswer(currentLevel){
    // check if the last element is equal in two arrays. As every click button will call this function, so all the elements will be checked
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log("success");
        
        // check if the user pressed all the button in the array, if yes, level +1
        if (userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();}, 1000);
        }
    }
    else {
        console.log("wrong");
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function startOver(){
    level = 0;
    gamePattern = [];
    start = false;
}