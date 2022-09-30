import React from "react";
import Letter from "./Letter";
import { boardDefault } from "./BoardDefault";

const Board: React.FC = () => {
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
    <>
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
