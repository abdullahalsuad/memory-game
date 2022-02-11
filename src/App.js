import { useState,useEffect} from 'react'
import './App.css'
import SingleCard from './component/SigleCard'

const cardImages = [
  { "src": "/img/img-1.png" , matched: false },
  { "src": "/img/img-2.png" , matched: false },
  { "src": "/img/img-3.png" , matched: false },
  { "src": "/img/img-4.png" , matched: false },
  { "src": "/img/img-5.png" , matched: false },
  { "src": "/img/img-6.png" , matched: false },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  // shuffle cards for new game
  
  const shuffleCards = () => {
      const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
      setCards(shuffledCards)
      setTurns(0)
  }
  
  
// handle a choice
const handleChoice = (card) => {
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
}
 // compare 2 selected cards
 useEffect(() => {
  if (choiceOne && choiceTwo) {

    if (choiceOne.src === choiceTwo.src) {
      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.src === choiceOne.src) {
            return { ...card, matched: true }
          } else {
            return card
          }
        })
      })
      resetTurn()
    } else {
      resetTurn()
    }

  }
}, [choiceOne, choiceTwo])
console.log(cards)
// reset choices & increase turn
const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns + 1)
}
 

  return (
    <div className="App">
      <h1>Flip <b className='The'>The</b> Galaxy </h1> 
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

export default App