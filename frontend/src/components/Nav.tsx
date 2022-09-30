import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { showRules, showSettings, showStats } from "../features/globalSlice";
import { useAppDispatch, useAppSelector } from "../features/hooks/hooks";
import useLocalStorage from "../utils/useLocalStorage";
import { NavClickFN } from "./interfaces";

const Nav: React.FC = () => {
  const [logged, setLogged] = useLocalStorage("logged_in", "");
  const dispatch = useAppDispatch();
  const { lightTheme } = useAppSelector((state) => state.global);
  const navigate: NavigateFunction = useNavigate();

  const handleClick: NavClickFN = (event, destination) => {
    switch (destination) {
      case "rules":
        dispatch(showRules());
        break;
      case "login":
        navigate("/login");
        break;
      case "stats":
        dispatch(showStats());
        break;
      case "settings":
        dispatch(showSettings());
        break;
    }
  };

  return (
    <nav className={!lightTheme ? "dark-mode" : "light-mode"}>
      <div className="user-options">
        <i
          className="fa fa-circle-question"
          onClick={(e) => handleClick(e, "rules")}
        ></i>
        <i
          className="fa-solid fa-user-large"
          onClick={(e) => handleClick(e, "login")}
        ></i>
      </div>
      <h1>Wordle</h1>
      <div className="stats-settings">
        <svg
          onClick={(e) => {
            if (logged) {
              handleClick(e, "stats");
            } else {
              alert("Login to see your stats");
            }
          }}
          xmlns="http://www.w3.org/2000/svg"
          height="26"
          viewBox="0 0 24 24"
          width="26"
          className="game-icon"
          data-testid="icon-statistics"
        >
          <path
            // fill="var(--color-tone-1)"
            fill={!lightTheme ? "white" : "black"}
            d="M16,11V3H8v6H2v12h20V11H16z M10,5h4v14h-4V5z M4,11h4v8H4V11z M20,19h-4v-6h4V19z"
          ></path>
        </svg>
        <i
          className="fa-solid fa-gear"
          onClick={(e) => handleClick(e, "settings")}
        ></i>
      </div>
    </nav>
  );
};

export default Nav;
