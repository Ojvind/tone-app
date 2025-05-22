export function noteToFrequency(note) {
  const A4 = 440;
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const regex = /^([A-G]#?)(\/)?(\d)$/;
  const match = note.match(regex);
  if (!match) return null;

  const [, pitch, , octaveStr] = match;
  const octave = parseInt(octaveStr, 10);
  const keyNumber = notes.indexOf(pitch.toUpperCase());
  if (keyNumber < 0) return null;

  const n = keyNumber + (octave * 12);
  const a4Index = notes.indexOf('A') + (4 * 12);
  const distance = n - a4Index;

  return A4 * Math.pow(2, distance / 12);
}

export function playFrequency(freq, duration = 0.8) {
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
}
