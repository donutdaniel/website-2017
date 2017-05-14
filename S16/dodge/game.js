var player;
var playerImage;
var enemy;
var enemyImage;
var isGameOver;
var backgroundImage;

function preload(){
    playerImage = loadImage("https://surrogate.hackedu.us/i.imgur.com/N5uCbDu.png");
    enemyImage = loadImage("https://surrogate.hackedu.us/i.imgur.com/OdL0XPt.png");
    backgroundImage = loadImage("https://surrogate.hackedu.us/i.imgur.com/aKQOg3G.png");
}

function setup(){
    createCanvas(256,256);
    player = createSprite(width/2,height-(playerImage.height/2),0,0);
    player.addImage(playerImage);
    enemy = createSprite(random(5,width-5),-enemyImage.height,0,0);
    enemy.addImage(enemyImage);
    enemy.rotationSpeed=2;
    isGameOver = false;
}

function draw(){
    background(backgroundImage);
    if(isGameOver){
        gameOver();
    } else {
    if(enemy.position.y>height+(enemyImage.height)){
        enemy.position.y=0;
        enemy.position.x=random(5,width-5)
    }
    // if(keyDown(87))
    //     player.position.y-=2;
    if(keyIsDown(65)&&player.position.x>playerImage.width/2)
        player.position.x-=2;
    // if(keyIsDown(83))
    //     player.position.y+=2;
    if(keyIsDown(68)&&player.position.x<width-(playerImage.width/2))
        player.position.x+=2;
    enemy.position.y+=1.5;
    drawSprites();
    }
    if (enemy.overlap(player)) {
        isGameOver=true;
    }
}

function gameOver(){
    background(0,250);
    textAlign(CENTER);
    fill("white");
    text("Game Over!", width/2, height/2);
    text("Press any key to restart", width/2, (height/2)+15)
    if(keyIsPressed){
        isGameOver=false;
        player.position.x=width/2;
        player.position.y=height-(playerImage.height/2);
        enemy.position.y=0;
        enemy.position.x=random(5,width-5);
    }
}