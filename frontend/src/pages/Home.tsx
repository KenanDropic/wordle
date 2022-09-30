import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../features/hooks/hooks";
import { useLazyGetMeQuery } from "../features/authApiSlice";
import { getRandomWord } from "../features/globalSlice";
import useLocalStorage from "../utils/useLocalStorage";
import { Board, Keyboard, Nav, Rules, Settings, Stats } from "../components";

const Home: React.FC = () => {
  const [logged, setLogged] = useLocalStorage("logged_in", "");
  const effectRan = useRef<boolean>(false);
  const {
    gameOver: { isOver },
  } = useAppSelector((state) => state.global);

  const dispatch = useAppDispatch();
  const { displayRules, displaySettings, displayStats, lightTheme } =
    useAppSelector((state) => state.global);

  const [getMe, { error }] = useLazyGetMeQuery();

  useEffect(() => {
    dispatch(getRandomWord());
  }, []);

  const getCurrentUser: () => Promise<void> = async () => {
    await getMe().unwrap();
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
          <i
            className={`fa-solid fa-arrows-rotate ${isOver ? "active" : ""} `}
            onClick={() => window.location.reload()}
          ></i>
          <Board />
          <Keyboard />
        </div>
      </div>
      {logged && <Stats />}
    </>
  );
};

export default Home;
