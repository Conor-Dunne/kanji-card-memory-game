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
      marginTop: "50px",
    }}>
      
      {currentCards.map((obj) => <KanjiCard key={obj.id} card={obj} onCardClick={handleClick} />)}
    </div>
    <p>Photo by <a href="https://unsplash.com/@gaspanik?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Masaaki Komori</a> on <a href="https://unsplash.com/photos/14cHwhRKJh8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  </p>
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
    <div style={{
      background: "white",
      display: "flex",
      justifyContent: 'space-around',
      flexWrap: "wrap",
      gap: "20px",
      position: "fixed",
      top: "0",
      width: "100%",
      borderBottom: "5px solid pink",
      boxShadow: '#d093d6 1px 0px 13px 0px',
    }}>
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
        border: "5px solid #ffc0cb82",
        borderRadius: "5px",
        background: "white",
        color: "rgb(151 129 117)",
        flex: " 0 1 calc(25% - 1em)",
        minWidth: "200px",
        maxWidth: "300px",
        padding: '15px',
        textAlign: 'center',
        fontSize: "10px",
        fontWeight: "900",
        fontSize: "1.5em",
        boxShadow: '3px 2px 3px 0px rgb(151 129 117)',
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
