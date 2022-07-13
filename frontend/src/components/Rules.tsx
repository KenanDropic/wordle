import React from "react";
import { showRules } from "../features/globalSlice";
import { useAppDispatch, useAppSelector } from "../features/hooks/hooks";

const Rules: React.FC = () => {
  const dispatch = useAppDispatch();
  const { lightTheme } = useAppSelector((state) => state.global);
  return (
    <div
      className={`main-container ${!lightTheme ? "dark-mode" : "light-mode"} `}
    >
      <div className={`rules-container`}>
        <div className="rules-header">
          <p></p>
          <h4>HOW TO PLAY</h4>
          <i
            className="fas fa-times"
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(showRules())}
          ></i>
        </div>
        <span>
          Guess the <strong>WORDLE</strong> in six tries.
        </span>
        <span>
          Each guess must be a valid five-letter word. Hit the enter button to
          submit.
        </span>
        <span>
          After each guess, the color of the tiles will change to show how close
          your guess was to the word.
        </span>
        <hr />
        <span>
          <strong>Examples</strong>
        </span>
        <div className="rules">
          <div className="correct" id="correct">
            W
          </div>
          <div>E</div>
          <div>A</div>
          <div>R</div>
          <div>Y</div>
        </div>
        <span>
          The letter <strong>W</strong> is in the word and in the correct spot.
        </span>
        <div className="rules">
          <div>P</div>
          <div className="almost" id="almost">
            I
          </div>
          <div>L</div>
          <div>L</div>
          <div>S</div>
        </div>
        <span>
          The letter <strong>I</strong> is in the word but in the wrong spot.
        </span>
        <div className="rules">
          <div>V</div>
          <div>A</div>
          <div>G</div>
          <div className="wrong" id="error">
            U
          </div>
          <div>E</div>
        </div>
        <span>
          The letter <strong>U</strong> is not in the word in any spot.
        </span>
      </div>
    </div>
  );
};

export default Rules;
