var clickID=0;
var clickIDtext="Bomb";
var bombs;
var bombImage;
var TBEx;
var TBEy;

function preload(){
    bombImage = loadImage("bomb.png");
}

function setup(){
    createCanvas(1000,600);
    bombs = new Group();
}

function draw(){
    background(150,200,255);
    displayText();
    drawSprites();
}

function keyPressed(){
    if(key==='1'){
        clickID=0;
        clickIDtext="Bomb"
    }
    if(key==='2'){
        clickID=1;
        clickIDtext="Spark"
    }
}

function mouseClicked(){
    if(clickID===0){
        placeBombs();
    }
    if(clickID===1){
        detonateBombs(mouseX,mouseY);
    }
}

function displayText(){
    textSize(12);
    text("Press 1 for Bomb, 2 for Spark",10,15);
    text("Selected Item: "+clickIDtext,10,30);
}

function detonateBombs(x,y){
    for(var i=0;i<bombs.length;i++){
        if(bombs[i].overlapPoint(x,y)){
            bombs[i].changeAnimation("explode");
            bombs[i].life=30;
            if(bombs[i].overlap(bombs,poop)){
                detonateBombs(TBEx,TBEy);
            }
        }
    }
}

function placeBombs(){
    var bomb = createSprite(mouseX,mouseY,0,0);
    bomb.addImage(bombImage);
    bomb.addAnimation("explode","explosion.png");
    bombs.push(bomb);
}

function checkArea(n){
var x;
var y;
    for(var i=1;i<300;i++){
        for(var z=0;z<(2*Math.PI);z+=0.1){
            x=bombs[n].position.x+(Math.cos(z)*i);
            y=bombs[n].position.y+(Math.sin(z)*i);
            detonateBombs(x,y);
        }
    }
}

function poop(spriteA,spriteB){
    TBEx=spriteB.position.x;
    TBEy=spriteB.position.y;
}