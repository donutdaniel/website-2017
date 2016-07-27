var player;
var playerImage;
var backgroundImage;
var gravity;
var 

function preload() {
    playerImage = loadImage("mongoose.png");
    backgroundImage = loadImage("background.png")
}

function setup() {
    createCanvas(1000, 600);
    player = createSprite(playerImage.width / 2, height - (playerImage.height / 2), 0, 0);
    player.addImage(playerImage);
    gravity = 0.4;
}

function draw() {
    background(10,150,200);
    playerMove();
    jump();
    camera.position.x = player.position.x + (width / 4);
    drawSprites();
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
        player.velocity.y = -14;
    }

    if (player.position.y > height - (playerImage.height / 2)) {
        player.velocity.y = 0;
        player.position.y = height - (playerImage.height / 2);
    }
}