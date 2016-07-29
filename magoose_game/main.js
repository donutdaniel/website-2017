var player;
var playerImage;
var flipImage;
var enemies;
var enemiesNum = 20;
var enemiesRange = 5000;
var ratImage;
var leafImage;
var treeImage;
var backgroundImage;
var gravity;
var score = 0;
var canvas;
var checkBound = 0;
var backgroundSprite1;
var backgroundSprite2;
var level = 1;
var myAudio = new Audio("music.mp3"); 
myAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
myAudio.play();

function preload() {
    playerImage = loadImage("Images/mongoose.png");
    flipImage = loadImage("Images/mongoose.1.png");
    backgroundImage = loadImage("Images/background.png");
    ratImage = loadImage("Images/rat.png");
    leafImage = loadImage("Images/leaf.png");
    treeImage = loadImage("Images/palmTree.png");
}

function setup() {
    canvas = createCanvas(1500, 700);
    backgroundSprite1 = createSprite(width / 2, height / 2, 0, 0);
    backgroundSprite1.addImage(backgroundImage);
    backgroundSprite2 = createSprite(width / 2 + backgroundImage.width, height / 2, 0, 0);
    backgroundSprite2.addImage(backgroundImage);
    player = createSprite(playerImage.width / 2, height - (playerImage.height / 2), 0, 0);
    player.addAnimation("front",playerImage);
    player.addAnimation("back",flipImage);
    enemies = new Group();
    gravity = 0.4;


    for (var i = 0; i < enemiesNum; i++) {
        var rat = createSprite(width / 2 + (Math.random() * enemiesRange), ((Math.random() * 0.5) + 0.4) * height, 0, 0);
        rat.addImage(ratImage);
        enemies.push(rat);
    }
}

function draw() {
    clear();
    playerMove();
    jump();
    enemies.overlap(player, updateScore);
    camera.position.x = player.position.x + (width / 4);
    updateBackground();
    drawSprites();
    textSize(20);
    text("Score: " + score, camera.position.x - (width / 2)+10, 25);
    updateCollider();
    
    if (score >= enemiesNum * 2) {
        checkBound = 0;
    }
    
    if(score>=enemiesNum*3){
        gameWon();
    }

    if ((score >= enemiesNum) && (checkBound === 0)) {
        lvlUp();
    }
    
}

function playerMove() {
    if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
        player.position.x -= 3;
        player.changeAnimation("back");
    }
    if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
        player.position.x += 3;
        player.changeAnimation("front");
    }

}

function jump() {
    player.velocity.y += gravity;
    if ((keyIsDown(32) || keyIsDown(UP_ARROW)) && player.velocity.y === gravity) {
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
}

function lvlUp() {
    level++;
    if (level === 2) {
        checkBound++;
        playerImage = loadImage("Images/giraffe.png");
        flipImage = loadImage("Images/giraffe.1.png")
        player.addAnimation("front", playerImage);
        player.addAnimation("back", flipImage);
        player.changeAnimation("front");
        enemies = new Group();
        for (var i = 0; i < enemiesNum; i++) {
            var leaf = createSprite((player.position.x + (width / 2)) + (Math.random() * enemiesRange), ((Math.random() * 0.3) + 0.6) * height, 0, 0);
            leaf.addImage(leafImage);
            enemies.push(leaf);
        }
    }
    if (level === 3) {
        checkBound++;
        playerImage = loadImage("Images/brachiosaurus.png");
        flipImage = loadImage("Images/brachiosaurus.1.png");
        player.addAnimation("front", playerImage);
        player.addAnimation("back", flipImage);
        player.changeAnimation("front");
        enemies = new Group();
        for (var i = 0; i < enemiesNum; i++) {
            var tree = createSprite((player.position.x + (width / 2)) + (Math.random() * enemiesRange), ((Math.random() * 0.3) + 0.6) * height, 0, 0);
            tree.addImage(treeImage);
            enemies.push(tree);
        }
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
    // text("Press R to restart", camera.position.x, (camera.position.y)+30);
    // if(keyIsDown(82)){
    //     setup();
    // }
}