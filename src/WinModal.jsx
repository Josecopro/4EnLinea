import './WinModal.css'
import { GameType } from './GameType'

const WinModal = ({ winner, onReset }) => {
  if (!winner) return null

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>El jugador {winner} es el ganador!</h2>
        <button onClick={onReset}>Jugar otra vez</button>
      </div>
    </div>
  )
}

export  {WinModal}