function StartScreen({ questionsQuanity }) {
  return (
    <div className="start">
      <h2>Welcome to quiz!</h2>
      <h3>{questionsQuanity} questions to test your React knowledge</h3>
      <button className="btn btn-ui">Let's start</button>
    </div>
  );
}

export default StartScreen;
