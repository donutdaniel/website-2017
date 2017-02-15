var player;
var playerImage;
var flipImage;
var food;
var foodNum;
var foodRange;
var ratImage;
var leafImage;
var treeImage;
var backgroundImage;
var gravity;
var score;
var canvas;
var checkBound;
var backgroundSprite1;
var backgroundSprite2;
var level;
var myAudio = new Audio("music.mp3"); 
var lose;
//enemies
var enemies;
var enemyImage;
var numEnemies;
var rangeEnemies;
//projectiles
var projectiles;
var projectileImage;
var projectileStored;
var keyDown;
myAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
myAudio.play();

function preload() {
    //playerImage = loadImage("Images/mongoose.png");
    //flipImage = loadImage("Images/mongoose.1.png");
    backgroundImage = loadImage("Images/background.png");
    backgroundImage2 = loadImage("Images/Valentines/background.png");
    ratImage = loadImage("Images/Valentines/carrot.png");
    leafImage = loadImage("Images/Valentines/heart.png");
    treeImage = loadImage("Images/Valentines/ZacEfron.png");
    //enemies
    enemyImage = loadImage("Images/cactus.png");
    //projectiles
    projectileImage = loadImage("Images/projectile.png")
}

function setup() {
    myAudio.currentTime = 0;
    myAudio.play();
    foodNum = 20;
    foodRange = 5000;
    score = 0;
    checkBound = 0;
    level = 1;
    lose = false;
    //rest
    playerImage = loadImage("Images/Valentines/bunny.png");
    flipImage = loadImage("Images/Valentines/bunnyFlipped.png");
    canvas = createCanvas(1500, 700);
    backgroundSprite1 = createSprite(width / 2, height / 2, 0, 0);
    backgroundSprite1.addImage(backgroundImage);
    backgroundSprite1.addAnimation("second", backgroundImage2);
    backgroundSprite2 = createSprite(width / 2 + backgroundImage.width, height / 2, 0, 0);
    backgroundSprite2.addImage(backgroundImage);
    backgroundSprite2.addAnimation("second", backgroundImage2);
    player = createSprite(playerImage.width / 2, height - (playerImage.height / 2), 0, 0);
    player.addAnimation("front",playerImage);
    player.addAnimation("back",flipImage);
    food = new Group();
    gravity = 0.4;
    //enemies
    enemies = new Group();
    numEnemies = 20;
    rangeEnemies = 3*foodRange;
    projectiles = new Group();
    projectileStored = 2;
    keyDown = false;
    for (var i = 0; i < foodNum; i++) {
        var rat = createSprite(width / 2 + (Math.random() * foodRange), ((Math.random() * 0.5) + 0.4) * height, 0, 0);
        rat.addImage(ratImage);
        food.push(rat);
    }
    //init enemies
    for (var i = 0; i < numEnemies; i++) {
        var enemy = createSprite(width + (Math.random() * rangeEnemies), height - enemyImage.height/4 + 10, 0, 0);
        enemy.addImage(enemyImage);
        enemies.push(enemy);
    }
}

function draw() {
    if(lose){
        myAudio.pause();
        background(0, 200);
        textAlign(CENTER);
        fill("white");
        text("You Lost! Press R to try again", camera.position.x, camera.position.y);
        if(keyIsDown(82)){
            setup();
        }
    } else {
        clear();
        playerMove();
        enemyMove();
        jump();
        playerShoot();
        food.overlap(player, updateScore);
        if(enemies.overlap(player)){
            lose = true;
        }
        camera.position.x = player.position.x + (width / 4);
        updateBackground();
        drawSprites();
        textSize(20);
        text("Score: " + score, camera.position.x - (width / 2)+10, 25);
        text("Projectiles Left: " + projectileStored, camera.position.x - (width / 2)+10, 50);
        updateCollider();
        
        if (score >= foodNum * 2) {
            checkBound = 0;
        }
        
        if(score>=foodNum*3){
            gameWon();
        }

        if ((score >= foodNum) && (checkBound === 0)) {
            lvlUp();
        }
    }
    
}

function enemyMove(){
    for(var i=0; i<numEnemies; i++){
        if(Math.abs(player.position.x - enemies.get(i).position.x) <= width){
            enemies.get(i).position.x -= 2.5;
        }
    }
}

function playerShoot(){
    for(var i=0; i<projectiles.size(); i++){
        projectiles.get(i).position.x += 15;
    }
    for(var i=0; i<projectiles.size(); i++){
        if(Math.abs(player.position.x - projectiles.get(i).position.x) >= width){
            projectiles.get(i).remove();
            projectiles.splice(i, 1);
            i--;
        }
    }
    projectiles.overlap(enemies, bulletClash);
}

function bulletClash(spriteA, spriteB){
    spriteA.remove();
    spriteB.remove();
}

function keyPressed(){
    if(keyCode === 32){
        if(!keyDown && projectileStored > 0){
            var projectile = createSprite(player.position.x, height - 50, 0, 0);
            projectile.addImage(projectileImage);
            projectiles.push(projectile);
            keyDown = true;
            projectileStored--;
        }
    }
}

function keyReleased(){
    if(keyCode === 32){
        keyDown = false;
    }
}

function playerMove() {
    if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
        player.position.x -= 5;
        player.changeAnimation("back");
    }
    if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
        player.position.x += 5;
        player.changeAnimation("front");
    }

}

function jump() {
    player.velocity.y += gravity;
    if ((keyIsDown(87) || keyIsDown(UP_ARROW)) && player.velocity.y === gravity) {
        player.velocity.y = -16;
    }

    if (player.position.y > height - (playerImage.height / 2)) {
        player.velocity.y = 0;
        player.position.y = height - (playerImage.height / 2);
    }
}

function updateScore(spriteA, spriteB) {
    score++;
    spriteA.remove();
    if(score % 4 === 0){
        projectileStored++;
    }
}

function lvlUp() {
    level++;
    if (level === 2) {
        checkBound++;
        playerImage = loadImage("Images/Valentines/samoyed.png");
        flipImage = loadImage("Images/Valentines/samoyedFlipped.png")
        player.addAnimation("front", playerImage);
        player.addAnimation("back", flipImage);
        player.changeAnimation("front");
        food = new Group();
        for (var i = 0; i < foodNum; i++) {
            var leaf = createSprite((player.position.x + (width / 2)) + (Math.random() * foodRange), ((Math.random() * 0.3) + 0.6) * height, 0, 0);
            leaf.addImage(leafImage);
            food.push(leaf);
        }
        projectileStored +=3 ;
    }
    if (level === 3) {
        checkBound++;
        playerImage = loadImage("Images/Valentines/Magoose.png");
        flipImage = loadImage("Images/Valentines/Magoose.png");
        player.addAnimation("front", playerImage);
        player.addAnimation("back", flipImage);
        player.changeAnimation("front");
        food = new Group();
        for (var i = 0; i < foodNum; i++) {
            var tree = createSprite((player.position.x + (width / 2)) + (Math.random() * foodRange), ((Math.random() * 0.3) + 0.6) * height, 0, 0);
            tree.addImage(treeImage);
            food.push(tree);
        }
        myAudio.pause();
        myAudio = new Audio("Images/Valentines/music.mp3");
        myAudio.play();
        backgroundSprite1.changeAnimation("second");
        backgroundSprite2.changeAnimation("second");
        projectileStored += 10;
    }
}

function updateBackground() {
    if (player.position.x - backgroundSprite1.position.x > backgroundImage.width) {
        backgroundSprite1.position.x = backgroundSprite2.position.x + (backgroundImage.width);
    }
    if (player.position.x - backgroundSprite2.position.x > backgroundImage.width) {
        backgroundSprite2.position.x = backgroundSprite1.position.x + (backgroundImage.width);
    }
    if (player.position.x - backgroundSprite1.position.x < -backgroundImage.width) {
        backgroundSprite1.position.x = backgroundSprite2.position.x - (backgroundImage.width);
    }
    if (player.position.x - backgroundSprite2.position.x < -backgroundImage.width) {
        backgroundSprite2.position.x = backgroundSprite1.position.x - (backgroundImage.width);
    }
    // if (player.position.x - backgroundSprite2.position.x > backgroundImage.width) {
    //     backgroundSprite2.position.x = backgroundSprite1.position.x + (backgroundImage.width);
    // }
    // else if (player.position.x - backgroundSprite2.position.x < backgroundImage.width) {
    //     backgroundSprite2.position.x = backgroundSprite1.position.x - (backgroundImage.width);
    // }
}

function updateCollider() {
    player.setCollider("rectangle", 0, 0, playerImage.width, playerImage.height);
}

function gameWon(){
    background(0, 200);
    textAlign(CENTER);
    fill("white");
    text("You Win! Yay!!!!!!", camera.position.x, camera.position.y);
    text("Press R to restart", camera.position.x, (camera.position.y)+30);
    text("Tell Daniel the secret code: \"I pooped, but did not wipe\" for a secret prize!!!", camera.position.x, camera.position.y + height/2 -20);
    if(keyIsDown(82)){
        setup();
    }
}