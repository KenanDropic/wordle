import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { CookiesProvider } from "react-cookie";
import "vite/modulepreload-polyfill";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import words from "./words";
import { setWords } from "./features/globalSlice";

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    setupWords();
  }, []);

  const setupWords = () => {
    const resultArray = words.split(",");
    const todaysWord =
      resultArray[Math.floor(Math.random() * resultArray.length)];
    dispatch(setWords(todaysWord));
  };

  return (
    <>
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </>
  );
};

export default App;
