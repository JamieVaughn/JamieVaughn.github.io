const state ={
    icons: ['🐸','🛢','🚗','🚒','🚎','🚓','🚚','🚛'],
    timer: 350,
    interval: undefined,
    edge: 15,
    score: 0
}

const grid = document.querySelector('.grid')
function setupBoard(dimension) { // dimension is length of one side of square grid
    grid.innerHTML = '';
    [...Array(dimension**2).keys()].forEach(i => {
        grid.innerHTML += `
        <div class="cell ${className(i)}" 
        id="${i}">
        </div>`;
    })
}
setupBoard(state.edge)

function initClock (tick) {
    state.timer = tick
    clearInterval(state.interval)
    state.interval = setInterval(update, tick)
}
initClock(400)

function className(id) {
    return id ? 'grass' : 'road'
}

const resume = document.querySelector('#resume')
const pause = document.querySelector('#pause')
const reset = document.querySelector('#reset')

resume.addEventListener('click', () => state.playing = true)
pause.addEventListener('click', () => state.playing = false)
reset.addEventListener('click', () => {
    
    initClock(400)
    state.playing = true
})

function update(){
    if(!state.playing) return

}

setInterval(update, state.timer)