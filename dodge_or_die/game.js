var player;
var playerImage;
var enemy;
var enemyImage;
var isGameOver;
var backgroundImage;
var gravity;
var normal = get(0,0);

function setup(){
    createCanvas(1400,700);
    player = createSprite(width/2,height-25,50,50);
    enemy = createSprite(random(5,width-5),-15,30,30);
    gravity= 0.4; 
    isGameOver = false;
}

function create(){
    player = createSprite(width/2,height-25,50,50);
    enemy = createSprite(random(5,width-5),-15,30,30);
    isGameOver = false;
}

function draw(){
    background(50,100,180);
    if(isGameOver){
        gameOver();
    } else {
    if(enemy.position.y>height+50){ // wrap
        enemy.position.y=0;
        enemy.position.x=random(5,width-5)
    }
    
    // if(keyDown(87))
    //     player.position.y-=2;
    if(keyIsDown(65)&&player.position.x>25)
        player.position.x-=3;
    // if(keyIsDown(83))
    //     player.position.y+=2;
    if(keyIsDown(68)&&player.position.x<width-25)
        player.position.x+=3;
        
    if(keyIsDown(32)&&(player.velocity.y===0)){ //jump
        player.velocity.y=-5;
    }
    if(player.velocity.y<0){
        player.velocity.y+=gravity;
    }
    if(player.position.y>height-25){
        player.velocity.y=0;
    }
    enemy.position.y+=1.5;
    drawSprites();
    }
    if (enemy.overlap(player)) {
        isGameOver=true;
    }
    
    player.collide(player);
        
}

function gameOver(){
    background(0,200);
    textAlign(CENTER);
    fill("white");
    text("Game Over!", width/2, height/2);
    text("Press any key to restart", width/2, (height/2)+15)
    // no multiple sprites
    // if(keyIsPressed){
    //     isGameOver=false;
    //     player.position.x=width/2;
    //     player.position.y=height-(25);
    //     enemy.position.y=0;
    //     enemy.position.x=random(5,width-5);
    // }
    if(keyIsPressed){
        setup();
    }
}