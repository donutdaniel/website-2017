var pointsData = firebase.database().ref();
var points = [];
var canvas;
var selectPaint = 0;
var aniEnable = false;
var lineX, lineY;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    background(255);
    fill(0);
    lineX = width / 2;
    lineY = height / 2;
    pointsData.on("child_added", function(point) {
        points.push(point.val());
    })
    canvas.mousePressed(drawPoint);
    canvas.mouseMoved(drawPointIfMousePressed);
}

function draw() {
    background(255);
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        if (selectPaint === 0) {
            noStroke();
            ellipse(point.x, point.y, 3, 3);
        }
        else if (selectPaint === 1) {
            if (keyIsDown(SHIFT)) {
                lineX = mouseX;
                lineY = mouseY;
            }
            stroke(0);
            strokeWeight(0.2);
            line(point.x, point.y, lineX, lineY);
        }
    }
    if (aniEnable) {
        animate();
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

$("#animate").on("click", function() {
    if (aniEnable) {
        aniEnable = false;
    }
    else {
        aniEnable = true;
    }
    for (var i = 0; i < points.length; i++) {
        points[i].velocityX = (Math.random() * 4) - 2;
        points[i].velocityY = (Math.random() * 4) - 2;
    }
})

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
    aniEnable = false;
    pointsData.remove();
    points = [];
}

function animate() {
    for (var i = 0; i < points.length; i++) {
        points[i].x += points[i].velocityX;
        points[i].y += points[i].velocityY;
        for (var n = 0; n < points.length; n++) {
            if (n != i) {
                var dis = dist(points[i].x, points[i].y, points[n].x, points[n].y);
                if (dis < 100) {
                    stroke(0);
                    strokeWeight(0.1);
                    line(points[i].x, points[i].y, points[n].x, points[n].y);
                }
            }
        }
    }
}
