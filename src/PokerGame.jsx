import React, { useState } from 'react';


const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const suits = ['♠', '♥', '♦', '♣'];

const generateDeck = () => {
  const deck = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ rank, suit });
    }
  }
  return deck;
};

const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const evaluateHand = (hand) => {
  // Evaluate hand and return the hand rank
  // You can implement your own logic here based on poker hand rankings
  return 'High Card';
};

const dealCards = (deck) => {
  const p1Hand = deck.slice(0, 5);
  const p2Hand = deck.slice(5, 10);

  return {
    player1Hand: p1Hand,
    player2Hand: p2Hand,
  };
};

const determineWinner = (p1Hand, p2Hand) => {
  const p1HandRank = evaluateHand(p1Hand);
  const p2HandRank = evaluateHand(p2Hand);

  if (p1HandRank > p2HandRank) {
    return 'Player 1 wins!';
  } else if (p2HandRank > p1HandRank) {
    return 'Player 2 wins!';
  } else {
    return "It's a tie!";
  }
};

const PokerGame = () => {
  const [deck, setDeck] = useState([]);
  const [player1Hand, setPlayer1Hand] = useState([]);
  const [player2Hand, setPlayer2Hand] = useState([]);
  const [winner, setWinner] = useState('');

  const startGame = () => {
    const newDeck = shuffleDeck(generateDeck());
    setDeck(newDeck);

    const { player1Hand, player2Hand } = dealCards(newDeck);
    setPlayer1Hand(player1Hand);
    setPlayer2Hand(player2Hand);

    const gameWinner = determineWinner(player1Hand, player2Hand);
    setWinner(gameWinner);
  };

  const resetGame = () => {
    setDeck([]);
    setPlayer1Hand([]);
    setPlayer2Hand([]);
    setWinner('');
  };

  return (
    <div className="poker-game">
      <h2 className="heading">Poker Game</h2>
      {!deck.length && (
        <button className="start-button" onClick={startGame}>
          Start Game
        </button>
      )}
      {deck.length > 0 && (
        <div>
          <div className="player-hand">
            <h3>Player 1 Hand:</h3>
            <div className="hand">
              {player1Hand.map((card, index) => (
                <div className="card" key={index}>
                  {card.rank} {card.suit}
                </div>
              ))}
            </div>
          </div>
          <div className="player-hand">
            <h3>Player 2 Hand:</h3>
            <div className="hand">
              {player2Hand.map((card, index) => (
                <div className="card" key={index}>
                  {card.rank} {card.suit}
                </div>
              ))}
            </div>
          </div>
          {winner && <h3 className="winner">{winner}</h3>}
          <button className="reset-button" onClick={resetGame}>
            Reset Game
          </button>
        </div>
      )}
    </div>
  );
};

export default PokerGame;
