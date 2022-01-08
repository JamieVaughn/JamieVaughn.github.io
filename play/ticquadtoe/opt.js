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

// refactor with different data structure for X & O's
const gameState = {
  sequence: [], // Array<move: {pos: number, piece: 'X' | 'O'}>
  wins: [...winConditions],
  // X: [],
  // O: [],
  // taken: [],
  // open: range(16),
}
// use diff, symDiff, union etc to quickly find AI next move with finding threats or nearWins
// instead of random starting spots, try to create the T geometry
// X _ X  ==> X X X
// _ X _      _ X _

const range = (num) => Array(num).fill(null).map((_, i) => i)
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
const contains = (a, b) => a.every(i => b.includes(i))

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
  return Promise.resolve({
    move: moves[0] ?? null,
    nearWins
  })
}

const findThreats = async (squares, symbol) => {
  let surrounded = []
  for(let i = 1; i < squares.length - 1; i++) {
    if(
      squares[i] === null &&
      [squares[i - 1], squares[i + 1], squares[i - 4], squares[i + 4]]
        .filter(s => s === symbol).length >= 3
    ) { surrounded.push(i)}
  }
  return surrounded
}
const findSetup = async (squares) => {
  let setup = []
  for(let i = 1; i < squares.length - 1; i++) {
    let pieces = [squares[i - 4], squares[i - 1], squares[i + 1], squares[i + 4]]
    let Opieces = pieces.filter(s => s === "O")
    let indices = [i - 4, i - 1, i + 1, i + 4]
    if(
      squares[i] === null &&
      Opieces.length === 2
    ) { 
      setup.push(...indices.filter((j, k) => pieces[k] === null))
    }
  }
  return setup
}

function calculateWinner(sequence, symbol) {
  if (getMoveCount(sequence) < 4) return null
  const squares = sequence.filter(move => move.piece === symbol).map(i => i.pos)
  console.log('sq', squares)
  let condition = winConditions.filter(w => contains(w, squares))
  let winner = null
  if (condition.length) winner = symbol
  return {
    winner,
    squares: condition[0]
  }
}

// is this redundant with findNearWins?
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


