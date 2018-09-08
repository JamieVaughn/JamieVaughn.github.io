const canvas = document.getElementById('tetris')
const ctx = canvas.getContext('2d')
const scoreEl = document.getElementById('score')
let score = 0;
let gameOver = false;
let start = Date.now()
const gameBoard = board.init()
board.draw(gameBoard)
let proto = getTetromino(randType())
let origin = {x: 5, y: -3}
let current = initTetromino(proto, origin)
draw(current)
driftIO()

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

function draw(tetromino, flag = 0){
    tetromino.position.forEach(i => {
        drawSquare([i[0]], [i[1]], flag ? 'white' : tetromino.color)
    })
    return;
}

function move(tetromino, nudge = 0) {
    if(gameOver) return tetromino;
    if(didCollide(tetromino) === true) {
       let indices = tetromino.position.map(i=>i[1]);
       let vals = tetromino.position.map(i=>i[0]);
       [0,1,2,3].forEach(i => board.occupied[indices[i]] += (vals[i]));
        console.log(board.occupied);
        return current = initTetromino(getTetromino(randType()), origin)
    } else {
        let increment = nudge ? [0, 0] : [0, 1]
        increment[0] += nudge; // nudge will be 0 by default, -1 for left; +1 for right
        // console.log(increment[0])
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
    let posAdjustment = getTetromino(tetromino.type)[rotateTo].map(i => [tetromino.position[2][0]+i[0], tetromino.position[2][1]+i[1]])
    
    if(posAdjustment.map(i=> i[0]).some((i=> i < 0) )) {
        console.log('bounds', tetromino.position);
        posAdjustment = posAdjustment.map((i,index) => [i[index][0]+1, i[index][1]])
    }
    if(posAdjustment.map(i=> i[0]).some((i=> i > 9) )) {
        console.log('bounds', tetromino.position);
        posAdjustment = posAdjustment.map((i,index) => [i[index][0]-1, i[index][1]])
    }
    tetromino.position = posAdjustment
    draw(tetromino)
    return tetromino;
}

function didCollide(tetromino) {
    let sliced = tetromino.position.filter(i=> i[0]<=0 )
    let hooked = tetromino.position.filter(i=> i[0]>=9)
    // tetromino.position.forEach(i=>console.log(i, board.occupied))
    let floored = tetromino.position.filter(i=> i[1]>=21)
    let stuck = false;
    board.occupied.forEach(i => {
        if( tetromino.position[0][0] === i[0] && tetromino.position[0][1]+1 === i[1] ||
            tetromino.position[1][0] === i[0] && tetromino.position[1][1]+1 === i[1] ||
            tetromino.position[2][0] === i[0] && tetromino.position[2][1]+1 === i[1] ||
            tetromino.position[3][0] === i[0] && tetromino.position[3][1]+1 === i[1] ) {
                stuck = true
            }
    }) 
    // stuck = tuplesInMatrix(tetromino.position, board.occupied)
    let spilled = tetromino.position.filter(i=> i[1]<0)
    if (spilled.length > 0 && stuck) {
        gameOver = true;
    } else if (floored.length > 0 || stuck) {
        floored = [];
        return true
    } else if (hooked.length > 0) {
        hooked = []
        return 'hooked'
    } else if (sliced.length > 0) {
        sliced = []
        return 'sliced'
    }
    return false;
}

function tuplesInMatrix(tuples, matrix) {
    matrix.forEach(i => {
        if( tuples[0][0] === i[0] && tuples[0][1]+1 === i[1] ||
            tuples[1][0] === i[0] && tuples[1][1]+1 === i[1] ||
            tuples[2][0] === i[0] && tuples[2][1]+1 === i[1] ||
            tuples[3][0] === i[0] && tuples[3][1]+1 === i[1] ) {
                stuck = true
            }
    }) 
    return false
};

function driftIO() {
    let now = Date.now()
    if(gameOver) { return }
    if((now - start) > 1000) {
        start = Date.now()
        current = move(current)
        
    }
    if(!gameOver) {
        requestAnimationFrame(driftIO)
    }
    
}

document.addEventListener('keydown', function(e){    
    let negate = didCollide(current) // negate nudge if tetromino didCollide
    if(e.which === 37 && negate !== 'sliced') {
        current = move(current, -1)
        
    } else if (e.which === 39 && negate !== 'hooked') {
        current = move(current, 1)
       
    } else if (e.which === 38 && negate !== 'sliced' && negate !== 'hooked') {
        current = rotate(current)
       
    } else if (e.which === 40 && negate !== true) {
        current = move(current)
        
    }
})