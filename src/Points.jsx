import './Points.css'

const Points = ({ points }) => {
  return (
    <div className="points">
      <h2>Puntos</h2>
      <div className="points-container">
        <div className="player-points">
          <span>Rojo: {points.rojo}</span>
        </div>
        <div className="player-points">
          <span>Amarillo: {points.amarillo}</span>
        </div>
      </div>
    </div>
  )
}

export { Points }