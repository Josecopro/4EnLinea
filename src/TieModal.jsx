import './TieModal.css'

const TieModal = ({ isTie, onReset }) => {
  if (!isTie) return null

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>It's a tie!</h2>
        <button onClick={onReset}>Play Again</button>
      </div>
    </div>
  )
}

export { TieModal }