import React from 'react';

function ScoreBoard({ round, totalRounds, score, checked }) {
  return (
    <div style={{ margin: '1rem', textAlign: 'center' }}>
      <p><strong>Runda:</strong> {round + 1} / {totalRounds}</p>
      <p><strong>Poäng:</strong> {score}</p>
      {checked && <p>Tryck "Nästa" för att fortsätta.</p>}
    </div>
  );
}

export default ScoreBoard;
