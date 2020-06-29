var trex, ground, invisibleGround,trexRun,                           groundImage,rand,cloudImage,cloudGroup, trex_collided, score;
var obse1, obse2, obse3, obse4, obse5, obse6;
var gameOver, restart, restart_image, gameOver_image;
var obstacleGroup;
var PLAY=1;
var END=0;
var GameState=PLAY;



function preload() {

  trexRun =loadAnimation("trex1.png", "trex3.png", "trex4.png");
 groundImage=loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");
  obse1=loadImage("obstacle1.png");
  obse2=loadImage("obstacle2.png");
  obse3=loadImage("obstacle3.png");
  obse4=loadImage("obstacle4.png");
  obse5=loadImage("obstacle5.png");
  obse6=loadImage("obstacle6.png");
  trex_collided=loadAnimation("trex_collided.png");
  GameOver_image=loadImage("gameOver.png");
  restart_image=loadImage("restart.png")
}

function setup() {
  createCanvas(600, 200); 
  
  trex=createSprite(50,180);
  trex.addAnimation("run",trexRun);
  trex.addAnimation("trex_dead",trex_collided);
  trex.scale=0.5;
  
  ground=createSprite(200,180);
  ground.addImage("ground",groundImage);
  
  invisibleGround=createSprite(300,190,700,10);
  invisibleGround.visible=false;
  invisibleGround.debug=true;
  
  GameOver=createSprite(300,70);
  GameOver.addImage("game_over",GameOver_image);
  GameOver.visible=false;
  GameOver.scale=0.5;
  
  restart=createSprite(300,130);
  restart.addImage("Restart_button",restart_image);
  restart.visible=false;
  restart.scale=0.5;
  
  cloudGroup= new Group();
  obstacleGroup= new Group();
  
  score=0;
}

function draw() {
  background(255);
  
  if(GameState===PLAY){
  rand= Math.round(random(50,150));
  
    score=score+1;
    
  ground.velocityX=-6;
  if(ground.x<0){
   ground.x=width/2; 
  }
  
  
  trex.collide(invisibleGround);
  if(keyDown("space") && trex.y>=162){
   trex.velocityY=-15;
  }
  trex.velocityY=trex.velocityY+1;
  
    spawnClouds();
  spawnObstacle();
    
  if(obstacleGroup.collide(trex)){
    GameState=END;
  }
    
  }
  else if(GameState===END){

    ground.velocityX=0;
    trex.changeAnimation("trex_dead");
     trex.velocityY=0;
    obstacleGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityEach(0,0)
    cloudGroup.setLifetimeEach(-1);
    cloudGroup.setVelocityEach(0,0);
    GameOver.visible=true;
    restart.visible=true;
    if(mousePressedOver(restart)){
         score=0;
      obstacleGroup.destroyEach();
      cloudGroup.destroyEach();
    GameState=PLAY;
      trex.changeAnimation("run");
      restart.visible=false;
      GameOver.visible=false;
    }
  }
  drawSprites();
  score_display();
}

function spawnClouds(){
if(frameCount%60===0){
  var cloud=createSprite(600,rand);
  cloud.addImage("cloud",cloudImage);
  cloud.velocityX=-6;
  cloud.lifetime=100;
  cloud.scale=0.5;
  cloudGroup.add(cloud);
  cloud.depth=trex.depth-1;
  
} 
}

function spawnObstacle(){       
 if(frameCount%60===0){
   var obstacle= createSprite(600,170);
   rnum= Math.round(random(1,6))
   switch(rnum){
     case 1: obstacle.addImage("1",obse1);
       break;
     case 2: obstacle.addImage("2",obse2);
       break;
     case 3: obstacle.addImage("3",obse3);
       break;
    case 4: obstacle.addImage("4",obse4);
       break;   
    case 5: obstacle.addImage("5",obse5);
       break;
    case 6: obstacle.addImage("6",obse6);
       break;   
    default:break;
   }
   obstacle.scale=0.5;
   obstacle.velocityX=-6;
   obstacle.lifetime=100;
   obstacleGroup.add(obstacle);
 }
  
}

function score_display(){
 fill("black") ;
  textSize(20);
  text("Score: "+score,500,50);
  
  
}
















