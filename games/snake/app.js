// Board setup
const state = {
    timer: 350,
    interval: undefined,
    edge: 14,
    snake: [37, 38],
    direction: 'left',
    breadLocation: undefined,
    loot: ['🍞', '🥖', '🥪', '🥐', '🥯', '🥟', '🥨', '🥞', '🧇'],
    enemies: ['🦡', '🦅', '🐒', '🦉', '🐊']
}
const grid = document.getElementById("container")
function setupBoard(dimension) { // dimension is length of one side of square grid
    [...Array(dimension**2).keys()].forEach(i => {
        grid.innerHTML += `
        <div class="cell" id="${i}" 
        data-icon="${state.loot[Math.floor(Math.random() * state.loot.length)]}">
        </div>`;
    })
    state.breadLocation = bread(rand([37, 38]));
}
function initClock (tick) {
    state.timer = tick
    clearInterval(state.interval)
    state.interval = setInterval(update, tick)
}
setupBoard(state.edge)
//buttons
document.getElementById("play").addEventListener("click", () => initClock(350))
document.getElementById("pause").addEventListener("click", () => initClock(9999999999))
document.getElementById("reset").addEventListener("click", reload)
function reload() {
    grid.innerHTML = ''
    setupBoard(state.edge)
    state.snake = [37, 38];
    state.direction = "left";
    initClock(350)
}
document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 37: if(state.direction!="right"){state.direction = "left" }; break;
    case 38: if(state.direction!="down"){state.direction = "up"}; break;
    case 39: if(state.direction!="left"){state.direction = "right"}; break;
    case 40: if(state.direction!="up"){state.direction = "down"}; break;
  }
};
//utils
function rand(arr) {
    let num;
    do { num = Math.floor(Math.random() * (state.edge**2));
    } while (arr.includes(num))
  return num;
}
function bread (cell) {
  document.getElementById(cell).classList.add("bread")
  return cell;
}
var eat = function (tail, breadPos) {
    document.getElementById(breadPos).classList.remove("bread");
    state.snake.push(tail);
    return bread(rand(state.snake));
}
function slither(dir, h) {
  document.getElementById(state.snake.pop())?.classList.remove("snake");
  let table = {
    right: (h) => state.snake.unshift(h+1),
    left: (h) => state.snake.unshift(h-1),
    up: (h) => state.snake.unshift(h-state.edge),
    down: (h) => state.snake.unshift(h+state.edge),
  }
  table[dir](h)
  state.snake.forEach(s => document.getElementById(s)?.classList.add("snake"))
}
function checkCollision(pos, size, arr){
  let selfCollision = arr.slice(1, arr.length-1).includes(pos)
  let vertCollision = pos === undefined || pos < 0 || pos > size 
  let lateralCollision = arr[1]%14 === 0 && (pos+1)%14 === 0 || (arr[1]+1)%14 === 0 && pos%14 === 0
  if( lateralCollision || vertCollision || selfCollision) {
    gameOver(selfCollision)
  }
}
function gameOver(cause) {
    document.getElementById("container").innerHTML = `
        <h1> Game Over </h1><h5>You collided with ${cause ? 'yourself' : 'the edge'}`;
    clearInterval(state.interval)
}
//update loop
function update () {
    let head = state.snake[0];
    let tail = state.snake[state.snake.length - 1]
    checkCollision(head, state.edge**2, state.snake);
    slither(state.direction, head)
    if(head == state.breadLocation) state.breadLocation = eat(tail, state.breadLocation);
}
state.interval = setInterval(update, state.timer);