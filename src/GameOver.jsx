import React from 'react';

function GameOver({ score, totalRounds, onReset }) {
  return (
    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
      <h2>Spelet är slut!</h2>
      <p>Du fick <strong>{score}</strong> poäng av totalt <strong>{totalRounds * 5}</strong>.</p>
      <button onClick={onReset} style={{ marginTop: '1rem' }}>
        Starta om
      </button>
    </div>
  );
}

export default GameOver;
