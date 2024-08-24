import './GameType.css'

const GameType = ({ onSelect }) => {
  return (
    <>     
    <button className='GameType__Button' onClick={() => onSelect(4)}>4x4</button>
    <button className='GameType__Button' onClick={() => onSelect(6)}>6x6</button>
    </> 
  )
}

export { GameType }