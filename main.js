
// Game class
class Game {
 constructor(canvas, ctx){
   this.canvas = canvas;
   this.ctx = ctx;
   this.width = this.canvas.width;
   this.height = this.canvas.height;

   this.enemiesPool = [];
   this.numberOfEnemies = 50;
   this.createEnemyPool();
   this.enemyTimer = 0;
   this.enemyInterval = 1000;
   

   this.start();

   window.addEventListener('resize', (e)=> {
    this.resize(e.target.innerWidth, e.target.innerHeight);
    
   });
 }
start(){
 this.resize(window.innerWidth, window.innerHeight);
}
 resize(width, height){
  this.canvas.width = width;
  this.canvas.height = height;
  this.width = width;
  this.height = height;
  this.ctx.fillStyle = 'blue';
 }
 createEnemyPool(){
  for(let i = 0; i < this.numberOfEnemies; i++){
   this.enemiesPool.push(new Enemy(this));
  }
 }
 getEnemy(){
  for(let i = 0; i < this.enemiesPool.length; i++){
   if(this.enemiesPool[i].free) return this.enemiesPool[i];
  }
 }
 handleEnemies(deltaTime){
  if(this.enemyTimer < this.enemyInterval){
   this.enemyTimer += deltaTime;
  } else{
   this.enemyTimer = 0;
   const enemy = this.getEnemy();
   if(enemy) enemy.start();
   console.log(enemy);
   
  }
 }
 render(deltaTime){
  this.handleEnemies(deltaTime);
  this.enemiesPool.forEach((enemy) => {
   enemy.update();
   enemy.draw()
  } );
 }
};
// end of Game class

window.addEventListener('load', function(){
 const canvas = this.document.getElementById('canvas1');
 const ctx = canvas.getContext('2d');
 canvas.width = this.window.innerWidth;
 canvas.height = this.window.innerHeight;

 const game = new Game(canvas, ctx);

 let lastTime = 0;

 function animate(timeStamp){
 const deltaTime = timeStamp - lastTime;
 lastTime = timeStamp; 
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.render(deltaTime);
  
  requestAnimationFrame(animate);
 };

 requestAnimationFrame(animate);

});

