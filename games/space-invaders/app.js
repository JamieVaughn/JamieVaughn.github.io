const state = {
    icons: ['💣','👾','📡','🗼','🛰','🚀','🛸','🪐','💥','☄','⚡','🔥'],
    defender: 202,
    invaders: [[...Array(4).keys()], [...Array(15).keys()]],
    invaderPos: [],
    offset: 0,
    invaderId: undefined,
    score: 0,
    direction: 1,
    edge: 15,
    timer: 350,
    interval: undefined,
    playing: true,
    weapon: 'blast'
}
const grid = document.querySelector('.grid')
function setupBoard(dimension) { // dimension is length of one side of square grid
    [...Array(dimension**2).keys()].forEach(i => {
        grid.innerHTML += `
        <div class="cell ${i === state.defender ? 'defender' : ''}" 
        id="${i}">
        </div>`;
    })
}

function initClock (tick) {
    state.timer = tick
    clearInterval(state.interval)
    state.interval = setInterval(update, tick)
}
setupBoard(state.edge)
initClock(350)

const cells = document.querySelectorAll('.cell')
const scoreUI = document.querySelector('.score')
const resultUI = document.querySelector('.result')

state.invaders[0].forEach(i => {
    state.invaders[1].forEach(j => {
        state.invaderPos.push((i+1)*(j+1))
        cells[(i+1)*(j+1) + state.offset].classList.add('invader')

    })
})
function shoot(e){
    let laser
    let laserPos = state.defender
    const moveLaser = () => {
        cells[laserPos].classList.remove(state.weapon)
        laserPos -= state.edge
        cells[laserPos].classList.add(state.weapon)
        if(cells[laserPos].classList.contains('invader')) {
            cells[laserPos].classList.value = 'cell boom'
            setTimeout(cells[laserPos].classList.remove('boom'), 350)
        }

        if(laserPos < state.edge) cells[laserPos].classList.remove('laser')
    }
    laser = setInterval(moveLaser, 100)
}
function strafe(e){
    if(!state.playing) return
    cells[state.defender].classList.remove('defender')
    switch(e.keyCode){
        case 32: shoot(e); break;
        case 37: state.defender % state.edge ? state.defender-- : false; break;
        case 39: state.defender % state.edge < state.edge-1 ? state.defender++ : false; break;
    }
    cells[state.defender].classList.add('defender')
}
document.addEventListener('keydown', strafe)

function moveInvaders() {
    const left = state.invaderPos[0] % state.edge === 0
    const right = state.invaderPos.slice(-1) % state.edge === state.edge - 1
    if((left && state.direction === -1) || (right && state.direction === 1)) {
        state.direction = state.edge
    } else if(state.direction === state.edge) {
        state.direction = left ? 1 : -1
    }
    cells.forEach(c => c.classList.remove('invader'))
    state.invaderPos = state.invaderPos.map(i => i + state.direction)
    state.invaderPos.forEach(i => cells[i].classList.add('invader'))
    console.log(left, right, state.direction, state.invaderPos) // movement is not quite right
}

function gameOver(){
    let destroyed = Array.from(cells).filter(c => c.classList.contains('invader') && c.classList.contains('defender')).length
    let landing = state.invaderPos.filter(p => p > 211).length
    // console.log(destroyed || landing)
    return landing || destroyed
}

function update() {
    moveInvaders()
    if(gameOver()) {
        resultUI.innerHTML = 'Game Over'
        cells[state.defender].classList.replace('defender', 'boom')
        initClock(999999999)
    }
}

