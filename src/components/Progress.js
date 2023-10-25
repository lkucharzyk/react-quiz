function Progress({ index, questionsQuanity, points, maxPoints, answer }) {
  return (
    <header className="progress">
      <progress
        max={questionsQuanity}
        value={index + Number(answer !== null)}
      />
      <p>
        Question: <strong>{index + 1}</strong> / {questionsQuanity}
      </p>
      <p>
        Points: <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}

export default Progress;
