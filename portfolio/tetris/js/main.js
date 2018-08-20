const canvas = document.getElementById('tetris')
const ctx = canvas.getContext('2d')
const scoreEl = document.getElementById('score')
let score = 0;
let gameOver = false;

const board = {
    row: 20,
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
        // for( r = 0; r <this.row; r++){
        //     for(c = 0; c < this.col; c++){
        //         drawSquare(c,r,this.empty);
        //     }
        // }
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

let p = getTetromino(randType())
let current = initTetromino(p, {x: 5, y: 1})

function initTetromino(tetromino, pos){
    return {
        color: tetromino.color,
        position: tetromino.up.map(cell => {
            return [cell[0] + pos.x, cell[1] + pos.y]
        })
    } 
}

const draw = function(tetromino, flag = 0){
    tetromino.position.forEach(i => {
        drawSquare([i[0]], [i[1]], flag ? 'white' : tetromino.color)
    })
    return;
}
function move(tetromino, nudge = 0) {
    console.log(tetromino.position[3])
    let increment = nudge ? [0, 0] : [0, 1]
    increment[0] += nudge // nudge will be 0 by default, -1 for left; +1 for right
    draw(current, 1)
    current = {
        color: tetromino.color,
        position: tetromino.position.map(cell => [cell[0] + increment[0], cell[1] + increment[1]])
    }
    return current
}

function rotate(tetromino) {
    return;
}

draw(current)

let start = Date.now()

function driftIO() {
    let now = Date.now()
    if(gameOver) { return }
    if((now - start) > 1000) {
        start = Date.now()
        move(current)
        draw(current)
        
    }
    requestAnimationFrame(driftIO)
}

driftIO()


document.addEventListener('keydown', function(e){
    if(e.which === 37) {
        move(current, -1)
        draw(current)
    } else if (e.which === 39) {
        move(current, 1)
        draw(current)
    } else if (e.which === 38) {
        rotate(current)
        draw(current)
    }

})