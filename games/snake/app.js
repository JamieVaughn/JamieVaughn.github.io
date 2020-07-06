const loot = ['🍞', '🥖', '🥪', '🥐', '🥯', '🥟', '🥨', '🥞', '🧇']
const enemy = ['🦡', '🦅', '🐒', '🦉', '🐊']
// Board setup
var timer = 350;
var edge = 14;
var boardSize = edge*edge;
var array = [].fill.call({ length: boardSize }, 1);
var htmlElements = "";
for (let i = 0; i < array.length; i++) {
   htmlElements += `<div class="cell" id="${i}" data-icon="${loot[Math.floor(Math.random() * loot.length)]}"></div>`;
}
document.getElementById("container").innerHTML = htmlElements;
//buttons
var play = document.getElementById("play");
  play.addEventListener("click", function(){
  timer = 350;
  clearInterval(interval)
  interval  = setInterval(update, timer);
})
document.getElementById("pause").addEventListener("click", function(){
  timer = 9999999999999;
  clearInterval(interval)
  interval  = setInterval(update, timer);
  console.log(timer)
})
document.getElementById("reset").addEventListener("click", function(){
  console.log("reload");
  document.querySelectorAll('.cell').forEach(c => c.classList.remove('snake'))
  reload();
})
function reload() {
    snake = [27, 28];
    len = snake.length-1;
    snakeDirection = "left";
    head = undefined;
    clearInterval(interval)
    timer = 350
    interval  = setInterval(update, timer);

}
//snake setup
var snake = [27, 28];
var len = snake.length-1;
var snakeDirection = "left";
var head;

var rand = function(size, arr) {
   let num = Math.floor(Math.random() * size);
  while (arr.includes(num)){
    num = Math.floor(Math.random() * size);
  }
  return num;
}
function bread (cell) {
  document.getElementById(cell.toString()).classList.add("bread")
  return cell;
}
var breadLocation = bread(rand(boardSize, snake));
var eat = function (head, appl) {
  if(head.toString() == appl){
    document.getElementById(appl).classList.remove("bread");
    snake.push(snake[snake.length-1]);
    return bread(rand(boardSize, snake));
  }
  return appl;
}

function slither() {
  head = snake[0];
  if(snakeDirection=="right"){
    document.getElementById(snake.pop()).classList.remove("snake");
    snake.unshift(head+1);
  }
  if(snakeDirection=="left"){
    document.getElementById(snake.pop()).classList.remove("snake");
    snake.unshift(head-1);
  }
  if(snakeDirection=="up"){
    document.getElementById(snake.pop()).classList.remove("snake");
    snake.unshift(head-edge);
  }
  if(snakeDirection=="down"){
    document.getElementById(snake.pop()).classList.remove("snake");
    snake.unshift(head+edge);
  }
  for(let i = 0; i<snake.length; i++) {
    document.getElementById(snake[i]).classList.add("snake");
  }
  return head;
}
function checkCollision(pos, size, arr){
  
  if(pos === "undefined" || pos < 0 || pos > size || arr.slice(1, arr.length-1).includes(pos)) {
    console.log("loss condition detected.");
    document.getElementById("container").innerHTML = "<h1> Game Over </h1>";
  }
}
document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 37: if(snakeDirection!="right"){snakeDirection = "left" }; break;
    case 38: if(snakeDirection!="down"){snakeDirection = "up"}; break;
    case 39: if(snakeDirection!="left"){snakeDirection = "right"}; break;
    case 40: if(snakeDirection!="up"){snakeDirection = "down"}; break;
    }
};

//update loop
// while (playing) {
function update () {
  var position = slither();
  console.log(snake, position, snake[0], boardSize);
  
  breadLocation = eat(position, breadLocation);
  checkCollision(snake[0], boardSize, snake);
  
}
var interval = setInterval(update, timer);
// }
