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

function calculateWinner(squares) {
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c, d] = winConditions[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c] &&
      squares[a] === squares[d]
    ) {
      return {
        winner: squares[a],
        squares: winConditions[i]
      }
    } 
  }
  return null
}

function getResult (board, symbol) {
  let result = RESULT.incomplete
  if (moveCount(board)<7){
    {result}
  }
  function succession (line){
    return (line === symbol.repeat(4))
  }
  let line
  let winningLine=[]
  //first we check win conditions
  for (var i = 0 ; i<4 ; i++){
    line = board[i].join('')
    if(succession(line)){
      result = symbol;
      winningLine = [[i,0], [i,1], [i,2]]
      return {result, winningLine};
    }
  }
  // Check for tie
  if (moveCount(board) === 16){
    result=RESULT.tie
    return {result, winningLine}
  }

  return {result}
}

function getBestMove () {

}
