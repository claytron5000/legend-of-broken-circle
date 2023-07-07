let canvasWidth = 640;
let canvasHeight = 480;

let colliderWidth = 40;
let colliderHeight = 40;

let direction = 90;
let enemyRadius = 200;

let spriteWidth = 64;
let spriteHeight = 64;

let playerX = 300;
let playerY = 100;
let player;
let speed = 4;

let monster;
let monsterX = 300;
let monsterY = 300;

let abc;
let abcX = 600;
let abcY = 400;





function preload()
{
 playerImg = loadImage("images/o0.png")
 monsterImg = loadImage("images/Luis.png")
 abcImg = loadImage("images/Luis.png")
 bgImg = loadImage("images/backgruond2.png")
 projectileImg = loadImage("images/New Piskel-1.png.png");
}

function setup()
{
createCanvas(canvasWidth, canvasHeight);
player = createSprite(playerX, playerY);
player.addImage(playerImg);

monster = createSprite(monsterX, monsterY);
monster.addImage(monsterImg);

abc = createSprite(abcX, abcY);
abc.addImage(abcImg);

enemies = new Group();
enemies.add(monster);
enemies.add(abc);

projectiles = new Group();

player.setCollider("rectangle", 0, 0, colliderWidth, colliderHeight);
monster.setCollider("rectangle", 0, 0, colliderWidth, colliderHeight);
abc.setCollider("rectangle", 0, 0, colliderWidth, colliderHeight);

for (let i = 0; i < 5; i++)
 {
  let angle = random(360); 
  let posX = canvasWidth/2 * angle; 
  let posY = canvasHeight/2 * angle; 
  createEnemy(posX, posY); 
}
  
}

function playerControls(){
  if (keyIsDown(68)){
    player.position.x+=speed;
    if (player.position.x + spriteWidth/2 > canvasWidth)
    {
      player.position.x = canvasWidth - spriteWidth/2; 
    }
  }

  if (keyIsDown(65)){
    player.position.x-=speed;
 if (player.position.x < 0 + spriteWidth/2){
  player.position.x = 0 + spriteWidth/2; 
 }   
}

  if (keyIsDown(87)){
player.position.y-=speed;
if (player.position.y < 0 + spriteHeight/2){
  player.position.y = 0 + spriteHeight/2; 
} 
}


  if (keyIsDown(83)){
    player.position.y+= speed;
    if (player.position.y + spriteHeight/2 > canvasHeight){
      player.position.y = canvasHeight - spriteHeight/2; 
    } 
  }
  }                         



function enemyMovements(){
  direction += 2;
  monster.setSpeed(3, direction); 
  abc.attractionPoint(0.2, player.position.x, player.position.y); 
  abc.maxSpeed = 4; 
   
}

function collisions() {
  enemies.overlap(projectiles);
  player.collide(enemies);
  enemies.overlap(projectiles, destroyOther); 
  player.collide(enemies, gameOver); 

}

function destroyOther(destroyed, projectile){
  destroyed.remove(); 
  projectiles.remove(projectile); 
  let angle = random(360); 
  let posX = canvasWidth/2 * angle; 
  let posY = canvasHeight/2 * angle; 
  createEnemy(posX, posY); 
} 

function gameOver(){
  console.log("GAME OVER")
  window.location.reload(); 
}

function mousePressed(){
  let projectile = createSprite(player.position.x, player.position.y);
  projectile.addImage(projectileImg);
  projectile.attractionPoint(10+speed, mouseX, mouseY); 
  projectile.setCollider("rectangle", 0, 0, colliderWidth, colliderHeight); 
  projectiles.add(projectile); 
  }

function createEnemy(x, y)
{
  let newEnemy = createSprite(x,y); 
  let enemyImg = loadImage("images/Luis.png"); 
  newEnemy.addImage(enemyImg); 
  newEnemy.setSpeed(2.5, random(360)); 
  newEnemy.setCollider("rectangle", 0, 0, colliderHeight, colliderWidth); 
  enemies.add(newEnemy);
  newEnemy.attractionPoint(0.2, player.position.x, player.position.y); 
  newEnemy.maxSpeed = 4; 
}

function enemySpawn(){
  for (let i = 0; i < enemies.length; i++) {
   let spawn = enemies[i];
   if (spawn.position.x < - colliderWidth)
   {
   spawn.position.x = canvasWidth + colliderWidth;
 }
 if (spawn.position.x > canvasWidth + colliderWidth){
   spawn.position.x = - colliderWidth;
 }
 if (spawn.position.y < - colliderWidth) { 
   spawn.position.y = canvasHeight + colliderHeight;
 }
 if (spawn.position.y > canvasHeight + colliderHeight) { 
   spawn.position.y = - colliderHeight;
 }   
 }
 }

function draw(){
background(bgImg);
playerControls();
collisions();
enemyMovements();
enemySpawn(); 
drawSprites();
}