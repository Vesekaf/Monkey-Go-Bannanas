
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground
var walk
var realground
var gameState;

function preload(){
  
  
  monkey_running =      loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstalceImage = loadImage("obstacle.png");
  
  ground = loadImage("sidewalk.jpg");
 
}



function setup() {
  
  
  createCanvas(400, 400);
  
  walk = createSprite(200, 200);
  walk.addImage("death", ground);
  walk.scale = 2.5;
  
  monkey = createSprite(100, 200);
  monkey.addAnimation("ah", monkey_running);
  monkey.scale = 0.11;
  
  
  
  
  invis = createSprite(200, 335, 400, 10 );
  
  bannanaGroup = new Group();
  obstacleGroup = new Group();
  
  
  
  
  
  
  invis.visible = false;
  score = 0;
  gameState = "play";
}


function draw() {

  background(255);

  if(gameState === "play"){
  
  monkey.visible = true;
   score = score + Math.round(getFrameRate()/60);  
   
  
    
  monkey.velocityY = monkey.velocityY + 0.8;
  walk.velocityX = -8;
  if(walk.x < 0){
     
     walk.x = 200;
     
  }
  
  if(keyDown("space") && monkey.y >= 260){
     
    monkey.velocityY = -13; 
    
     
     
  }
  
  monkey.collide(invis);
  
  
  rock();
  points();
  
  if(monkey.isTouching(bannanaGroup)){
  
    bannanaGroup.destroyEach();
    score = score + 100;
  }
  if(monkey.isTouching(obstacleGroup)){
  
    
    gameState = "end"
  }

 
  
  drawSprites();
  
  textSize(15);
  fill("black");
  text("Survival Time  " + score, 100, 100);
  
}
  
  
 
  
  if(gameState === "end") {
  
    bannanaGroup.destroyEach();
    obstacleGroup.destroyEach();
    walk.velocityX = 0;
    monkey.velocityY = 0;
    monkey.visible = false;
    text("Press R to Restart", 150, 200);
    score = 0;
  
  }
  if(gameState === "end" && keyDown("r")){
  
    gameState = "play";
  
  }
  
}

function rock (){

  
  if(frameCount% 300 === 0){  
    
    obstacle = createSprite(435, 300);
    obstacle.addImage("rok", obstalceImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -7;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
    obstacle.setCollider("rectangle", 0, 0, obstacle.width, obstacle.height);
    
  }
}
function points (){

  
  if(frameCount% 80 === 0){  
    
    bannana = createSprite(435, 200);
    bannana.addImage(bananaImage);
    bannana.y = Math.round(random(180, 270));
    bannana.scale = 0.13;
    bannana.velocityX = -7;
    bannana.lifetime = 200;
    bannanaGroup.add(bannana);
  }
}


