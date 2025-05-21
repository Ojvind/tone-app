import React, { useEffect, useRef } from 'react';
import { Renderer, Stave, StaveNote, Formatter } from 'vexflow';

export default function NoteDisplay({ notes }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || notes.length === 0) return;

    containerRef.current.innerHTML = '';

    const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
    renderer.resize(350, 250);
    const context = renderer.getContext();

    let y = 10;
    ['treble', 'bass'].forEach((clef) => {
      const notesInClef = notes.filter(n => n.clef === clef);
      if (notesInClef.length === 0) return;

      const stave = new Stave(10, y, 300);
      stave.addClef(clef).setContext(context).draw();

      const staveNotes = notesInClef.map(note =>
        new StaveNote({ clef, keys: [note.key], duration: 'q' })
      );

      Formatter.FormatAndDraw(context, stave, staveNotes);
      y += 100;
    });
  }, [notes]);

  return <div ref={containerRef} style={{ margin: '1rem 0' }}></div>;
}
