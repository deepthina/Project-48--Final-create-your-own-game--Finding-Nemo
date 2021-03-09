const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var bckImage, bck, bck2, bckImage2;

var nemo, nemoImage, nemoBody;
var marlin, marlinImage;

var net, netImage, syndney, sydneyImage, sydneyCityImage;

var sharkImage, jellyImage, octopusImage;

var sharkGroup, jellyGroup, octopusGroup;

var gameOver, gameOverImage;

var restart, restartImage;

var gameState = "start";

var music;

var marlinLife = 3, nemoLife = 3;

var elastic1, ground;

var score = 0;


localStorage["HighestScore"] = 0;

function preload() {

  bckImage = loadImage("images/bck1.jpg");
  bckImage2 = loadImage("images/fishTank.jpg");
  bckImage3 = loadImage("images/dentistBck.jpg");
  nemoImage = loadImage("images/nemo.png");
  sydneyImage = loadImage("images/Sydney.png");
  sydneyCityImage = loadImage("images/sydneyCity.png");
  sharkImage = loadImage("images/shark.png");
  jellyImage = loadImage("images/jelly.png");
  octopusImage = loadImage("images/octopus.png");
  marlinImage = loadImage('images/marlin.png');
  netImage = loadImage("images/net.png");
  gameOverImage = loadImage("images/gameOver.jpg");
  restartImage = loadImage("images/restart.png");
  filterImage = loadImage("images/fishTankFilter.png");


  music = loadSound("sounds/bensound-funkyelement.mp3");

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  bck = createSprite(width / 2, height / 2, width, height);
  bck.shapeColor = rgb(0, 83, 203);
  bck.addImage("bckImage", bckImage);
  bck.addImage("sydneyImage", sydneyCityImage);
  bck.scale = 1.6;

  nemo = createSprite(550, 300);
  nemo.addImage("nemo", nemoImage);
  nemo.scale = 0.6;
  nemo.setCollider("circle", 0, 0, 10);
  nemo.visible = false;

  marlin = createSprite(400, 300);
  marlin.addImage("marlin", marlinImage);
  marlin.scale = 0.8;
  marlin.setCollider("circle", 0, 0, 10);

  net = createSprite(width - 100, 190);
  net.addImage("net", netImage);
  net.visible = false;
  net.scale = 1.3;
  net.setCollider("circle", 50, 100, 50);


  syndney = createSprite(width - 100, 160);
  syndney.addImage("syndney", sydneyImage);
  syndney.visible = false;


  gameOver = createSprite(camera.x + 300, camera.y - 100);
  gameOver.addImage("gameover", gameOverImage);
  gameOver.visible = false;

  restart = createSprite(camera.x + 300, camera.y + 200);
  restart.addImage("restart", restartImage);
  restart.visible = false;

  bckDentist = createSprite(width / 2, height / 2, width, height);
  bckDentist.shapeColor = rgb(0, 83, 203);
  bckDentist.addImage("bckImage3", bckImage3);
  bckDentist.scale = 1.6;
  bckDentist.visible = false;


  bck2 = createSprite(width / 2 - 400, height / 2 + 200, width, height);
  bck2.shapeColor = rgb(0, 83, 203);
  bck2.addImage("bckImage2", bckImage2);
  bck2.scale = 0.6;
  bck2.visible = false;

  filter1 = createSprite(width / 2 - 770, height / 2 + 200, 10, 10);
  filter1.addImage("filter", filterImage);
  filter1.scale = 0.5;
  filter1.visible = false;

  ground = new Ground(400, 790, 800, 10);
  leftWall = new Ground(0, 680, 20, 250);
  rightWall = new Ground(750, 600, 10, 400);
  topWall = new Ground(200, 380, 800, 1);


  nemoBody = new Nemo(550, 750);
  elastic1 = new Elastic(nemoBody.body, { x: 550, y: 650 });


  sharkGroup = new Group();
  jellyGroup = new Group();
  octopusGroup = new Group();

  music.loop();
}

function draw() {
  background(0, 83, 203);

  drawSprites();


  Engine.update(engine);

  //******************************************start***************************************************************************************************************************************

  if (gameState === "start") {

    nemo.visible = true;

    textSize(30);
    fill("blue");
    text("Mario and his son Nemo are having a great day.", width / 2 - 100, height / 2);
    text("Press 'Y' to see what happens next.", width / 2 - 50, height / 2 + 100);

    if (keyDown("y") && gameState === "start")
      gameState = "nemoLostStory";

  }

  //******************************************nemoLostStory***************************************************************************************************************************************

  if (gameState === "nemoLostStory") {

    nemo.visible = true;
    net.visible = true;
    syndney.visible = true;

    net.velocityX = -10;
    syndney.velocityX = -10;

    if (net.isTouching(nemo)) {

      nemo.velocityY = -10;
      net.velocityY = -10;
      syndney.velocityY = -10;
      net.velocityX = 0;
      bck.velocityX = 0;
      syndney.velocityX = 0;

      net.lifetime = 50;
      syndney.lifetime = 50;
      gameState = "saveNemoStory";
    }

  }

  //******************************************saveNemoStory***************************************************************************************************************************************

  if (gameState === "saveNemoStory") {

    textSize(50);
    fill("blue");
    textSize(30);
    text("Nemo has been taken to Sydney. He is in a Fish Tank at a Dentist Clinic.", 350, 450);
    text("Help Nemo to escape from the fish tank to meet Marlin.", 400, 500);
    text("Press 'N' to help Nemo first.", 500, 600);

    bck.velocityX = 0;


    if (keyDown("N") && gameState === "saveNemoStory")
      gameState = "saveNemoMission";
  }

  //******************************************saveNemoMission***************************************************************************************************************************************

  if (gameState === "saveNemoMission") {

    bckDentist.visible = true;
    bck2.visible = true;
    filter1.visible = true;

    marlin.visible = false;

    textSize(30);
    fill("red");
    text("Nemo life left: " + nemoLife, bck.x + 230, bck.y - 250);

    if (gameOver.visible === false) {
      textSize(30);
      fill("blue");
      text("Nemo is stuck in the fish tank. Help him to get out from the tank filter.", bck.x - 300, bck.y - 200);
      text("Use MOUSE to drag and release me. Press R to try again.", bck.x - 200, bck.y - 150);
    }

    nemoBody.display();
    elastic1.display();


    if (nemoBody.body.position.x < 0) {
      gameState = "helpMarioStory";
    }
  }


  //******************************************helpMarioStory***************************************************************************************************************************************

  if (gameState === "helpMarioStory") {

    bckDentist.visible = false;
    bck2.visible = false;
    filter1.visible = false;

    marlin.visible = true;

    textSize(50);
    fill("blue");
    text("HELP ME REACH SYDNEY AND FIND MY SON NEMO PLEASE!!", 70, 500);
    textSize(30);
    text("You can hide behind the octopuses and do not touch stinky jelly fishes and scary sharks!!", 100, 550);
    text("Use UP and DOWN arrow keys to move me.", 400, 600);
    text("Press 'M' to help me.", 550, 650);


    if (keyDown("M") && gameState === "helpMarioStory")
      gameState = "helpMarioMission";
  }

  //******************************************helpMarioMission***************************************************************************************************************************************

  if (gameState === "helpMarioMission") {

    if (score == 100) {
      gameState = "finalWin";
    }

    textSize(30);
    fill("blue");
    text("Marlin life left: " + marlinLife, camera.x + 230, camera.y - 300);

    text("Score: " + score, camera.x + 240, camera.y - 250);

    score = score + Math.round(getFrameRate() / 60);

    bck.velocityX = -10;

    camera.x = marlin.x;
    camera.y = marlin.y;

    if (bck.x < 0)
      bck.x = bck.width / 2;


    if (keyDown("up") && marlin.y > -80) {
      marlin.y = marlin.y - 10;
    }

    else if (keyDown("down") && marlin.y < height + 80) {
      marlin.y = marlin.y + 10;
    }

    else if (keyDown("left")) {
      marlin.x = marlin.x - 1;
    }


    spawnJellyFish();
    spawnSharks();
    spawnOctopus();

    if (octopusGroup.isTouching(marlin)) {
      if (keyDown("left"))
        marlin.x = marlin.x - 10;
    }

    else if (marlin.isTouching(sharkGroup) || marlin.isTouching(jellyGroup)) {
      gameState = "marlinEnd";
    }

  }

  //******************************************MARLIN END***************************************************************************************************************************************
  if (gameState === "marlinEnd") {

    textSize(30);
    fill("blue");
    text("Score: " + score, camera.x + 230, camera.y - 250);

    gameOver.x = camera.x
    gameOver.y = camera.y - 100;

    restart.x = camera.x;
    restart.y = camera.y + 200;

    marlin.velocityX = 0;
    sharkGroup.setVelocityXEach(0);
    jellyGroup.setVelocityXEach(0);

    sharkGroup.destroyEach();
    jellyGroup.destroyEach();

    bck.velocityX = 0;

    gameOver.visible = true;

    if (marlinLife > 0)
      restart.visible = true;

    music.stop();

    if (mousePressedOver(restart)) {

      if (localStorage["HighestScore"] < score)
        localStorage["HighestScore"] = score;

      console.log("Highest score: " + localStorage["HighestScore"]);

      score = 0;

      if (marlinLife > 0) {
        marlinLife = marlinLife - 1;
        music.play();
      }
      else
        marlinLife = 0;

      gameOver.visible = false;
      restart.visible = false;

      gameState = "helpMarioMission";
    }

  }
  //******************************************WIN END***************************************************************************************************************************************

  if (gameState === "finalWin") {

    filter.visible = false;
    bck2.visible = false;

    bck.velocityX = 0;

    camera.x=bck.x;
    camera.y=bck.y;

    textSize(30);
    fill("red");
    text("Score: " + score, camera.x + 230, camera.y - 250);

    bck.changeImage("sydneyImage", sydneyCityImage);
    bck.y=200;
    bck.scale=2.2;

    marlin.y=camera.y+300;
    nemo.x = marlin.x + 200;
    nemo.y = marlin.y - 20;
    nemo.visible = true;
    marlin.visible = true;

    textSize(30);
    fill("red");
    text("Thanks for Saving us.", camera.x - 200, camera.y);
  }

}
//******************************************SPAWN FUNCTIONS***************************************************************************************************************************************
function spawnSharks() {
  if (frameCount % 130 === 0) {
    var shark = createSprite(width, random(camera.y));
    shark.addImage("shark", sharkImage);
    shark.velocityX = -(10 + score / 8);
    shark.scale = 1.2;
    shark.lifetime = width / 5;
    sharkGroup.add(shark);
  }
}

function spawnJellyFish() {
  if (frameCount % 200 === 0) {
    var jelly = createSprite(width, random(camera.y));
    jelly.addImage("jelly", jellyImage);
    jelly.scale = 0.3;
    jelly.velocityX = -(10 + score / 8);
    jelly.lifetime = width / 5;
    jellyGroup.add(jelly);
  }
}



function spawnOctopus() {
  if (frameCount % 500 === 0) {
    var octopus = createSprite(width, random(camera.y));
    octopus.addImage("octopus", octopusImage);
    octopus.velocityX = -10;
    octopus.lifetime = width / 5;
    octopusGroup.add(octopus);

    octopus.depth = 3;
    marlin.depth = 2;
  }
}

//******************************************MOUSE FUNCTIONS***************************************************************************************************************************************
function mouseDragged() {
  if (gameOver.visible === false)
    Matter.Body.setPosition(nemoBody.body, { x: mouseX, y: mouseY });
}

function mouseReleased() {
  elastic1.fly();
}

function keyPressed() {
  if ((keyCode === 82 || keyCode === 114) && gameState != "finalWin" && gameOver.visible === false) {

    gameOver.x = camera.x
    gameOver.y = camera.y - 100;

    nemoLife = nemoLife - 1;
    music.play();

    if (nemoLife === 0) {
      gameOver.visible = true;
      gameState="gameOver";
      gameOver.depth=10;
      music.stop();
    }

    gameState = "saveNemoMission";

    Matter.Body.setPosition(nemoBody.body, { x: 600, y: 600 });
    elastic1.attach(nemoBody.body);

  }
}