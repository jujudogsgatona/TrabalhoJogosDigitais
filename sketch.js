// VARIÁVEIS DA BOLINHA
let xBola = 50;
let yBola = 200;
let velocidadeX = 5;
let velocidadeY = 5;
let diametro = 20;
let raio = diametro/2;

// VARIÁVEIS DA RAQUETE
let larguraRaq = 10;
let alturaRaq = 80;
let xRaq1 = 10;
let yRaq1 = 200 - alturaRaq/2;

let xRaq2 = 580;
let yRaq2 = 200 - alturaRaq/2;

let colisao = false;
let colisao2 = false;

//PONTUAÇÃO
let pontosJ1 = 0;
let pontosJ2 = 0;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
 
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
  trilha.setVolume(0.6);
  ponto.setVolume(0.6);
  raquetada.setVolume(1.5);
}

function draw() {
  // R = RED G = GREEN B = BLUE
  background(238,130,238);
  movimentaBolinha();
  movimentaRaquete();
  colisaoRaquete();
  contaPontos();
  mostraPontos();
 
}

function movimentaBolinha(){
  circle(xBola, yBola, diametro);
  xBola = xBola + velocidadeX;
  yBola = yBola + velocidadeY;
 
  if (xBola + raio >= 600 || xBola - raio <= 0) {
    velocidadeX = velocidadeX * -1;
  }
 
  if (yBola + raio >= 400 || yBola - raio <= 0) {
    velocidadeY = velocidadeY * -1;
  }
}

function movimentaRaquete(){
  rect(xRaq1,yRaq1,larguraRaq,alturaRaq);
  rect(xRaq2,yRaq2,larguraRaq,alturaRaq);
  if (keyIsDown(87) === true) {
    if (yRaq1 > 0){
      yRaq1 -= 5;
    }
    
  }
  if (keyIsDown(83) === true) {
    if (yRaq1 + alturaRaq< 400){
      yRaq1 += 5;
    }
  }
    
  
  if (keyIsDown(UP_ARROW) === true) {
    if (yRaq2 > 0 )
    yRaq2 -= 5;
  }

  if (keyIsDown(DOWN_ARROW) === true) {
    if (yRaq2 + alturaRaq< 400)
    yRaq2 += 5;
  }
}


function colisaoRaquete(){
  colisao = collideRectCircle(xRaq1, yRaq1, larguraRaq, alturaRaq, xBola, yBola, diametro);
  colisao2 = collideRectCircle(xRaq2, yRaq2, larguraRaq, alturaRaq, xBola, yBola, diametro);
  if (colisao == true || colisao2 == true){
    raquetada.play();
    velocidadeX = velocidadeX * -1;
    if(velocidadeX >0 ){
      velocidadeX += 1;
    }else{
      velocidadeX -= 1;
    }
   
    if(velocidadeY >0 ){
      velocidadeY += 1;
    }else{
      velocidadeY -= 1;
    }
  }
}

function contaPontos(){
  // Pontos Jogador 1
  if(xBola + raio >= 600){
    ponto.play();
    pontosJ1 += 1;
    xBola = 30;
    yBola = yRaq1 + alturaRaq/2;
    velocidadeX = velocidadeX * -1;
    velocidadeX = 5;
    velocidadeY = 5;
  }
  
  if (pontosJ1 == 10){
    text("Jogador 1 ganhou", 290, 100);
    velocidadeX = 0;
    velocidadeY = 0;
    xBola = 300;
  
  }
 
  // Pontos Jogador 2
  if(xBola - raio <= 0){
    ponto.play();
    pontosJ2 += 1;
    xBola = 570;
    yBola = yRaq2 + alturaRaq/2;
    velocidadeX = velocidadeX * -1;
    velocidadeX = 5;
    velocidadeY = 5;
  }
   
  if (pontosJ2 == 10){
    text("Jogador 2 ganhou", 290, 100);
    velocidadeX = 0;
    velocidadeY = 0;
    xBola = 300;
  }
}

  
  

function mostraPontos(){
  stroke(255);
  textAlign(CENTER);
  fill(255,105,180);
  rect(170,20, 60, 40);
  textSize(28);
  fill(255);
  text(pontosJ1, 200,50);
 
  stroke(255);
  textAlign(CENTER);
  fill(0,191,255);
  rect(370,20, 60, 40);
  textSize(28);
  fill(255);
  text(pontosJ2, 400,50);
}