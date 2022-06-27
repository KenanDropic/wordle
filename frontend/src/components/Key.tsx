import React from "react";
import {
  setAttempt,
  setBoard,
  setLetterPosition,
} from "../features/globalSlice";
import { useAppDispatch, useAppSelector } from "../features/hooks/hooks";

interface KeyValues {
  value: string;
  bigKey?: boolean;
}

const Key: React.FC<KeyValues> = ({ value, bigKey }) => {
  const dispatch = useAppDispatch();
  const { currentAttempt } = useAppSelector((state) => state.global);

  const handleClick = () => {
    if (value === "ENTER") {
      if (currentAttempt.letterPosition !== 5) return;
      dispatch(setAttempt());
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
    <div className="key" id={`${bigKey && "big"}`} onClick={handleClick}>
      {value === "DELETE" ? (
        <i className="fa-solid fa-delete-left" style={{ fontSize: "30px" }}></i>
      ) : (
        value
      )}
    </div>
  );
};

export default Key;
