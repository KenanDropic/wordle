import React, { useEffect, useState } from "react";
import { setDisabledLettersArray } from "../features/globalSlice";
import { useAppDispatch, useAppSelector } from "../features/hooks/hooks";
import { LetterProps } from "./interfaces";

const Letter: React.FC<LetterProps> = ({ attemptValue, letterPosition }) => {
  const [letterState, setLetterState] = useState<string>();
  const [flipState, setFlipState] = useState<string>();
  const dispatch = useAppDispatch();
  const {
    board,
    words: { todaysWord },
    currentAttempt,
    disabledLetters,
  } = useAppSelector((state) => state.global);

  const letter = board[attemptValue][letterPosition];
  const correct: boolean = todaysWord[letterPosition] === letter.toLowerCase();
  const almost: boolean =
    !correct && letter !== "" && todaysWord.includes(letter.toLowerCase());

  useEffect(() => {
    // add id's to each letter in row,based on it being in correct place,not being in correct place but in a word,not in a word at all.
    if (currentAttempt.attempt > attemptValue) {
      // flip letters with delay
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          setLetterState(correct ? "correct" : almost ? "almost" : "error");
          setFlipState("flip");
        }, letterPosition * 250);
      }
    }

    // disable all letters that are entered but are not included in word we are trying to guess
    if (letter !== "" && !correct && !almost) {
      if (!disabledLetters.includes(letter)) {
        dispatch(setDisabledLettersArray(letter));
      }
    }
  }, [currentAttempt.attempt]);

  return (
    <div className={`letter ${flipState}`} id={letterState}>
      {letter}
    </div>
  );
};

export default Letter;
