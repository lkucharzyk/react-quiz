import { useEffect } from "react";

function Timer({ dispatch, secoundsRemaining }) {
  const mins = Math.floor(secoundsRemaining / 60);
  const secs = Math.floor(secoundsRemaining % 60);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="timer">
      {mins} : {secoundsRemaining < 10 && 0}
      {secs}
    </div>
  );
}

export default Timer;
