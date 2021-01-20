// Board setup
const state = {
    score: 0,
    timer: 350,
    interval: undefined,
    edge: 14,
    snake: [39, 40],
    direction: 'left',
    breadLocation: undefined,
    playing: true,
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
    state.breadLocation = bread([37, 38]);
}
function initClock (tick) {
    state.timer = tick
    clearInterval(state.interval)
    state.interval = setInterval(update, tick)
}
setupBoard(state.edge)
//UI
let scoreUI = document.querySelector('.score')
let play = document.getElementById("play").addEventListener("click", () => state.playing = true)
let pause = document.getElementById("pause").addEventListener("click", () => state.playing = false)
let restart = document.getElementById("reset").addEventListener("click", reload)
function reload() {
    grid.innerHTML = ''
    setupBoard(state.edge)
    state.snake = [39, 40];
    state.direction = "left";
    state.score = 0
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
function bread (arr) {
  let num;
  do { num = Math.floor(Math.random() * (state.edge**2));
  } while (arr.includes(num))
  document.getElementById(num).classList.add("bread")
  return num;
}
var eat = function (tail, breadPos) {
    document.getElementById(breadPos).classList.remove("bread");
    state.score++
    state.snake.push(tail);
    return bread(state.snake);
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
  let lateralCollision = arr[1]%14 === 0 && (pos+1)%14 === 0 ||
                        (arr[1]+1)%14 === 0 && pos%14 === 0
  if( lateralCollision || vertCollision || selfCollision) {
    gameOver(selfCollision)
  }
}
function gameOver(cause) {
    let msg = `<h1> Game Over </h1><h5>You collided with ${cause ? 'yourself' : 'the edge'}`
    if(cause === 'win') msg = `<h1> You Win </h1><h5>Congratulations</h5>`
    document.getElementById("container").innerHTML = msg;
    clearInterval(state.interval)
    state.playing = false
}
//update loop
function update () {
    if(!state.playing) return
    let head = state.snake[0];
    let tail = state.snake[state.snake.length - 1]
    checkCollision(head, state.edge**2, state.snake);
    slither(state.direction, head)
    if(head == state.breadLocation) state.breadLocation = eat(tail, state.breadLocation);
    scoreUI.innerHTML = state.score
    if(state.score > 99) gameOver('win')
}
state.interval = setInterval(update, state.timer);