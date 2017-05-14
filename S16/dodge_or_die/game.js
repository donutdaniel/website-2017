var player;
var enemies;
var numEnemies = 20;
var enemyTypeC;
var numEnemiesTypeC = 5;
var isGameOver;
var isGameLost;
var isGameWon;
var gravity;
var obstacles;
var noInclude;

function setup() {
    createCanvas(1400, 700);
    gravity = 0.4;
    isGameOver = false;
    isGameLost = false;
    isGameWon = false;
    enemies = new Group();
    enemiesTypeC = new Group();
    obstacles = new Group();
    player = createSprite(width / 2, height - 25, 50, 50);
    //create Enemies
    for (var i = 0; i < numEnemies; i++) {
        var enemy = createSprite(random(5, width - 5), random(-1000, -15), 30, 30);
        enemy.shapeColor = (255);
        enemies.add(enemy);
    }
    //create Enemies Type C
    for (var i = 0; i < numEnemiesTypeC; i++) {
        var enemy = createSprite(random(5, width - 5), random(-1000, -15), 30, 30);
        enemy.shapeColor = (0);
        enemiesTypeC.add(enemy);
    }

}

function draw() {
    background(50, 100, 180);
    if (isGameLost) {
        gameLost();
    } else if(isGameOver){
        gameOver();
    }
    else {
        jump();
        enemyMoveCheck();
        enemyTypeCMoveCheck();
        playerMove();
        enemyMove();
        enemyWrap();
        enemyTypeCWrap();
        player.collide(obstacles, determineSide);
    }
    checkLost();
    checkWon();
    drawSprites();
}

function gameOver() {
    background(0, 200);
    textAlign(CENTER);
    fill("white");
    text("Game Over!", width / 2, height / 2);
    text("Press any key to restart", width / 2, (height / 2) + 15);
        // no multiple sprites
        // if(keyIsPressed){
        //     isGameOver=false;
        //     player.position.x=width/2;
        //     player.position.y=height-(25);
        //     enemy.position.y=0;
        //     enemy.position.x=random(5,width-5);
        // }
    if (keyIsPressed) {
        if (!noInclude) {
            obstacles.add(player);
        }
        create();
    }
}

function gameLost() {
    background(0, 200);
    textAlign(CENTER);
    fill("white");
    text("Game Over!", width / 2, height / 2);
    text("There are no more white blocks. You have lost.", width / 2, (height / 2) + 15);
    text("Press R to restart", width/2, (height/2)+30);
    if(keyIsDown(82)){
        setup();
    }
}

function gameWon() {
    
}

function create() {
    player = createSprite(width / 2, height - 25, 50, 50);
    // enemy = createSprite(random(5,width-5),-15,30,30);
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].position.x = random(5, width - 5);
        enemies[i].position.y = random(-1000, -15);
    }
    for (var i = 0; i < enemiesTypeC.length; i++) {
        enemiesTypeC[i].position.x = random(5, width - 5);
        enemiesTypeC[i].position.y = random(-1000, -15);
    }
    isGameOver = false;
}

function jump() {
    player.velocity.y += gravity;
    if (keyIsDown(32) && player.velocity.y === gravity) {
        player.velocity.y = -10;
    }

    if (player.position.y > height - 25) {
        player.velocity.y = 0;
        player.position.y = height - 25;
    }
}

function stopFall() {
    player.velocity.y = 0;
}

function determineSide(a, b) {
    if ((a.position.y + 25) <= (b.position.y - 25)) {
        stopFall();
    }
}

function playerMove() {
    if (keyIsDown(65) && (player.position.x > 25)) {
        player.position.x -= 3;
    }
    if (keyIsDown(68) && (player.position.x < width - 25)) {
        player.position.x += 3;
    }

}

function enemyMove() {
    if (keyIsDown(LEFT_ARROW)) {
        for (var i = 0; i < enemies.length; i++) {
            enemies[i].position.x--;
        }
    }
    if (keyIsDown(RIGHT_ARROW)) {
        for (var i = 0; i < enemies.length; i++) {
            enemies[i].position.x++;
        }
    }
}

function enemyWrap() {
    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].position.y > height + 50) { // wrap
            enemies[i].position.y = 0;
            enemies[i].position.x = random(5, width - 5)
        }
    }
}

function enemyMoveCheck() {
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].position.y += 1.5;
        if (enemies[i].overlap(player)) {
            player.setVelocity(0, 0);
            enemies.get(i).remove();
            noInclude = false;
            isGameOver = true;
        }
    }
}

function enemyTypeCWrap() {
    for (var i = 0; i < enemiesTypeC.length; i++) {
        if (enemiesTypeC[i].position.y > height + 50) { // wrap
            enemiesTypeC[i].position.y = 0;
            enemiesTypeC[i].position.x = random(5, width - 5)
        }
    }
}

function enemyTypeCMoveCheck() {
    for (var i = 0; i < enemiesTypeC.length; i++) {
        enemiesTypeC[i].position.y += 1.5;
        if (enemiesTypeC[i].overlap(player)) {
            player.setVelocity(0, 0);
            //enemiesTypeC.get(i).remove();
            removeObstacles();
            player.remove();
            noInclude = true;
            isGameOver = true;
        }
    }
}

function removeObstacles() {
    for (var i = obstacles.length - 1; i >= 0; i--) {
        obstacles.get(i).remove();
    }
}

function checkLost(){
    if(enemies.length===0){
        isGameLost=true;
    }
}

function checkWon(){
    if (player.position.y < 0) {
        isGameWon = true;
    }
}