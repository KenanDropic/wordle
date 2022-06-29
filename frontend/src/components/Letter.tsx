import React, { useEffect, useState } from "react";
import { setDisabledLettersArray } from "../features/globalSlice";
import { useAppDispatch, useAppSelector } from "../features/hooks/hooks";

interface Props {
  letterPosition: number;
  attemptValue: number;
}

const Letter: React.FC<Props> = ({ attemptValue, letterPosition }) => {
  const [letterState, setLetterState] = useState<string>();
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
      setLetterState(correct ? "correct" : almost ? "almost" : "error");
    }

    // disable all letters that are entered but are not included in word we are trying to guess
    if (letter !== "" && !correct && !almost) {
      if (!disabledLetters.includes(letter)) {
        dispatch(setDisabledLettersArray(letter));
      }
    }
  }, [currentAttempt.attempt]);

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
};

export default Letter;
