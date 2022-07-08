import React, { useRef, useState } from "react";
import { setTheme, showSettings } from "../features/globalSlice";
import { useAppDispatch, useAppSelector } from "../features/hooks/hooks";

const Settings: React.FC = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { lightTheme } = useAppSelector((state) => state.global);

  return (
    <div
      className={`main-container ${!lightTheme ? "dark-mode" : "light-mode"} `}
    >
      <div className="settings-container">
        <div className="settings-header">
          <p></p>
          <h4>Settings</h4>
          <i
            className="fas fa-times"
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(showSettings())}
          ></i>
        </div>
        <div className="change-theme">
          <h4>Dark Theme</h4>
          <label htmlFor="" className="switch">
            <input
              type="checkbox"
              name=""
              id=""
              checked={isChecked ? true : false}
              onChange={() => setIsChecked(!isChecked)}
            />
            <span
              className="slider round"
              onClick={() => {
                setIsChecked(!isChecked);
                dispatch(setTheme());
              }}
            ></span>
          </label>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default Settings;
