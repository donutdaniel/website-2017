var count = 10;

function updateDonut(){
    count++;
    document.getElementById("count").innerHTML = count;
}

$("#donut").on("click", updateDonut);