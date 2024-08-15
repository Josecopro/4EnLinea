import './WinModal.css'

const WinModal = ({ winner, onReset }) => {
  if (!winner) return null

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{winner} wins!</h2>
        <button onClick={onReset}>Play Again</button>
      </div>
    </div>
  )
}

export  {WinModal}