const state = {
    icons: ['💣','👾','📡','🗼','🛰','🚀','🛸','🪐','💥','☄','⚡','🔥'],
    defender: 202,
    invaders: [[...Array(12).keys()], [...Array(4).keys()]],
    invaderPos: [],
    offset: 1,
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
    grid.innerHTML = '';
    [...Array(dimension**2).keys()].forEach(i => {
        grid.innerHTML += `
        <div class="cell ${i === state.defender ? 'defender' : ''}" 
        id="${i}">
        </div>`;
    })
}
setupBoard(state.edge)

const cells = document.querySelectorAll('.cell')
const scoreUI = document.querySelector('.score')
const resultUI = document.querySelector('.result')
function setupInvaders() {
    state.invaders[0].forEach(i => {
        state.invaders[1].forEach(j => {
            state.offset = j%2 ? 1 : 0
            state.invaderPos.push(i + j*state.edge + state.offset)
            cells[i + j*state.edge + state.offset].classList.add('invader')
        })
    })
}
setupInvaders()

function initClock (tick) {
    state.timer = tick
    clearInterval(state.interval)
    state.interval = setInterval(update, tick)
}
initClock(400)

const resume = document.querySelector('#resume')
const pause = document.querySelector('#pause')
const reset = document.querySelector('#reset')

resume.addEventListener('click', () => state.playing = true)
pause.addEventListener('click', () => state.playing = false)
reset.addEventListener('click', () => {
    clearInterval(state.interval)
    cells.forEach(c => c.classList.value = 'cell')
    cells[state.defender].classList.add('defender')
    state.invaderPos = []
    state.direction = 1
    setupInvaders()
    initClock(400)
    state.playing = true
})

function shoot(e){
    let laser
    let laserPos = state.defender
    const moveLaser = () => {
        cells[laserPos]?.classList.remove(state.weapon)
        laserPos -= state.edge
        cells[laserPos]?.classList.add(state.weapon)
        if(cells[laserPos]?.classList.contains('invader')) {
            state.score += 1 
            clearInterval(laser)
            cells[laserPos].classList.value = 'cell boom'
            state.invaderPos = state.invaderPos.filter(p => p !== laserPos)
            setTimeout(() => cells[laserPos].classList.remove('boom'), 200)
        }
        if(laserPos <= -state.edge) {
            cells[laserPos]?.classList.remove('laser')
            clearInterval(laser)
        }
    }
    laser = setInterval(moveLaser, 75)
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
    state.invaderPos.forEach(i => cells[i]?.classList.add('invader'))
}

function gameOver(){
    let defended = state.invaderPos.length === 0
    let destroyed = Array.from(cells).filter(c => c.classList.contains('invader') && c.classList.contains('defender')).length
    let landing = state.invaderPos.filter(p => p > 211).length
    return defended || landing || destroyed
}

function update() {
    if(!state.playing) return
    moveInvaders()
    scoreUI.innerHTML = state.score
    if(gameOver()) {
        state.playing = false
        let msg = 'Game Over'
        if(state.invaderPos.length === 0) msg = 'You Win!'
        resultUI.innerHTML = msg
        cells[state.defender].classList.add( msg == 'You Win!' ? 'astro' : 'boom')
        cells[state.defender].classList.remove( 'defender')
        cells[state.defender + state.edge].classList.add(msg == 'You Win!' ? 'legs' : '')
        cells[state.defender -1].classList.add(msg == 'You Win!' ? 'arm' : '')
        initClock(999999999)
        if(msg === 'You Win!') {
            state.invaders[0].forEach(i => {
                state.invaders[1].forEach(j => {
                    cells[i + j*state.edge + state.offset].classList.add(Math.random() > 0.5 ? 'firework' : 'sparkle')
                    Math.random() > 0.7 ? state.offset++ : ''
                })
            })
        }
        
    }
}

