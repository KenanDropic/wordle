import React, { useCallback, useEffect } from "react";
import {
  setAttempt,
  setBoard,
  setGameOver,
  setLetterPosition,
} from "../features/globalSlice";
import { useAppDispatch, useAppSelector } from "../features/hooks/hooks";
import { useUpdateStatsMutation } from "../features/statsApiSlice";
import GameEnd from "./GameEnd";
import { StatsData, updateFN } from "./interfaces";
import Key from "./Key";

const Keyboard: React.FC = () => {
  let streak: number = localStorage.getItem("streak")
    ? JSON.parse(localStorage.getItem("streak")!)
    : 0;

  const dispatch = useAppDispatch();
  const {
    currentAttempt,
    board,
    words: { wordSet, todaysWord },
    disabledLetters,
    gameOver,
  } = useAppSelector((state) => state.global);

  // stats endpoints
  const [updateStats] = useUpdateStatsMutation();

  const keys1: string[] = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2: string[] = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3: string[] = ["Z", "X", "C", "V", "B", "N", "M"];

  const updateData: updateFN = async (data: StatsData) => {
    await updateStats(data);
  };

  let statsData: StatsData = {
    streak,
    guessedInAttempt: 0,
    isWon: false,
  };

  const handleKeyboard = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement> | KeyboardEvent) => {
      if (e.key.toLowerCase() == "enter") {
        if (currentAttempt.letterPosition !== 5) return;
        // form a word with entered letters
        let guessedWord: string = "";
        for (let i = 0; i < 5; i++) {
          guessedWord += board[currentAttempt.attempt][i];
        }

        // check if word we entered is inside words txt
        if (wordSet.has(`${guessedWord.toLowerCase()}\r`)) {
          console.log("Word set:", wordSet.has(`${guessedWord.toLowerCase()}`));
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
          } else if (
            currentAttempt.attempt === 5 &&
            guessedWord.toLowerCase() !== todaysWord
          ) {
            // run out of attempts but didn't guessed word
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
          // word is not in wordset at all
          alert("Word Not Found");
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
