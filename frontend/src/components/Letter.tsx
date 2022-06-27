import React from "react";
import { useAppDispatch, useAppSelector } from "../features/hooks/hooks";

interface Props {
  letterPosition: number;
  attemptValue: number;
}

const Letter: React.FC<Props> = ({ attemptValue, letterPosition }) => {
  const dispatch = useAppDispatch();
  const { board } = useAppSelector((state) => state.global);

  const letter = board[attemptValue][letterPosition];

  return <div className="letter">{letter}</div>;
};

export default Letter;
