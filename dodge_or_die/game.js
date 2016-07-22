var player;
var enemies;
var enemyTypeC;
var isGameOver;
var gravity;
var obstacles;
var deleteID;

function setup(){
    createCanvas(1400,700);
    enemies = new Group();
    player = createSprite(width/2,height-25,50,50);
    for(var i=0;i<10;i++){
        var enemy = createSprite(random(5,width-5),random(-500,-15),30,30);
        enemies.add(enemy);
    }
    gravity= 0.4; 
    isGameOver = false;
    obstacles = new Group();
}

function create(){
    player = createSprite(width/2,height-25,50,50);
    // enemy = createSprite(random(5,width-5),-15,30,30);
    isGameOver = false;
}

function draw(){
    background(50,100,180);
    if(isGameOver){
        gameOver();
    } else {
    for(var i=0;i<enemies.length;i++){
    if(enemies[i].position.y>height+50){ // wrap
        enemies[i].position.y=0;
        enemies[i].position.x=random(5,width-5)
    }
    }
    
    // if(keyDown(87))
    //     player.position.y-=2;
    if(keyIsDown(65)&&player.position.x>25)
        player.position.x-=3;
    // if(keyIsDown(83))
    //     player.position.y+=2;
    if(keyIsDown(68)&&player.position.x<width-25)
        player.position.x+=3;
        
    jump();
    
    for(var i=0;i<enemies.length;i++){
        enemies[i].position.y+=1.5;
            if (enemies[i].overlap(player,storeID(i))) {
                player.setVelocity(0,0);
                isGameOver=true;
    }
    }
    }
    
    player.collide(obstacles,stopFall);
    drawSprites();
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
        obstacles.add(player);
        obstacles.add(enemies.get(deleteID));
        enemies.get(deleteID).remove();
        create();
    }
}

function jump(){
    if(keyIsDown(32)&&player.velocity.y===0){
        player.velocity.y=-10;
    }
    if(player.velocity.y!=0||(!player.overlap(obstacles))){
        player.velocity.y=player.velocity.y+gravity;
    }
    if(player.position.y>height-25){
        player.velocity.y=0;
        player.position.y=height-25;
    }
}

function stopFall(){
    player.velocity.y=0;
}

function storeID(i){
    deleteID=i;
}