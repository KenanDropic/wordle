import React from "react";
import {
  setAttempt,
  setBoard,
  setGameOver,
  setLetterPosition,
} from "../features/globalSlice";
import { useAppDispatch, useAppSelector } from "../features/hooks/hooks";
import { useUpdateStatsMutation } from "../features/statsApiSlice";
import { StatsData, updateFN } from "./Keyboard";

interface KeyValues {
  value: string;
  bigKey?: boolean;
  shouldDisable?: boolean;
}

type ClickFn = () => void;

const Key: React.FC<KeyValues> = ({ value, bigKey, shouldDisable }) => {
  let streak: number = localStorage.getItem("streak")
    ? JSON.parse(localStorage.getItem("streak")!)
    : 0;
  const dispatch = useAppDispatch();
  const {
    currentAttempt,
    words: { todaysWord, wordSet },
    board,
  } = useAppSelector((state) => state.global);
  const [updateStats] = useUpdateStatsMutation();

  let statsData: StatsData = {
    streak,
    guessedInAttempt: 0,
    isWon: false,
  };

  const updateData: updateFN = async (data: StatsData) => {
    await updateStats(data);
  };

  const handleClick: ClickFn = () => {
    if (value === "ENTER") {
      if (currentAttempt.letterPosition !== 5) return;
      // form a word with entered letters
      let guessedWord: string = "";
      for (let i = 0; i < 5; i++) {
        guessedWord += board[currentAttempt.attempt][i];
      }

      // check if word we entered is inside words txt
      if (wordSet.has(`${guessedWord.toLowerCase()}\r`)) {
        dispatch(setAttempt());

        // word guessed correct - end game
        if (guessedWord.toLowerCase() === todaysWord) {
          streak += 1;
          localStorage.setItem("streak", JSON.stringify(streak));
          statsData = {
            streak,
            guessedInAttempt: currentAttempt.attempt + 1,
            isWon: true,
          };
          dispatch(setGameOver(true));
          updateData(statsData);
        }

        // run out of attempts but didn't guessed word
        if (
          currentAttempt.attempt === 5 &&
          guessedWord.toLowerCase() !== todaysWord &&
          wordSet.has(`${guessedWord.toLowerCase()}\r`)
        ) {
          localStorage.setItem("streak", "0");
          streak = 0;
          statsData = {
            streak,
            guessedInAttempt: 0,
            isWon: false,
          };
          dispatch(setGameOver(false));
          updateData(statsData);
        }
      } else {
        alert("Word Not Found");
      }
    } else if (value === "DELETE") {
      if (currentAttempt.letterPosition === 0) return;
      dispatch(setLetterPosition("-"));
      dispatch(setBoard(""));
    } else {
      if (currentAttempt.letterPosition > 4) return;
      dispatch(setBoard(value));
      dispatch(setLetterPosition("+"));
    }
  };

  return (
    <div
      className="key"
      id={`${bigKey ? "big" : shouldDisable && "disabled"}`}
      onClick={handleClick}
    >
      {value === "DELETE" ? (
        <i className="fa-solid fa-delete-left" style={{ fontSize: "30px" }}></i>
      ) : (
        value
      )}
    </div>
  );
};

export default Key;
