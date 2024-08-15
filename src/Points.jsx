import './Points.css'

const Points = ({ points }) => {
  return (
    <div className="points">
      <h2>Points</h2>
      <div className="points-container">
        <div className="player-points">
          <span>Red: {points.red}</span>
        </div>
        <div className="player-points">
          <span>Yellow: {points.yellow}</span>
        </div>
      </div>
    </div>
  )
}

export { Points }