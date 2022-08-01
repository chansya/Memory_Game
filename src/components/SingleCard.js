import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disabled }) {

  const handleClick = () => {
    // handle the click only when disabled is false
    if (!disabled){
        handleChoice(card)
    }
  }

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img className="back" src="/img/hong-kong-flag.png" onClick={handleClick} alt="cover" />
      </div>
    </div>
  )
}