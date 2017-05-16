var count = 1;
var increment = 1;
var multiplier = 1;

function updateDonut(){
    count=count+(increment*multiplier);
    document.getElementById("count").innerHTML = Math.round(count);
}

function increaseMultiplier(){
    multiplier=multiplier+.5;
    document.getElementById("mutliplier").innerHTML = multiplier;
}

function increaseIncrement(){
    increment++;
    document.getElementById("increment").innerHTML = increment;
}

setInterval(updateDonut,1000);

$("#incI").on("click", increaseIncrement);
$("#incM").on("click", increaseMultiplier);
$("#donut").on("click", updateDonut);