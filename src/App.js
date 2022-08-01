import './App.css';
import { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';

// array of cards is constant & not going to change 
// no need to be stored inside component state & re-evaluated every time the component is re-rendered

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
]


function App() {

  // create states for cards and turns
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  // keep tracks of user's choices
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)


  // shuffle cards at the beginning of a game 
  const shuffleCards = () => {
    // spread the cards twice to duplicate the cards
    const shuffledCards = [...cardImages, ...cardImages]
      // fire a function for each pair of items in the array
      // if less than 0, order of items stay the same; if > 0 then order is reversed
      .sort(() => Math.random() - 0.5 )
      // map the above(shuffled array), for each item we create new arr and
      // add 'id' property to the card object(with 'src' property in it)
      .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    // update card state to be the shuffled cards
    setCards(shuffledCards)
    // reset turns to 0 
    setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) =>{
    // tenary operator(if ? action for true: action for false)
    // if there is a value for choiceOne, set choiceTwo to be card
    // if choiceOne is null, set choiceOne to be card
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)

    // state update is scheduled, not instant,
    // cannot compare the two cards here->need useEffect hook 
  }

  // compare two selected cards 
  // function will fire when the component first mount or when a dependency changes
  useEffect(() => {
    // only compare when we have both choice 1 & choice 2
    if (choiceOne && choiceTwo){
      // disable other cards when comparing the two cards clicked
      setDisabled(true)
      // if two cards match
      if(choiceOne.src === choiceTwo.src){
        // update card state
        setCards( prevCards => {
          // take in prev card state, create new arr of card objs
          return prevCards.map(card => {
            // for the matched cards, create new obj with matched property as true
            if (card.src === choiceOne.src){
              return {...card, matched:true}
            // for other cards, just return the same obj
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
      
    }

  }, [choiceOne, choiceTwo])
  
  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  useEffect(() => {
    shuffleCards()
  }, [])
  
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
