import React, { useState } from 'react';
import Settings from './Settings';
import NoteDisplay from './NoteDisplay';
import GuessInput from './GuessInput';
import ScoreBoard from './ScoreBoard';
import GameOver from './GameOver';
import { TREBLE_NOTES, BASS_NOTES } from './constants';

function App() {
  const [notes, setNotes] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [results, setResults] = useState([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [checked, setChecked] = useState(false);
  const [totalRounds, setTotalRounds] = useState(5);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const generateNotes = () => {
    const trebleNotes = Array.from({ length: 3 }, () =>
      TREBLE_NOTES[Math.floor(Math.random() * TREBLE_NOTES.length)]
    ).map(note => ({ ...note, clef: 'treble' }));

    const bassNotes = Array.from({ length: 2 }, () =>
      BASS_NOTES[Math.floor(Math.random() * BASS_NOTES.length)]
    ).map(note => ({ ...note, clef: 'bass' }));

    const allNotes = [...trebleNotes, ...bassNotes];
    setNotes(allNotes);
    setGuesses(Array(allNotes.length).fill(''));
    setResults([]);
    setChecked(false);

    allNotes.forEach((note, index) => {
      const freq = noteToFrequency(note.name);
      if (freq) {
        setTimeout(() => playFrequency(freq), index * 900);
      }
    });
  };

  const checkAnswers = () => {
    const checkedResults = notes.map((note, i) => {
      const guess = guesses[i].trim().toUpperCase();
      const correct = note.name.toUpperCase();
      return guess === correct;
    });
    const roundScore = checkedResults.filter(Boolean).length;
    setScore(prev => prev + roundScore);
    setResults(checkedResults);
    setChecked(true);
  };

  const handleNext = () => {
    if (!checked) {
      checkAnswers();
    } else if (round + 1 < totalRounds) {
      setRound(prev => prev + 1);
      generateNotes();
    } else {
      setGameOver(true);
    }
  };

  const noteToFrequency = (note) => {
    const A4 = 440;
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const regex = /^([A-G]#?)(\d)$/;
    const match = note.match(regex);
    if (!match) return null;

    const [, pitch, octaveStr] = match;
    const octave = parseInt(octaveStr, 10);
    const keyNumber = notes.indexOf(pitch.toUpperCase());
    if (keyNumber < 0) return null;

    const n = keyNumber + (octave * 12);
    const a4Index = notes.indexOf('A') + (4 * 12);
    const distance = n - a4Index;

    return A4 * Math.pow(2, distance / 12);
  };

  const playFrequency = (freq, duration = 0.8) => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = freq;

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    oscillator.stop(audioCtx.currentTime + duration);
  };

  const startGame = () => {
    setScore(0);
    setRound(0);
    setGameOver(false);
    setGameStarted(true);
    generateNotes();
  };

  const resetGame = () => {
    setNotes([]);
    setGuesses([]);
    setResults([]);
    setScore(0);
    setRound(0);
    setChecked(false);
    setGameStarted(false);
    setGameOver(false);
  };

  return (
    <div
      style={{
        padding: 0,
        margin: 0,
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh',
      }}
    >
      <h1>Gissa noter</h1>

      {!gameStarted && (
        <Settings
          totalRounds={totalRounds}
          setTotalRounds={setTotalRounds}
          onStart={startGame}
        />
      )}

      {gameStarted && !gameOver && (
        <>
          <ScoreBoard
            round={round}
            totalRounds={totalRounds}
            score={score}
            checked={checked}
            onCheck={checkAnswers}
            onNext={handleNext}
          />
          <NoteDisplay notes={notes} />
          <GuessInput
            guesses={guesses}
            setGuesses={setGuesses}
            checked={checked}
            results={results}
            notes={notes}
          />
          <button onClick={handleNext} style={{ marginTop: '1rem' }}>
            {!checked
              ? 'Kolla svar'
              : round + 1 < totalRounds
              ? 'Nästa'
              : 'Visa resultat'}
          </button>
        </>
      )}

      {gameOver && (
        <GameOver score={score} totalRounds={totalRounds} onReset={resetGame} />
      )}
    </div>
  );
}

export default App;
