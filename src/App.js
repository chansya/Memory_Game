import './App.css';
import { useState } from 'react';
import SingleCard from './components/SingleCard';

// array of cards is constant & not going to change 
// no need to be stored inside component state & re-evaluated every time the component is re-rendered

const cardImages = [
  { "src": "/img/helmet-1.png" },
  { "src": "/img/potion-1.png" },
  { "src": "/img/ring-1.png" },
  { "src": "/img/scroll-1.png" },
  { "src": "/img/shield-1.png" },
  { "src": "/img/sword-1.png" },
]


function App() {

  // create states for cards and turns
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  // keep tracks of user's choices
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)


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

    // update card state to be the shuffled cards
    setCards(shuffledCards)
    // reset turns to 0 
    setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) =>{
    console.log(card)
    // tenary operator(if ? action for true: action for false)
    // if there is a value for choiceOne, set choiceTwo to be card
    // if choiceOne is null, set choiceOne to be card
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    console.log(choiceOne)
  }

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
          />
        ))}
      </div>

    </div>
  );
}

export default App;
