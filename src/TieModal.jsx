import './TieModal.css'

const TieModal = ({ isTie, onReset }) => {
  if (!isTie) return null

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>¡Empate!</h2>
        <button onClick={onReset}>Jugar otra vez</button>
      </div>
    </div>
  )
}

export { TieModal }