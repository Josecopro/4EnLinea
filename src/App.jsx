import { useState } from 'react';
import './App.css';
import { WinModal } from './WinModal.jsx';
import { TieModal } from './TieModal.jsx';
import { Points } from './Points.jsx';
import { GameType } from './GameType.jsx';

function App() {
  const [boardSize, setBoardSize] = useState(6);
  const [board, setBoard] = useState(Array.from({ length: boardSize }, () => Array(boardSize).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('rojo');
  const [winner, setWinner] = useState(null);
  const [isTie, setIsTie] = useState(false);
  const [points, setPoints] = useState({ rojo: 0, amarillo: 0 });
  const [lastWinner, setLastWinner] = useState(null);
  const [gameStarted, setGameStarted] = useState(true);
  const [hasFirstMove, setHasFirstMove] = useState(false);


  const handleColumnClick = (columnIndex) => {
    if (winner || isTie) return;
    
    if (!hasFirstMove) {
      setHasFirstMove(true);
      console.log('First move made!');
    }

    // Check if the column is already full
    if (board[0][columnIndex] !== null) {
      return;
    }

    // Find the first available row in the clicked column
    let rowIndex = boardSize - 1;
    while (rowIndex >= 0 && board[rowIndex][columnIndex] !== null) {
      rowIndex--;
    }

    // Update the board with the current player's color
    const updatedBoard = board.map(row => [...row]);
    updatedBoard[rowIndex][columnIndex] = currentPlayer;
    setBoard(updatedBoard);

    // Check for a win
    if (checkForWin(updatedBoard, rowIndex, columnIndex, currentPlayer)) {
      setWinner(currentPlayer);
      updatePoints(currentPlayer);
    } else if (checkForProactiveTie(updatedBoard)) {
      setIsTie(true);
    } else {
      // Switch to the next player
      setCurrentPlayer(currentPlayer === 'rojo' ? 'amarillo' : 'rojo');
    }
  };

  const checkForWin = (board, row, col, player) => {
    const winCondition = Math.min(boardSize, 4); // Adjust win condition based on board size
    return (
      checkDirection(board, row, col, player, 1, 0, winCondition) || // Horizontal
      checkDirection(board, row, col, player, 0, 1, winCondition) || // Vertical
      checkDirection(board, row, col, player, 1, 1, winCondition) || // Diagonal /
      checkDirection(board, row, col, player, 1, -1, winCondition)   // Diagonal \
    );
  };

  const checkDirection = (board, row, col, player, rowDir, colDir, winCondition) => {
    let count = 0;
    // Check in the positive direction
    for (let i = 0; i < winCondition; i++) {
      const r = row + i * rowDir;
      const c = col + i * colDir;
      if (r >= 0 && r < boardSize && c >= 0 && c < boardSize && board[r][c] === player) {
        count++;
      } else {
        break;
      }
    }
    // Check in the negative direction
    for (let i = 1; i < winCondition; i++) {
      const r = row - i * rowDir;
      const c = col - i * colDir;
      if (r >= 0 && r < boardSize && c >= 0 && c < boardSize && board[r][c] === player) {
        count++;
      } else {
        break;
      }
    }
    return count >= winCondition;
  };

  const checkForProactiveTie = (board) => {
    for (let rowIndex = 0; rowIndex < boardSize; rowIndex++) {
      for (let colIndex = 0; colIndex < boardSize; colIndex++) {
        if (board[rowIndex][colIndex] === null) {
          // Verificar si es posible ganar a partir de esta celda vacía
          if (checkPossibleWin(board, rowIndex, colIndex)) {
            return false;  // Aún es posible ganar, no es empate
          }
        }
      }
    }
    return true;  // No es posible ganar, es empate
  };

  const checkPossibleWin = (board, row, col) => {
    const directions = [
      { rowDir: 1, colDir: 0 },  // Vertical
      { rowDir: 0, colDir: 1 },  // Horizontal
      { rowDir: 1, colDir: 1 },  // Diagonal /
      { rowDir: 1, colDir: -1 }  // Diagonal \
    ];
  
    for (const { rowDir, colDir } of directions) {
      let count = 1;
  
      // Contar en la dirección positiva
      count += countInDirection(board, row, col, rowDir, colDir);
  
      // Contar en la dirección negativa
      count += countInDirection(board, row, col, -rowDir, -colDir);
  
      if (count >= 4) {
        return true;  // Aún es posible ganar en esta dirección
      }
    }
  
    return false;  // No es posible ganar en ninguna dirección desde esta celda
  };

  const countInDirection = (board, row, col, rowDir, colDir) => {
    let count = 0;
    let r = row + rowDir;
    let c = col + colDir;
  
    while (r >= 0 && r < boardSize && c >= 0 && c < boardSize && board[r][c] === null) {
      count++;
      r += rowDir;
      c += colDir;
    }
  
    return count;
  };

  const updatePoints = (winner) => {
    setPoints(prevPoints => {
      const newPoints = { ...prevPoints };
      if (lastWinner === winner) {
        newPoints[winner] *= 3;
      } else {
        newPoints[winner] += 1;
      }
      return newPoints;
    });
    setLastWinner(winner);
  };

  const resetGame = (size) => {
    setBoardSize(size);
    setBoard(Array.from({ length: size }, () => Array(size).fill(null)));
    setCurrentPlayer(winner ? winner : 'rojo');
    setWinner(null);
    setIsTie(false);
    setGameStarted(true);
    hasFirstMove && setHasFirstMove(false);
  };

  return (
    <div className="App">
      <h1>4 en linea</h1>
      <Points points={points} />
      <WinModal winner={winner} onReset={() => resetGame(boardSize)} />
      <TieModal isTie={isTie} onReset={() => resetGame(boardSize)} />
      {gameStarted && (
        <div className="board" style={{ '--board-size': boardSize }}>
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
      )}
      <div className="GameType">
        {!hasFirstMove && <GameType onSelect={resetGame} />}
      </div>
    </div>
  );
}

export default App;