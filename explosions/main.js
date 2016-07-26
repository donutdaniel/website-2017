var clickID=0;
var clickIDtext="Bomb";
var bombs;
var bombImage;

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
    } else if(clickID==1){
        detonateBombs();
    }
}

function displayText(){
    textSize(12);
    text("Press 1 for Bomb, 2 for Spark",10,15);
    text("Selected Item: "+clickIDtext,10,30);
}

function detonateBombs(){
    
}

function placeBombs(){
    var bomb = createSprite(mouseX,mouseY,0,0);
    bomb.addImage(bombImage);
    bombs.push(bomb);
}