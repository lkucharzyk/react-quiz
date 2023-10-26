import { useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import { useReducer } from "react";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import Finished from "./components/Finished";
import Timer from "./components/Timer";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secoundsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secoundsRemaining: state.questions.length * 15,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secoundsRemaining: state.secoundsRemaining - 1,
        status: state.secoundsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unkown");
  }
}

function App() {
  const [
    { status, questions, index, answer, points, highscore, secoundsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const questionsQuanity = questions.length;
  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            questionsQuanity={questionsQuanity}
            dispatch={() => dispatch({ type: "start" })}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              questionsQuanity={questionsQuanity}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            ></Progress>
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <footer>
              <Timer
                dispatch={dispatch}
                secoundsRemaining={secoundsRemaining}
              />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                questionsQuanity={questionsQuanity}
                index={index}
              />
            </footer>
          </>
        )}
        {status === "finished" && (
          <Finished
            score={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
