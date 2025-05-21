import React from 'react';

export default function GuessInput({ guesses, setGuesses, checked, results, notes }) {
  const handleGuessChange = (index, value) => {
    const updated = [...guesses];
    updated[index] = value;
    setGuesses(updated);
  };

  return (
    <>
      {guesses.map((guess, i) => (
        <div key={i} style={{ marginBottom: '0.5rem' }}>
          <label style={{ marginRight: '1rem' }}>Not {i + 1}:</label>
          <input
            type="text"
            value={guess}
            onChange={e => handleGuessChange(i, e.target.value)}
            disabled={checked}
            placeholder="T.ex. C4, A3"
            style={{ marginRight: '1rem' }}
          />
          {checked && (
            <span style={{ fontWeight: 'bold' }}>
              {results[i] ? '✅ Rätt' : `❌ Fel (${notes[i].name})`}
            </span>
          )}
        </div>
      ))}
    </>
  );
}
