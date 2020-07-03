const grid = document.querySelector('.grid')
const restart = document.querySelector('.restart')
const squares = document.querySelectorAll('.square')
const score = document.querySelector('.score')
let clock = document.querySelector('.clock')
let whacks = document.querySelector('.whacks')
restart.addEventListener('click', resetGame)

let state = {
    playing: true,
    whacks: 0,
    score: 0,
    time: 30,
    gameClock: setInterval(updateClock, 1000)
}
clock.innerText = state.time

function resetGame() {
    grid.classList.remove('paused')
    state = {
        playing: true,
        whacks: 0,
        score: 0,
        time: 30
    }
    moveMole(Math.random())
    state.gameClock = setInterval(updateClock, 1000)
}

function randomSquare() {
    squares.forEach(s => s.className = 'square')
    let index = Math.floor(Math.random() * squares.length)
    squares[index].classList.add('mole')
}

function detectCollision(event) {
    state.whacks += 1
    if(event.target.classList.value.includes('mole')) {
        event.target.classList.add('hit')
        state.score += 1
    } else {
        event.target.classList.add('missed')
    }
}

grid.addEventListener('click', detectCollision)

function moveMole(num) {
    if(!state.playing) return
    let timer = null
    timer = setTimeout(() => {
        randomSquare()
        clearTimeout(timer)
        moveMole(Math.random())
    }, num*850+350)

}

moveMole(Math.random())

function updateClock () {
    clock.innerText = state.time
    score.innerText = state.score
    whacks.innerText = state.whacks
    if(state.time <= 0) state.playing = false
    if(state.playing) {
        state.time -= Math.min(1, state.time)
        return
    } else {
        grid.classList.add('paused')
        let message = `
        GAME OVER! 
        Your final score is ${state.score} 
        Your accuracy is ${(state.score/(state.whacks||1) * 100).toFixed(1)}%
        `
        setTimeout(() => alert(message), 850)
    }
    return window.clearInterval(state.gameClock)
}