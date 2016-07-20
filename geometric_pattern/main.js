var numCircles = 12;
var circleDiameter;
var circleAIdiameter;
var circle;
var circleAI;
var blobs = [];
var speedUp;

function setup() {
    createCanvas(800, 600);
    circleDiameter = 80;
    circleAIdiameter = 30;
    circle = {
        x: width / 2,
        y: height / 2,
    }

    newCircleAI = function() {
        return {
            x: 0,
            y: 0,
            theta: (Math.random()*(2*Math.PI)),
            // move: function() {
            //     if ((circle.x - circleAI.x) > 100 || (circle.x - circleAI.x) > -100) {
            //         circleAI.x += 2;
            //     }
            //     else if ((circle.x - circleAI.x) < -100 || (circle.x - circleAI.x) < 100) {
            //         circleAI.x -= 2;
            //     }
            //     if ((circle.y - circleAI.y) > 100 || (circle.y - circleAI.y) > -100) {
            //         circleAI.y += 2;
            //     }
            //     else if ((circle.y - circleAI.y) < -100 || (circle.y - circleAI.y) < 100) {
            //         circleAI.y -= 2;
            //     }
            // },
            orbit: function() {
                this.theta += 0.001;
                this.x = circle.x + (Math.cos(this.theta) * 100);
                this.y = circle.y + (Math.sin(this.theta) * 100);
            }
        }
    }

    for (var n = 0; n < 10; n++) {
        blobs.push(newCircleAI());
    }
}


function draw() {
    if (keyIsDown(32))
        speedUp = 3;
    else
        speedUp = 0;
    if (keyIsDown(87))
        circle.y -= (3 + speedUp);
    if (keyIsDown(83))
        circle.y += (3 + speedUp);
    if (keyIsDown(65))
        circle.x -= (3 + speedUp);
    if (keyIsDown(68))
        circle.x += (3 + speedUp);
    fill(123, 123, 255);
    background(180);
    //noStroke();
    ellipse(circle.x, circle.y, circleDiameter, circleDiameter);
    for (var n = 0; n < blobs.length; n++){
        ellipse(blobs[n].x, blobs[n].y, circleAIdiameter, circleAIdiameter);
        blobs[n].orbit();
    }
}