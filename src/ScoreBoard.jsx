import './ScoreBoard.css';

function ScoreBoard({ round, totalRounds, score, checked }) {
  return (
    <div className='scoreBoard'>
      <p><strong>Runda:</strong> {round + 1} / {totalRounds}</p>
      <p><strong>Poäng:</strong> {score}</p>
      <p className={`next-hint ${checked ? 'visible' : ''}`}>
        Tryck "Nästa" för att fortsätta.
      </p>
    </div>
  );
}

export default ScoreBoard;
