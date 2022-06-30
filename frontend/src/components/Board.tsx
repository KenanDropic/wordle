import React, { useEffect } from "react";
import Letter from "./Letter";
import { boardDefault } from "./Words";
import { useAppDispatch, useAppSelector } from "../features/hooks/hooks";
import { getRandomWord, resetGame } from "../features/globalSlice";

const Board: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    gameOver: { isOver },
  } = useAppSelector((state) => state.global);

  const letterLength: number = boardDefault.length - 1;
  const letterArray: number[] = Array.from(
    { length: letterLength },
    (_, i) => i + 0
  );

  const boardLength: number = boardDefault.length;
  const boardArray: number[] = Array.from(
    { length: boardLength },
    (_, i) => i + 1
  );

  useEffect(() => {
    dispatch(getRandomWord());
  }, []);

  return (
    <>
      <i
        className={`fa-solid fa-arrows-rotate ${isOver ? "active" : ""} `}
        onClick={() => window.location.reload()}
      ></i>
      <div className="board">
        {boardArray.map((row: number, idx: number) => {
          return (
            <div className="row" key={idx}>
              {letterArray.map((letter: number) => {
                return (
                  <Letter
                    key={letter}
                    letterPosition={letter}
                    attemptValue={idx}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Board;
