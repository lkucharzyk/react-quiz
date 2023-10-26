function Finished({ score, maxPoints, highscore, dispatch }) {
  const scoreRate = (score / maxPoints) * 100;
  return (
    <div>
      <p className="result">
        You scored <strong>{score}</strong> out of {maxPoints} (
        {scoreRate.toFixed(2)} %)
      </p>
      <p className="highscore">Highscore {highscore} points</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </div>
  );
}

export default Finished;
