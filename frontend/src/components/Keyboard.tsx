import React, { useCallback, useEffect } from "react";
import {
  setAttempt,
  setBoard,
  setGameOver,
  setLetterPosition,
} from "../features/globalSlice";
import { useAppDispatch, useAppSelector } from "../features/hooks/hooks";
import GameEnd from "./GameEnd";
import Key from "./Key";

const Keyboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    currentAttempt,
    board,
    words: { wordSet, todaysWord },
    disabledLetters,
    gameOver,
  } = useAppSelector((state) => state.global);

  const keys1: string[] = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2: string[] = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3: string[] = ["Z", "X", "C", "V", "B", "N", "M"];

  const handleKeyboard = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement> | KeyboardEvent) => {
      if (e.key.toLowerCase() == "enter") {
        if (currentAttempt.letterPosition !== 5) return;

        // form a word with entered letters
        let guessedWord = "";
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
        if (currentAttempt.attempt === 5) {
          dispatch(setGameOver(false));
        }
      } else if (e.key.toLowerCase() == "backspace") {
        if (currentAttempt.letterPosition === 0) return;
        dispatch(setLetterPosition("-"));
        dispatch(setBoard(""));
      } else {
        keys1.forEach((key) => {
          if (e.key.toUpperCase() === key) {
            if (currentAttempt.letterPosition > 4) return;
            dispatch(setBoard(key));
            dispatch(setLetterPosition("+"));
          }
        });

        keys2.forEach((key) => {
          if (e.key.toUpperCase() === key) {
            if (currentAttempt.letterPosition > 4) return;
            dispatch(setBoard(key));
            dispatch(setLetterPosition("+"));
          }
        });

        keys3.forEach((key) => {
          if (e.key.toUpperCase() === key) {
            if (currentAttempt.letterPosition > 4) return;
            dispatch(setBoard(key));
            dispatch(setLetterPosition("+"));
          }
        });
      }
    },
    [currentAttempt]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return gameOver.isOver ? (
    <GameEnd />
  ) : (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line1">
        {keys1.map((key) => {
          return (
            <Key
              key={key}
              value={key}
              shouldDisable={disabledLetters.includes(key)}
            />
          );
        })}
      </div>
      <div className="line2">
        {keys2.map((key) => {
          return (
            <Key
              key={key}
              value={key}
              shouldDisable={disabledLetters.includes(key)}
            />
          );
        })}
      </div>
      <div className="line3">
        <Key value={"ENTER"} bigKey={true} />
        {keys3.map((key) => {
          return (
            <Key
              key={key}
              value={key}
              shouldDisable={disabledLetters.includes(key)}
            />
          );
        })}
        <Key value={"DELETE"} bigKey={true} />
      </div>
    </div>
  );
};

export default Keyboard;
