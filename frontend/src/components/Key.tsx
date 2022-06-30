import React from "react";
import {
  setAttempt,
  setBoard,
  setGameOver,
  setLetterPosition,
} from "../features/globalSlice";
import { useAppDispatch, useAppSelector } from "../features/hooks/hooks";

interface KeyValues {
  value: string;
  bigKey?: boolean;
  shouldDisable?: boolean;
}

type ClickFn = () => void;

const Key: React.FC<KeyValues> = ({ value, bigKey, shouldDisable }) => {
  const dispatch = useAppDispatch();
  const {
    currentAttempt,
    words: { todaysWord, wordSet },
    board,
  } = useAppSelector((state) => state.global);

  const handleClick: ClickFn = () => {
    if (value === "ENTER") {
      if (currentAttempt.letterPosition !== 5) return;

      if (currentAttempt.letterPosition !== 5) return;
      // form a word with entered letters
      let guessedWord: string = "";
      for (let i = 0; i < 5; i++) {
        guessedWord += board[currentAttempt.attempt][i];
      }

      // check if word we entered is inside words txt
      if (wordSet.has(`${guessedWord.toLowerCase()}\r`)) {
        dispatch(setAttempt());
      } else {
        alert("Word Not Found");
      }

      // word guessed correct - end game
      if (guessedWord.toLowerCase() === todaysWord) {
        dispatch(setGameOver(true));
      }

      // run out of attempts but didn't guessed word
      if (
        currentAttempt.attempt === 5 &&
        guessedWord.toLowerCase() !== todaysWord &&
        wordSet.has(`${guessedWord.toLowerCase()}\r`)
      ) {
        dispatch(setGameOver(false));
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
