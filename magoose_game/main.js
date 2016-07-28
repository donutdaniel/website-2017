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
var checkBound=0;

function preload() {
    playerImage = loadImage("mongoose.png");
    backgroundImage = loadImage("background.png");
    ratImage = loadImage("rat.png");
    leafImage = loadImage("leaf.png");
}

function setup() {
    canvas = createCanvas(windowWidth - 20, windowHeight - 20);
    player = createSprite(playerImage.width / 2, height - (playerImage.height / 2), 0, 0);
    player.addImage(playerImage);
    enemies = new Group();
    gravity = 0.;

    for (var i = 0; i < enemiesNum; i++) {
        var rat = createSprite(width / 2 + (Math.random() * 5000), ((Math.random() * 0.6) + 0.3) * height, 0, 0);
        rat.addImage(ratImage);
        enemies.push(rat);
    }
}

function draw() {
    background(170, 200, 250);
    //background(backgroundImage);
    playerMove();
    jump();
    enemies.overlap(player, updateScore);
    camera.position.x = player.position.x + (width / 4);
    drawSprites();
    text("Score: " + score, camera.position.x - (width / 2), 15);

    if ((score >= enemiesNum)&&(checkBound===0)) {
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
        player.velocity.y = -18;
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
    enemies=new Group();
    for (var i = 0; i < enemiesNum; i++) {
        var leaf = createSprite((player.position.x/2) + (Math.random() * 50), ((Math.random() * 0.6) + 0.3) * height, 0, 0);
        leaf.addImage(leafImage);
        enemies.push(leaf);
    }
}