var trex, trexCorrendo,solo,soloImg,soloInvisivel;
var nuvemImg;
var o1,o2,o3,o4,o5,o6,pontuacao;
var gNuvens,gObstaculos;
var JOGAR = 1;
var ENCERRAR = 0;
var estadoJogo = JOGAR;
var colidir;
var gameOver,gameOverImg, restart, restartImg;
var somMorte, somPontos, somSalto;
function preload(){
  trexCorrendo = loadAnimation("trex1.png","trex3.png","trex4.png");
  soloImg = loadImage ("ground2.png");
  nuvemImg = loadImage ("cloud.png");
  o1 = loadImage ("obstacle1.png");
  o2 = loadImage ("obstacle2.png");
  o3 = loadImage ("obstacle3.png");
  o4 = loadImage ("obstacle4.png");
  o5 = loadImage ("obstacle5.png");
  o6 = loadImage ("obstacle6.png");
  colidir = loadAnimation("trex_collided.png");
  gameOverImg = loadImage ("gameOver.png");
  restartImg = loadImage ("restart.png");
  somMorte = loadSound ("die.mp3");
  somSalto = loadSound ("jump.mp3");
  somPontos = loadSound ("checkpoint.mp3");
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  
  trex = createSprite(50,height-70,20,50);
  trex.addAnimation ("correndo",trexCorrendo);
  trex.addAnimation ("trexC", colidir);
  trex.scale =0.5;

  solo = createSprite (width/2,height-20,width,20);
  solo.addImage (soloImg);
  
  
  soloInvisivel = createSprite (width/2,height-10,width,10);
  soloInvisivel.visible = false;

  gameOver = createSprite (width/2,height/2);
  gameOver.addImage (gameOverImg);
  gameOver.visible = false;

  restart = createSprite (width/2,height/2+50);
  restart.addImage (restartImg);
  restart.scale = 0.5;
  restart.visible = false;

 pontuacao = 0;
 gNuvens = new Group();
 gObstaculos = new Group();
// trex.debug = true; 
 trex.setCollider ("circle",0,0,40);
 //trex.setCollider ("rectangle",0,0,200,40);
 
}


function draw(){
  background("white");
  text ("Pontuação: "+ Math.round (pontuacao) ,width/2,height-400);
 
if (estadoJogo === JOGAR){
  pontuacao = pontuacao +  (frameRate()/100);
  solo.velocityX = -(6+pontuacao/100 );
  if (keyDown("space")&& trex.y>height-60|| touches.length>0 && trex.y > height-60){
    trex.velocityY = -11; 
    somSalto.play();
    touches = [];
  }
  trex.velocityY = trex.velocityY +0.6;

  if (pontuacao > 0 &&  Math.round (pontuacao) %100 === 0){
    somPontos.play();
  }
  if(solo.x < 0){
    solo.x = solo.width/2;
  }
  criarNuvens ();
  gerarObstaculos();

  if (gObstaculos.isTouching(trex)){
  somMorte.play();
  estadoJogo = ENCERRAR;
  //somSalto.play();
 // trex.velocityY = -10;
  }
}
else if(estadoJogo === ENCERRAR){
solo.velocityX = 0;
trex.velocityY = 0;

gameOver.visible = true;
restart.visible = true;
gObstaculos.setVelocityXEach(0);
gNuvens.setVelocityXEach(0); 
gObstaculos.setLifetimeEach(-1);
gNuvens.setLifetimeEach(-1);
trex.changeAnimation ("trexC");
if (mousePressedOver(restart)|| touches.length > 0){
reset ();
touches = [];
}
}

  trex.collide (soloInvisivel);
  
  drawSprites();
}

function criarNuvens (){
  if (frameCount %60 === 0){
    var nuvem = createSprite (width,100,40,10);
    nuvem.velocityX = -3;
    nuvem.addImage (nuvemImg);
    nuvem.scale = 0.7;
    nuvem.y = Math.round(random(height-100, height-350));
    nuvem.depth = trex.depth;
    trex. depth ++;
    nuvem.lifetime = 1000;
    gNuvens.add (nuvem);
  }

  }
function gerarObstaculos (){
  if (frameCount %60 === 0){
    var obstaculo = createSprite (width,height-35,10,40);
    obstaculo.velocityX = -(8+pontuacao/100 );
    obstaculo.lifetime = 1000;
obstaculo.debug = true;
    var n = Math.round (random(1,6));
    switch (n) {
      case 1: obstaculo.addImage (o1);
        
        break;
      case 2: obstaculo.addImage (o2); 
        
        break;
       case 3: obstaculo.addImage (o3);
    
        break;
      case 4: obstaculo.addImage (o4);
        
        break;
      case 5: obstaculo.addImage (o5);
        
        break;
      case 6: obstaculo.addImage (o6);
        
        break;
      default:
        break;
    }
    obstaculo.scale = 0.6;
    gObstaculos.add(obstaculo);
  }
}
function reset (){
  estadoJogo = JOGAR;
  gObstaculos.destroyEach();
  gNuvens.destroyEach();
  pontuacao = 0;
  gameOver.visible = false;
  restart.visible = false;
  trex.changeAnimation ("correndo");
}