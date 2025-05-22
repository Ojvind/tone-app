import React from 'react';
import Settings from './Settings';
import NoteDisplay from './NoteDisplay';
import GuessInput from './GuessInput';
import ScoreBoard from './ScoreBoard';
import GameOver from './GameOver';
import { useGame } from './hooks/useGame';
import './App.css';

function App() {
  const { state, actions } = useGame();

  return (
    <div className="app">
      <h1>Gissa noter</h1>

      {!state.gameStarted && (
        <Settings
          totalRounds={state.totalRounds}
          setTotalRounds={actions.setTotalRounds}
          onStart={actions.startGame}
        />
      )}

      {state.gameStarted && !state.gameOver && (
        <>
          <ScoreBoard
            round={state.round}
            totalRounds={state.totalRounds}
            score={state.score}
            checked={state.checked}
            onCheck={actions.checkAnswers}
            onNext={actions.handleNext}
          />
          <NoteDisplay 
            notes={state.notes} />
          <GuessInput
            guesses={state.guesses}
            setGuesses={actions.setGuesses}
            checked={state.checked}
            results={state.results}
            notes={state.notes}
          />
          <button onClick={actions.handleNext} style={{ marginTop: '1rem' }}>
            {!state.checked
              ? 'Kolla svar'
              : state.round + 1 < state.totalRounds
              ? 'Nästa'
              : 'Visa resultat'}
          </button>
        </>
      )}

      {state.gameOver && (
        <GameOver score={state.score} totalRounds={state.totalRounds} onReset={actions.resetGame} />
      )}
    </div>
  );
}

export default App;
