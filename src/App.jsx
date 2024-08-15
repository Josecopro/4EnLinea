import { useState } from 'react'
import './App.css'
import { WinModal } from './WinModal.jsx'
import { TieModal } from './TieModal.jsx'
import { Points } from './Points.jsx'

function App() {
  const [boardSize, setBoardSize] = useState(6)
  const [board, setBoard] = useState(Array.from({ length: boardSize }, () => Array(boardSize).fill(null)))
  const [currentPlayer, setCurrentPlayer] = useState('red')
  const [winner, setWinner] = useState(null)
  const [isTie, setIsTie] = useState(false)
  const [points, setPoints] = useState({ red: 0, yellow: 0 })
  const [lastWinner, setLastWinner] = useState(null)

  const handleColumnClick = (columnIndex) => {
    if (winner || isTie) return

    // Check if the column is already full
    if (board[0][columnIndex] !== null) {
      return
    }

    // Find the first available row in the clicked column
    let rowIndex = boardSize - 1
    while (rowIndex >= 0 && board[rowIndex][columnIndex] !== null) {
      rowIndex--
    }

    // Update the board with the current player's color
    const updatedBoard = board.map(row => [...row])
    updatedBoard[rowIndex][columnIndex] = currentPlayer
    setBoard(updatedBoard)

    // Check for a win
    if (checkForWin(updatedBoard, rowIndex, columnIndex, currentPlayer)) {
      setWinner(currentPlayer)
      updatePoints(currentPlayer)
    } else if (checkForTie(updatedBoard)) {
      setIsTie(true)
    } else {
      // Switch to the next player
      setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red')
    }
  }

  const checkForWin = (board, row, col, player) => {
    return (
      checkDirection(board, row, col, player, 1, 0) ||
      checkDirection(board, row, col, player, 0, 1) || 
      checkDirection(board, row, col, player, 1, 1) || 
      checkDirection(board, row, col, player, 1, -1)   
    )
  }

  const checkDirection = (board, row, col, player, rowDir, colDir) => {
    let count = 0
    // Check in the positive direction
    for (let i = 0; i < 4; i++) {
      const r = row + i * rowDir
      const c = col + i * colDir
      if (r >= 0 && r < boardSize && c >= 0 && c < boardSize && board[r][c] === player) {
        count++
      } else {
        break
      }
    }
    // Check in the negative direction
    for (let i = 1; i < 4; i++) {
      const r = row - i * rowDir
      const c = col - i * colDir
      if (r >= 0 && r < boardSize && c >= 0 && c < boardSize && board[r][c] === player) {
        count++
      } else {
        break
      }
    }
    return count >= 4
  }

  const checkForTie = (board) => {
    return board.every(row => row.every(cell => cell !== null))
  }

  const updatePoints = (winner) => {
    setPoints(prevPoints => {
      const newPoints = { ...prevPoints }
      if (lastWinner === winner) {
        newPoints[winner] *= 3
      } else {
        newPoints[winner] += 1
      }
      return newPoints
    })
    setLastWinner(winner)
  }

  const resetGame = (size = boardSize) => {
    setBoardSize(size)
    setBoard(Array.from({ length: size }, () => Array(size).fill(null)))
    setCurrentPlayer('red')
    setWinner(null)
    setIsTie(false)
  }

  return (
    <div className="App">
      <h1>4 en linea</h1>
      <Points points={points} />
      <WinModal winner={winner} onReset={() => resetGame(boardSize)} />
      <TieModal isTie={isTie} onReset={() => resetGame(boardSize)} />
      <div>
        <button onClick={() => resetGame(4)}>4x4</button>
        <button onClick={() => resetGame(6)}>6x6</button>
      </div>
      <div className="board" style={{ gridTemplateRows: `repeat(${boardSize}, 1fr)`, gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, columnIndex) => (
              <div
                key={columnIndex}
                className={`cell ${cell}`}
                onClick={() => handleColumnClick(columnIndex)}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App