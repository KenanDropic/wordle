import React from "react";
import { useAppDispatch, useAppSelector } from "../features/hooks/hooks";
import { useGetStatsQuery } from "../features/statsApiSlice";
import { showStats } from "../features/globalSlice";

const Stats: React.FC = () => {
  const dispatch = useAppDispatch();
  const { lightTheme, displayStats } = useAppSelector((state) => state.global);
  const { stats } = useAppSelector((state) => state.stats);

  const { data, isSuccess, isError, error } = useGetStatsQuery();

  return stats !== null ? (
    <div
      className={`stats-container ${displayStats ? "active" : ""} ${
        !lightTheme ? "dark-mode" : "light-mode"
      } `}
      id="stats"
    >
      <div className="stats-header">
        <p></p>
        <i
          className="fas fa-times"
          style={{ cursor: "pointer" }}
          onClick={() => dispatch(showStats())}
        ></i>
      </div>

      <div className="stats-content">
        <h3>Statistics</h3>
        <div className="user-stats">
          <div>
            <h1>{stats.attempts}</h1>
            <small>Played</small>
          </div>
          <div>
            <h1>{stats.winRate.toFixed(2)}</h1>
            <small>Win %</small>
          </div>
          <div>
            <h1>{stats.currentStreak}</h1>
            <small>Current Streak</small>
          </div>
          <div>
            <h1>{stats.maxStreak}</h1>
            <small>Max Streak</small>
          </div>
        </div>
      </div>

      <div className="guess-distribution">
        <h3>Guess Distribution</h3>
        <div className="gt-dt-div">
          <div className="gt-dt-div-num">1</div>
          <div className="gt-dt-div-stats">
            <div
              className={`gt-dt-div-stats-inner ${
                (stats as any)?.guessDistribution[1] > 0 ? "guessed" : ""
              }`}
            >
              <div className="gt-dt-div-stats-content">
                {(stats as any)?.guessDistribution[1]}
              </div>
            </div>
          </div>
        </div>
        <div className="gt-dt-div">
          <div className="gt-dt-div-num">2</div>
          <div className="gt-dt-div-stats">
            <div
              className={`gt-dt-div-stats-inner ${
                (stats as any)?.guessDistribution[2] > 0 ? "guessed" : ""
              }`}
            >
              <div className="gt-dt-div-stats-content">
                {(stats as any)?.guessDistribution[2]}
              </div>
            </div>
          </div>
        </div>
        <div className="gt-dt-div">
          <div className="gt-dt-div-num">3</div>
          <div className="gt-dt-div-stats">
            <div
              className={`gt-dt-div-stats-inner ${
                (stats as any)?.guessDistribution[3] > 0 ? "guessed" : ""
              }`}
            >
              <div className="gt-dt-div-stats-content">
                {" "}
                {(stats as any)?.guessDistribution[3]}
              </div>
            </div>
          </div>
        </div>
        <div className="gt-dt-div">
          <div className="gt-dt-div-num">4</div>
          <div className="gt-dt-div-stats">
            <div
              className={`gt-dt-div-stats-inner ${
                (stats as any)?.guessDistribution[4] > 0 ? "guessed" : ""
              }`}
            >
              <div className="gt-dt-div-stats-content">
                {" "}
                {(stats as any)?.guessDistribution[4]}
              </div>
            </div>
          </div>
        </div>
        <div className="gt-dt-div">
          <div className="gt-dt-div-num">5</div>
          <div className="gt-dt-div-stats">
            <div
              className={`gt-dt-div-stats-inner ${
                (stats as any)?.guessDistribution[5] > 0 ? "guessed" : ""
              }`}
            >
              <div className="gt-dt-div-stats-content">
                {(stats as any)?.guessDistribution[5]}
              </div>
            </div>
          </div>
        </div>
        <div className="gt-dt-div">
          <div className="gt-dt-div-num">6</div>
          <div className="gt-dt-div-stats">
            <div
              className={`gt-dt-div-stats-inner ${
                (stats as any)?.guessDistribution[6] > 0 ? "guessed" : ""
              }`}
            >
              <div className="gt-dt-div-stats-content">
                {" "}
                {(stats as any)?.guessDistribution[6]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Stats;
