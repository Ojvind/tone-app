export default function Settings({ totalRounds, setTotalRounds, onStart }) {
  return (
    <>
      <label>Antal omgångar: </label>
      <input
        type="number"
        value={totalRounds}
        min={1}
        max={20}
        onChange={e => setTotalRounds(Number(e.target.value))}
        style={{ marginRight: '1rem', width: '60px' }}
      />
      <button onClick={onStart}>Starta övning</button>
    </>
  );
}
