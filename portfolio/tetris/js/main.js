const canvas = document.getElementById('tetris')
const ctx = canvas.getContext('2d')
const scoreEl = document.getElementById('score')
let score = 0;
let gameOver = false;

const board = {
    row: 22,
    col: 10,
    size: 20,
    empty: 'white',
    init () {
       return Array(this.row).fill(false).map(i => {
           var y = 0
           return Array(this.col).fill(false).map(i => y++)
       }) 
    }, 
    draw (brd) {
        brd.forEach((r, index) => {
            r.forEach(c => {
                drawSquare(c, index, this.empty)
            })
        })
    }
}
const gameBoard = board.init()
board.draw(gameBoard)

function drawSquare( x, y, color) {
    ctx.fillStyle = color
    ctx.fillRect(x*board.size, y*board.size, board.size, board.size)
    ctx.strokeStyle = 'grey'
    ctx.strokeRect(x*board.size, y*board.size, board.size, board.size)
    return;
}

function randType() {
    return types[Math.floor(Math.random() * types.length)]
}

let proto = getTetromino(randType())
let origin = {x: 5, y: 0}
let current = initTetromino(proto, origin)

function initTetromino(tetromino, pos){
    return {
        type: tetromino.type,
        color: tetromino.color,
        direction: 'up',
        position: tetromino.up.map(cell => {
            return [cell[0] + pos.x, cell[1] + pos.y]
        })
    } 
}

const draw = function(tetromino, flag = 0){
    // if(didCollide(tetromino)) return;
    tetromino.position.forEach(i => {
        drawSquare([i[0]], [i[1]], flag ? 'white' : tetromino.color)
    })
    return;
}
function move(tetromino, nudge = 0) {
    if(didCollide(tetromino) === true) {
        didCollide(tetromino)
        return current = initTetromino(getTetromino(randType()), origin)
    } else {
        let increment = nudge ? [0, 0] : [0, 1]
        increment[0] += nudge; // nudge will be 0 by default, -1 for left; +1 for right
        console.log(increment[0])
        draw(tetromino, 1) // erase old tetromino
        tetromino = {
            type: tetromino.type,
            color: tetromino.color,
            direction: tetromino.direction,
            position: tetromino.position.map(cell => [cell[0] + increment[0], cell[1] + increment[1]])
        }
        draw(tetromino) //draw new tetromino
        return tetromino;
    }
}

function rotate(tetromino) {
    let directions = ['up', 'right', 'down', 'left']
    let next = directions.indexOf(tetromino.direction) + 1
    console.log(next)
    let rotateTo = next === 4 ? 'up' : directions[next]
    draw(tetromino, 1)
    tetromino.direction = rotateTo;
    let posAdjustment = getTetromino(tetromino.type)[rotateTo]
    tetromino.position = posAdjustment.map(i => [tetromino.position[2][0]+i[0], tetromino.position[2][1]+i[1]])
    draw(tetromino)
    return tetromino;
}

function didCollide(tetromino) {
    let sliced = tetromino.position.filter(i=> i[0]<=0 )
    let hooked = tetromino.position.filter(i=> i[0]>=9)
    let floored = tetromino.position.filter(i=> i[1]>=21)
    console.log(sliced, hooked, floored)
    if (sliced.length > 0) {
        return 'sliced'
    } else if (hooked.length > 0) {
        return 'hooked'
    } else if (floored.length > 0) {
        return true
    }
    return false;
}

draw(current)

let start = Date.now()

function driftIO() {
    let now = Date.now()
    if(gameOver) { return }
    if((now - start) > 1000) {
        start = Date.now()
        current = move(current)
    }
    requestAnimationFrame(driftIO)
}

driftIO()


document.addEventListener('keydown', function(e){    
    let negate = didCollide(current) // negate nudge if tetromino didCollide
    if(e.which === 37 && negate !== 'sliced') {
        current = move(current, -1)
        
    } else if (e.which === 39 && negate !== 'hooked') {
        current = move(current, 1)
       
    } else if (e.which === 38) {
        current = rotate(current)
       
    } else if (e.which === 40) {
        current = move(current)
        
    }
})