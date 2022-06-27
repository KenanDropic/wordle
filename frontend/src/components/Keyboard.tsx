import React from "react";
import Key from "./Key";

const Keyboard: React.FC = () => {
  const keys1: string[] = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2: string[] = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3: string[] = ["Z", "X", "C", "V", "B", "N", "M"];

  return (
    <div className="keyboard">
      <div className="line1">
        {keys1.map((key) => {
          return <Key key={key} value={key} />;
        })}
      </div>
      <div className="line2">
        {keys2.map((key) => {
          return <Key key={key} value={key} />;
        })}
      </div>
      <div className="line3">
        <Key value={"ENTER"} bigKey={true} />
        {keys3.map((key) => {
          return <Key key={key} value={key} />;
        })}
        <Key value={"DELETE"} bigKey={true} />
      </div>
    </div>
  );
};

export default Keyboard;
