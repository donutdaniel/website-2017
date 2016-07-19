var thatWasEasy = new Audio("that_was_easy.mp3");

function sayThatWasEasy(){
    thatWasEasy.play();
}
$("#easy").on("click", sayThatWasEasy);