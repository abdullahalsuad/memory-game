import { useState,useEffect} from 'react'
import '../App.css';
import SingleCard from '../component/SigleCard'

const cardImages = [
  { "src": "/img/img-1.png" , matched: false },
  { "src": "/img/img-2.png" , matched: false },
  { "src": "/img/img-3.png" , matched: false },
  { "src": "/img/img-4.png" , matched: false },
  { "src": "/img/img-5.png" , matched: false },
  { "src": "/img/img-6.png" , matched: false },
]

function Game() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards for new game
  
  const shuffleCards = () => {
      const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
      setChoiceOne(null)
      setChoiceTwo(null)
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
    setDisabled(true)
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
     setTimeout(() =>  resetTurn(), 1000)
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
 
  // start new game automagically
  useEffect(() => {
    shuffleCards()
  }, [])

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
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p style={{'color':'#1cf191'}}>Turns: <b style={{'color':'#0fe6cc'}}>{turns}</b></p>
    
    <hr />
      <div style={{textAlign:'center'}}>
          <p>© Created By :- <span style={{color:"#18f297"}}><a href="http://abdullahalsuad.netlify.app/" target="_blank" rel="noreferrer" style={{color:"#18f297",textDecoration:"none"}}>Abdullah Al Suad</a></span></p>
      </div>
    </div>
  );
}

export default Game