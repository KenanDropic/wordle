import React, { useState, useEffect } from "react";
import Letter from "./Letter";
import { boardDefault } from "./Words";
import { useAppDispatch, useAppSelector } from "../features/hooks/hooks";

const Board: React.FC = () => {
  const dispatch = useAppDispatch();
  const { board } = useAppSelector((state) => state.global);

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

  return (
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
  );
};

export default Board;
