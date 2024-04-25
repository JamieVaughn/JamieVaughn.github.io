import {
  useState,
} from "react";

import calculateWinner from "./util.mjs"
// import styles from "./style.module.css"
import "./style.module.css"

const Square = ({ onClick, value }) => (
  <button className={styles.square} onClick={onClick}>{value}</button>
)

const Board = ({ onClick, squares }) => (
  <div className={styles.board}>
    {squares.map((s, i) => <Square key={s+i} value={s} onClick={() => onClick(i)} />)}
  </div>
)


const Game = props => {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [step, setStep] = useState(0)
  const [xIsNext, setXIsNext] = useState(true)
  const winner = calculateWinner(history[step])

  const handleClick = i => {
    const timeInHistory = history.slice(0, step + 1)
    const current = timeInHistory[step]
    const squares = [...current]
    if(winner || squares[i]) return
    squares[i] = xIsNext ? 'X' : 'O'
    setHistory([...timeInHistory, squares])
    setStep(timeInHistory.length)
    setXIsNext(!xIsNext)
  }

  const jumpTo = step => {
    setStep(step)
    if(step === 0) setHistory([Array(9).fill(null)])
    setXIsNext(step % 2 === 0)
  }

  const renderMoves = () => {
    return history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : 'Reset'
      return (
        <li key={_step+move} style={{listStyle: 'none'}}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      )
    })
  }

  return (
    <>
      <Board onClick={handleClick} squares={history[step]}/>
      <div className={styles.players}>
        <p>{winner ? 'Winner: ' + winner : 'Next Player: ' + (xIsNext ? 'Xs' : 'Os')}</p>
        {!!step && renderMoves()}
      </div>
    </>
  )
}

export default function TicTacToe() {
    return (
        <Game />
    )
}

