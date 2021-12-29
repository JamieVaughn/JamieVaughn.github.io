// https://github.com/carpben/TicTacToe/blob/master/tictactoe.js
// https://github.com/ahmadabdolsaheb/minimaxarticle/blob/master/index.js

// board Map
//  0 |1 |2 |3
//  4 |5 |6 |7
//  8 |9 |10|11
//  12|13|14|15
const winConditions = [
  //all boxes
  [0, 1, 4, 5],
  [1, 2, 5, 6],
  [2, 3, 6, 7],
  [4, 5, 8, 9],
  [5, 6, 9, 10],
  [6, 7, 10, 11],
  [8, 9, 12, 13],
  [9, 10, 13, 14],
  [10, 11, 14, 15],
  //all vertical lines
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  //all horizontal lines
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  //all diagonals
  [0, 5, 10, 15],
  [3, 6, 9, 12]
];

const getMoveCount = squares => squares.filter(s => s !== null).length
const getAvailableMoves = squares => squares.reduce((acc, cur, index) => {
  if(cur === null) acc.push(index)
  return acc
}, [])
const getSymbolIndices = (squares, symbol = null) => squares.reduce((acc, cur, index) => {
  if(cur === symbol) acc.push(index)
  return acc
}, [])
const getShuffledArray = array => array.sort(() => Math.random() - 0.5)
const getUnion = (a, b) => [...new Set([...a, ...b])]
const getIntersection = (a, b) => a.filter(i => b.includes(i))
const getDifference = (a, b) => a.filter(i => !b.includes(i))
const getSymetricDif = (a, b) => a.filter(i => !b.includes(i)).concat(b.filter(j => !a.includes(j))) // XOR
const findNearWins = async (squares, symbol) => {
  let nearWins = []
  let moves = []
  let taken = getSymbolIndices(squares, symbol)
  winConditions.forEach(win => {
    let threat = getIntersection(win, taken)
    let open = getIntersection(win, getAvailableMoves(squares))
    if(threat.length === 3 && open.length === 1) {
      nearWins.push(win)
      moves.push(...open)
    }
  })
  console.log('nearWins', {moves})
  return Promise.resolve({
    move: moves[0] ?? null,
    nearWins
  })
}

const findThreats = squares => null

function calculateWinner(squares, symbol) {
  if (getMoveCount(squares) < 7){
    return null
  }
  for (let i = 0; i < winConditions.length; i++) {
    if (winConditions[i].every(pos => squares[pos] === symbol)) {
      return {
        winner: symbol,
        squares: winConditions[i]
      }
    } 
  }
  return {
    winner: null,
    squares: []
  }
}

function calculateNearWin(squares, symbol) {
  if (getMoveCount(squares) < 6){
    return null
  }
  const threats = squares.reduce((acc, cur, index) => {
    if(cur === symbol) acc.push(index)
    return acc
  }, [])
  let blocks = []
  for (let i = 0; i < winConditions.length; i++) {
    for(let j = 0; j < threats.length; j++) {
      if (
        winConditions[i].includes(j) 
        && winConditions[i].every(pos => squares[pos] === symbol || squares[pos] === null)
      ) {
        blocks = winConditions[i].filter(pos => squares[pos] === null)
        return {
          move: blocks[0],
          score: 1
        }
      }
    }
  }
  return {
    winner: null,
    squares: []
  }
}

function getBestMove (squares, symbol){
  // Receives a board, and next player's symbol 
  // Returns move position & expected value (1-for winning, 0 for tie, and -1 for losing)

  let availableMoves = getAvailableMoves(squares)
  let availableMovesAndScores = []
  console.log({availableMoves})
  let block = findNearWins(squares, symbol)
  console.log({block})
  if(block) {
    return block
  }

  for (var i=0 ; i<availableMoves.length ; i++){
    // Iterates over each available move. If it finds a winning move it returns it immediately. Otherwise it pushes a move and a score to the availableMovesAndScores array.
    let newSquares = [...squares]
    newSquares[i] = symbol
    
    let result = calculateWinner(newSquares, symbol)
    let score
    if (result?.winner == symbol) {
      console.log('bestMove', 'win', result)
      score = 1
    } else if (result?.winner === null) {
      console.log('bestMove', 'tie', result)
      score = 0
    } else {
      console.log('bestMove', 'recurse', result)
      let otherSymbol = symbol === "X" ? "O": "X"
      nextMove = getBestMove(newSquares, otherSymbol)
      score = (nextMove.score)
    }
    console.log('bestMoves', availableMovesAndScores)
    if(score === 1) return {i, score}
    availableMovesAndScores.push({move: i, score})
  }

  const nextMovesAndScores = getShuffledArray(availableMovesAndScores)

  nextMovesAndScores.sort((moveA, moveB )=>{
      return moveB.score - moveA.score
    })
  return nextMovesAndScores[0]
}
