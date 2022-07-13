import Board from "../components/Board";
import Keyboard from "../components/Keyboard";
import Nav from "../components/Nav";
import Rules from "../components/Rules";
import Settings from "../components/Settings";
import { useAppDispatch, useAppSelector } from "../features/hooks/hooks";
import { useLazyGetMeQuery } from "../features/authApiSlice";
import useLocalStorage from "../utils/useLocalStorage";
import { useEffect, useRef } from "react";
import { getRandomWord } from "../features/globalSlice";
import Stats from "../components/Stats";

const Home: React.FC = () => {
  const [logged, setLogged] = useLocalStorage("logged_in", "");
  const effectRan = useRef<boolean>(false);

  const dispatch = useAppDispatch();
  const { displayRules, displaySettings, displayStats, lightTheme } =
    useAppSelector((state) => state.global);

  const [getMe, { error }] = useLazyGetMeQuery();

  useEffect(() => {
    dispatch(getRandomWord());
  }, []);

  const getCurrentUser: () => Promise<void> = async () => {
    await getMe(null).unwrap();
  };

  useEffect(() => {
    if (effectRan.current === false && logged) {
      getCurrentUser();
    }

    return () => {
      effectRan.current = true;
    };
  }, []);

  return displayRules ? (
    <Rules />
  ) : displaySettings ? (
    <Settings />
  ) : (
    <>
      <div
        className={`App ${!lightTheme ? "dark-mode" : "light-mode"} ${
          displayStats ? "blur" : ""
        }`}
      >
        <Nav />
        <div className="game">
          <Board />
          <Keyboard />
        </div>
      </div>
      {logged && <Stats />}
    </>
  );
};

export default Home;
