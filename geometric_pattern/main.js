var numCircles = 12;
var circleDiameter;
var circleAIdiameter;
var circle;
var circleAI;
var speedUp;
var theta=0;

function setup(){
    createCanvas(800,600);
    circleDiameter=80;
    circleAIdiameter=50;
    circle = {
    x: width/2,
    y: height/2,
    shoot: function() {
        
    },
    }
    
    circleAI = {
        x: 0,
        y: 0,
        move: function(){
            if((circle.x-circleAI.x)>100||(circle.x-circleAI.x)>-100){
                circleAI.x+=2;
            } else if((circle.x-circleAI.x)<-100||(circle.x-circleAI.x)<100){
                circleAI.x-=2;
            }
            if((circle.y-circleAI.y)>100||(circle.y-circleAI.y)>-100){
                circleAI.y+=2;
            } else if((circle.y-circleAI.y)<-100||(circle.y-circleAI.y)<100){
                circleAI.y-=2;
            }
        },
        orbit: function(){
            theta+=0.05;
            circleAI.x=circle.x+(Math.cos(theta)*100);
            circleAI.y=circle.y+(Math.sin(theta)*100);
        }
    }

}


function draw(){
    if(keyIsDown(32))
        speedUp=3;
    else 
        speedUp=0;
    if(keyIsDown(87))
        circle.y-=(3+speedUp);
    if(keyIsDown(83))
        circle.y+=(3+speedUp);
    if(keyIsDown(65))
        circle.x-=(3+speedUp);
    if(keyIsDown(68))
        circle.x+=(3+speedUp);
    circleAI.orbit();
    fill(123,123,255);
    background(180);
    noStroke();
    ellipse(circle.x,circle.y,circleDiameter,circleDiameter);
    ellipse(circleAI.x,circleAI.y,circleAIdiameter,circleAIdiameter);
}