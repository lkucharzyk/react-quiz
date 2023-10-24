import { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import { useReducer } from "react";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";

const initialState = {
  questions: [],
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };

    default:
      throw new Error("Action unkown");
  }
}

function App() {
  const [{ status, questions }, dispatch] = useReducer(reducer, initialState);

  const questionsQuanity = questions.length;

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="App">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questionsQuanity={questionsQuanity} />
        )}
      </Main>
    </div>
  );
}

export default App;
