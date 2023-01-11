import logo from './logo.svg';
import './App.css';
import kanji from './kanjiData';
import { useState } from 'react';



// click a kanji square and change it's clicked state to 'true'
//...and shuffle the positions of the cards.



function App() {

  const [currentCards, setCurrentCards] = useState(kanji);


  function handleClick(kanjiObj) {
    if(kanjiObj.isClicked) {
      console.log("Game over");
      return
    }
    let shuffledCards = currentCards.slice();
    shuffledCards[shuffledCards.indexOf(kanjiObj)].isClicked = true;
    shuffledCards.sort((a, b) => 0.5 - Math.random());
    setCurrentCards(shuffledCards);
    console.log(currentCards)
  }

  return (
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
  );
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
        }}
        onClick={() => onCardClick(card)}
        >
      <h1>{card.character}</h1>
      <p>{card.meaning}</p>
      <p>{card.reading}</p>
      <p>{card.example}</p>
    </div>
  );
}

export default App;
