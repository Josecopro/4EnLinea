import { useState } from 'react'
import './App.css'
import {WinModal} from './WinModal.jsx'

function App() {
  const [board, setBoard] = useState(Array.from({ length: 6 }, () => Array(7).fill(null)))
  const [currentPlayer, setCurrentPlayer] = useState('red')
  const [winner, setWinner] = useState(null)

  const handleColumnClick = (columnIndex) => {
    if (winner) return

    // Check if the column is already full
    if (board[0][columnIndex] !== null) {
      return
    }

    // Find the first available row in the clicked column
    let rowIndex = 5
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
      if (r >= 0 && r < 6 && c >= 0 && c < 7 && board[r][c] === player) {
        count++
      } else {
        break
      }
    }

    // Check in the negative direction
    for (let i = 1; i < 4; i++) {
      const r = row - i * rowDir
      const c = col - i * colDir
      if (r >= 0 && r < 6 && c >= 0 && c < 7 && board[r][c] === player) {
        count++
      } else {
        break
      }
    }

    return count >= 4
  }

  const resetGame = () => {
    setBoard(Array.from({ length: 6 }, () => Array(7).fill(null)))
    setCurrentPlayer('red')
    setWinner(null)
  }

  return (
    <div className="App">
      <h1>4 en linea</h1>
      <WinModal winner={winner} onReset={resetGame} />
      <div className="board">
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