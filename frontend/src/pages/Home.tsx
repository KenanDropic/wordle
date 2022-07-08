import Board from "../components/Board";
import Keyboard from "../components/Keyboard";
import Nav from "../components/Nav";
import Rules from "../components/Rules";
import Settings from "../components/Settings";
import { useAppDispatch, useAppSelector } from "../features/hooks/hooks";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useLazyGetMeQuery } from "../features/authApiSlice";
import { setUser } from "../features/authSlice";

import useLocalStorage from "../utils/useLocalStorage";
import { useEffect } from "react";
import { getRandomWord } from "../features/globalSlice";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { displayRules, displaySettings, lightTheme } = useAppSelector(
    (state) => state.global
  );

  const [logged, setLogged] = useLocalStorage("logged_in", "");
  const [getMe, { isLoading, error }] = useLazyGetMeQuery();

  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    dispatch(getRandomWord());
  }, []);

  const getCurrentUser: () => Promise<void> = async () => {
    const { user } = await getMe(null).unwrap();
    // console.log("Current user:", user);
    dispatch(setUser(user));
  };

  useEffect(() => {
    if (logged) {
      getCurrentUser();
    }
  }, []);

  return displayRules ? (
    <Rules />
  ) : displaySettings ? (
    <Settings />
  ) : (
    <>
      <div className={`App ${!lightTheme ? "dark-mode" : "light-mode"}`}>
        <Nav />
        <div className="game">
          <Board />
          <Keyboard />
        </div>
      </div>
    </>
  );
};

export default Home;
