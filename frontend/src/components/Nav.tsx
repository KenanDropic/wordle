import React from "react";

const Nav: React.FC = () => {
  return (
    <nav>
      <div className="user-options">
        <i className="fa fa-circle-question"></i>
        <i className="fa-solid fa-user"></i>
      </div>
      <h1>Wordle</h1>
      <div className="stats-settings">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="26"
          viewBox="0 0 24 24"
          width="26"
          className="game-icon"
          data-testid="icon-statistics"
        >
          <path
            // fill="var(--color-tone-1)"
            fill="white"
            d="M16,11V3H8v6H2v12h20V11H16z M10,5h4v14h-4V5z M4,11h4v8H4V11z M20,19h-4v-6h4V19z"
          ></path>
        </svg>
        <i className="fa-solid fa-gear"></i>
      </div>
    </nav>
  );
};

export default Nav;
