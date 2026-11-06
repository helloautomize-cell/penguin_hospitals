export type Step = { title: string; text: string };

/** "What your care includes" rail (.steps): serif numerals, hover fills navy. */
export function StepTracker({ steps }: { steps: Step[] }) {
  return (
    <ol className="steps">
      {steps.map((s, i) => (
        <li key={s.title} className="rv" style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}>
          <span className="n">{String(i + 1).padStart(2, "0")}</span>
          <b>{s.title}</b>
          <p>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
