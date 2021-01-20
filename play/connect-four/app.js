// const board = [
//     [0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0],
//     [3, 3, 3, 3, 3, 3, 3],
// ]
// ^TODO: calculate win state based on matrix

const grid = document.querySelector('.grid')
function genBoard() {
    const spaces = [...Array(49).keys()]
    spaces.forEach(k => {
        let div = document.createElement('div')
        if(k > 41) div.classList.add('taken')
        grid.appendChild(div)
    })
}
genBoard()


const displayResult = document.querySelector('.result')
const player = document.querySelector('.player')
const restart = document.querySelector('.restart')
let curPlayer = 1

function handleClicks(){
    const squares = document.querySelectorAll('.grid div')
    squares.forEach((s, i) => {
        s.onclick = function() {
            let bottom = findBottom(i, squares)
            console.log(bottom - i)
            console.log(squares[bottom].style)
            if(s.classList.contains('taken')){ 
                return alert('That space is taken')
            } else {
                let turn = curPlayer === 1 ? 'one' : 'two'
                squares[bottom].style.transform = `translateY(-${((bottom - i) * 7) + 7}px)`
                squares[bottom].classList.add('taken')
                squares[bottom].classList.add(`player-${turn}`)
                setTimeout(() => {
                    squares[bottom].style.transform = `translateY(0px)`
                    squares[bottom].style.opacity = `1`
                }, 200)
            }
            let result = checkForWin(curPlayer, squares)
            // console.log('result', result)
            if(Array.isArray(result[0])) {
                grid.classList.add('inert')
                displayResult.innerHTML = `Player ${result[1]} Wins!`
            }
            curPlayer = curPlayer === 1 ? 2 : 1
            player.innerHTML = curPlayer
        }
    })
}
handleClicks()

function findBottom(index, nodes){
    return Array.from(nodes)
            .map((n, i) => [n, i])
            .filter((s,  i) => (
                s[0].classList.contains('taken') &&
                i%7 === index%7
              )
            ).slice(0, 1)[0][1] - 7
}

restart.addEventListener('click', restartGame)
function restartGame(){
    grid.innerHTML = ''
    genBoard()
    handleClicks()
    displayResult.innerHTML = '&zwnj;'
    grid.classList.remove('inert')

}

const winningArrays = [
    [0, 1, 2, 3], [41, 40, 39, 38], [7, 8, 9, 10], [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24], [21, 22, 23, 24],
    [20, 19, 18, 17], [28, 29, 30, 31], [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3], [0, 7, 14, 21], [41, 34, 27, 20],
    [1, 8, 15, 22], [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18], [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25],
    [37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15], [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24], [41, 33, 25, 17],
    [7, 15, 23, 31], [34, 26, 18, 10], [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17], [6, 12, 18, 24], [28, 22, 16, 10],
    [13, 19, 25, 31], [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18], [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22],
    [2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25], [40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32], [11, 7, 23, 29],
    [12, 18, 24, 30], [1, 2, 3, 4], [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9], [15, 16, 17, 18], [19, 18, 17, 16],
    [22, 23, 24, 25], [26, 25, 24, 23], [29, 30, 31, 32], [33, 32, 31, 30], [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28],
    [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31], [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34]
    ];

function checkForWin(turn, nodes) {
    let player  = turn === 1 ? 'one' : 'two'
    let win = winningArrays.find(w => {
        return w.filter(i => nodes[i].classList.contains(`player-${player}`)).length === 4
    })
    // console.log('win', win, turn)
    return win ? [win, turn] : false
}