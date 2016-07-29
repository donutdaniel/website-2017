var player;
var playerImage;
var enemies;
var enemiesNum = 25;
var ratImage;
var leafImage;
var backgroundImage;
var gravity;
var score = 0;
var canvas;
var checkBound = 0;
var backgroundSprite1;
var backgroundSprite2;

function preload() {
    playerImage = loadImage("mongoose.png");
    backgroundImage = loadImage("background.png");
    ratImage = loadImage("rat.png");
    leafImage = loadImage("leaf.png");
}

function setup() {
    canvas = createCanvas(1000, 600);
    backgroundSprite1 = createSprite(width / 2, height / 2, 0, 0);
    backgroundSprite1.addImage(backgroundImage);
    backgroundSprite2 = createSprite(width / 2 + backgroundImage.width, height / 2, 0, 0);
    backgroundSprite2.addImage(backgroundImage);
    player = createSprite(playerImage.width / 2, height - (playerImage.height / 2), 0, 0);
    player.addImage(playerImage);
    enemies = new Group();
    gravity = 0.4;


    for (var i = 0; i < enemiesNum; i++) {
        var rat = createSprite(width / 2 + (Math.random() * 5000), ((Math.random() * 0.5) + 0.4) * height, 0, 0);
        rat.addImage(ratImage);
        enemies.push(rat);
    }
}

function draw() {
    //background(170, 200, 250);
    //background(backgroundImage);
    clear();
    playerMove();
    jump();
    enemies.overlap(player, updateScore);
    camera.position.x = player.position.x + (width / 4);
    updateBackground();
    drawSprites();
    text("Score: " + score, camera.position.x - (width / 2), 15);

    if ((score >= enemiesNum) && (checkBound === 0)) {
        lvlUp();
    }
}

function playerMove() {
    if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
        player.position.x -= 3;
    }
    if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
        player.position.x += 3;
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
    checkBound++;
    playerImage = loadImage("giraffe.png");
    player.addAnimation("lvl2", playerImage);
    player.changeAnimation("lvl2");
    player.setCollider("giraffe", 0, 0, playerImage.width, playerImage.height);
    enemies = new Group();
    for (var i = 0; i < enemiesNum; i++) {
        var leaf = createSprite((player.position.x + (width / 2)) + (Math.random() * 5000), ((Math.random() * 0.3) + 0.6) * height, 0, 0);
        leaf.addImage(leafImage);
        enemies.push(leaf);
    }
}

function updateBackground() {
    if (keyIsDown(68)) {
        if (player.position.x - backgroundSprite1.position.x > backgroundImage.width) {
            backgroundSprite1.position.x = backgroundSprite2.position.x + (backgroundImage.width);
        }
        else if (player.position.x - backgroundSprite1.position.x < backgroundImage.width) {
            backgroundSprite1.position.x = backgroundSprite2.position.x - (backgroundImage.width);
        }
    }

    // if (player.position.x - backgroundSprite2.position.x > backgroundImage.width) {
    //     backgroundSprite2.position.x = backgroundSprite1.position.x + (backgroundImage.width);
    // }
    // else if (player.position.x - backgroundSprite2.position.x < backgroundImage.width) {
    //     backgroundSprite2.position.x = backgroundSprite1.position.x - (backgroundImage.width);
    // }
}