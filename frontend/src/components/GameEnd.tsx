import React from "react";
import { useAppSelector } from "../features/hooks/hooks";

const GameEnd: React.FC = () => {
  const {
    currentAttempt,
    words: { todaysWord },
    gameOver: { isWon },
  } = useAppSelector((state) => state.global);
  return (
    <div style={{ marginTop: "25%" }}>
      <h3>{isWon ? "You Correctly guessed" : "You failed"}</h3>
      <h1>Correct: {todaysWord}</h1>
      {isWon && <h3>{`You guessed in ${currentAttempt.attempt} attempts`}</h3>}
    </div>
  );
};

export default GameEnd;
