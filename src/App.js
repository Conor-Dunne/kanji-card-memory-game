import './App.css';
import kanji from './kanjiData';
import { useState } from 'react';

function App() {

  const [currentCards, setCurrentCards] = useState(kanji);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);


  function handleClick(kanjiObj) {
    if(gameOver) return;
    if(kanjiObj.isClicked === true) {
      setGameOver(true)
      checkHighScore(score, highScore);
      setScore(0);
      let newDeck = currentCards.slice();
      resetCards(newDeck);
      setCurrentCards(newDeck);
      setGameOver(false);
      console.log(currentCards);
      return
    }
    let newCards = currentCards.slice();
    newCards[newCards.indexOf(kanjiObj)].isClicked = true;
    shuffleCards(newCards);
    setCurrentCards(newCards);
    setScore(score + 1);
  }

  return (
    <>
    <GameStats score={score} gameOver={gameOver} highScore={highScore} />
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '5px',
      justifyContent: 'center',
      padding: '10px',
      margin: '0 auto',
      maxWidth: '1200px',
    }}>
      
      {currentCards.map((obj) => <KanjiCard key={obj.id} card={obj} onCardClick={handleClick} />)}
    </div>
    </>
  );

  function checkHighScore(currentScore, highScore) {
    if (currentScore > highScore) {
      setHighScore(currentScore);
    }
  } 

  function shuffleCards(deck) {
    deck.sort((a, b) => 0.5 - Math.random());
    return shuffleCards;
  }

  function resetCards(deck) {
    deck.map((obj) => obj.isClicked = false);
    return deck;
  }

}

function GameStats({score, gameOver, highScore}) {
  return (
    <div>
      <h1>Current score: {score}</h1>
      <h1>{gameOver ? "Gameover" : "let's go!"}</h1>
      <h1>Highest Score: {highScore}</h1>
    </div>
  )
}


function KanjiCard({ card, onCardClick }) {
 


  return (
    <div 
        className='card'
        style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: "1px solid black",
        flex: " 0 1 calc(25% - 1em)",
        minWidth: "200px",
        maxWidth: "300px",
        padding: '15px',
        textAlign: 'center',
        fontSize: "10px",
        }}
        onClick={() => onCardClick(card)}
        >
      <h1>{card.character}</h1>
      <p>{card.meaning}</p>
      <p>{card.reading}</p>
      {/* <p>{card.example}</p> */}
    </div>
  );
}



export default App;
