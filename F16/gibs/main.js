var myAudio = new Audio("sadViolin.mp3")
myAudio.loop = true;
myAudio.play();

var slideIndex = 0;
play();

function play() {
    var interval = 10000;
    var i;
    var x = document.getElementsByClassName("slide");
    var y = document.getElementsByClassName("caption");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
        y[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > x.length) {
        slideIndex = 1
    }
    if (slideIndex == x.length) {
        interval = 100;
    }
    x[slideIndex - 1].style.display = "block";
    y[slideIndex - 1].style.display = "block";
    setTimeout(play, interval); // Change image every 2 seconds
}