var pointsData = firebase.database().ref();
var points = [];
var canvas;
var selectPaint = 0;

var lineX, lineY;

function setup() {
    canvas = createCanvas(windowWidth,windowHeight);
    background(255);
    fill(0);
    lineX = width / 2;
    lineY = height / 2
    pointsData.on("child_added", function(point) {
        points.push(point.val());
    })
    canvas.mousePressed(drawPoint);
    canvas.mouseMoved(drawPointIfMousePressed);
    frameRate(200);
}

function draw() {
    background(255);
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        if (selectPaint === 0) {
            ellipse(point.x, point.y, 5, 5);
            ellipse(point.x, point.y, 5, 5);
            ellipse(point.x, point.y, 5, 5);
        }
        else if (selectPaint === 1) {
            if (keyIsDown(SHIFT)) {
                lineX=mouseX;
                lineY=mouseY;
            }
                line(point.x, point.y, lineX, lineY);
        }
    }
}

function drawPoint() {
    pointsData.push({
        x: mouseX,
        y: mouseY
    });
}

function drawPointIfMousePressed() {
    if (mouseIsPressed) {
        drawPoint();
    }
}

$("#saveDrawing").on("click", saveDrawing);
$("#clearDrawing").on("click", clearDrawing);
$("#dots").on("click", function() {
    selectPaint = 0;
});
$("#line").on("click", function() {
    selectPaint = 1;
});

function saveDrawing() {
    saveCanvas();
}

function clearDrawing() {
    pointsData.remove();
    points = [];
}