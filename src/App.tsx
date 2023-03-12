import { useEffect, useCallback, useState } from "react";
import { useAppSelector } from "./hooks";
import "./App.css";
import languageSwitch from "./assets/languageSwitch.json";

// Components imports
import Header from "./components/Header";
import ThemeSwitch from "./components/ThemeSwitch";
import DifficultySwitch from "./components/DifficultySwitch";
import LanguageSwitch from "./components/LanguageSwitch";
import HangmanDrawing from "./components/HangmanDrawing";
import HangmanWord from "./components/HangmanWord";
import Keyboard from "./components/Keyboard";

function App() {
  const language = useAppSelector((state) => state.language.language);
  const getWord = () => {
    if (language === "en") {
      return languageSwitch.en.wordList[
        Math.floor(Math.random() * languageSwitch.en.wordList.length)
      ];
    } else {
      return languageSwitch.fr.wordList[
        Math.floor(Math.random() * languageSwitch.fr.wordList.length)
      ];
    }
  };
  const [wordToGuess, setWordToGuess] = useState(getWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );
  const difficulty = useAppSelector((state) => state.difficulty.level);
  const loser =
    (difficulty === "easy" && incorrectLetters.length >= 11) ||
    (difficulty === "medium" && incorrectLetters.length >= 8) ||
    (difficulty === "hard" && incorrectLetters.length >= 6);
  const winner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || loser || winner) {
        return;
      } else {
        setGuessedLetters((currentLetters) => [...currentLetters, letter]);
      }
    },
    [guessedLetters, loser, winner]
  );

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const key = event.key;
      if (!key.match(/^[a-z]$/)) {
        return;
      }
      event.preventDefault();
      addGuessedLetter(key);
    };
    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const key = event.key;
      if (key !== "Enter" || (!winner && !loser)) {
        return;
      }
      event.preventDefault();
      setWordToGuess(getWord());
      setGuessedLetters([]);
    };
    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [winner, loser]);

  return (
    <div className="App dark:bg-black min-h-screen flex flex-col items-center">
      <Header
        getWord={getWord}
        setWordToGuess={setWordToGuess}
        setGuessedLetters={setGuessedLetters}
      />
      <div className="flex flex-col gap-6 my-0 mx-3 items-center p-4 justify-center max-w-5xl md:border-gray-200 md:border-solid md:border md:rounded-lg md:shadow-xl md:dark:shadow-[0px_2px_10px_rgba(225,225,225,0.5)] md:dark:bg-gray-900 md:dark:border-none md:relative">
        <div className="hidden rounded-lg dark:bg-slate-800 dark:drop-shadow-[0px_2px_10px_rgba(225,225,225,0.5)] bg-gray-100 md:flex justify-center items-center gap-6 md:flex-col md:absolute md:right-4 md:top-28 md:p-2 md:drop-shadow-lg min-[1100px]:right-4 min-[1100px]:fixed min-[1100px]:top-56">
          <ThemeSwitch />
          <LanguageSwitch />
          <DifficultySwitch
            setWordToGuess={setWordToGuess}
            setGuessedLetters={setGuessedLetters}
            getWord={getWord}
          />
        </div>
        <div
          className={`text-2xl font-semibold md:text-3xl text-center dark:text-gray-400 h-fit gap-4 ${
            loser || winner ? "fixed" : "hidden"
          } z-10 bg-white dark:bg-gray-700 p-6 flex flex-col justify-center items-center drop-shadow-2xl rounded-lg top-48 dark:drop-shadow-[0px_2px_10px_rgba(225,225,225,0.5)]`}
        >
          <p>
            {loser && language === "en"
              ? languageSwitch.en.lost
              : winner && language === "en"
              ? languageSwitch.en.won
              : loser && language === "fr"
              ? languageSwitch.fr.lost
              : winner && language === "fr" && languageSwitch.fr.won}
          </p>
          <button
            className="bg-sky-600 rounded-md p-2 text-xl dark:text-gray-200 text-white"
            onClick={() => {
              setWordToGuess(getWord());
              setGuessedLetters([]);
            }}
          >
            {language === "en"
              ? languageSwitch.en.button
              : language === "fr" && languageSwitch.fr.button}
          </button>
        </div>
        <HangmanDrawing incorrectGuesses={incorrectLetters.length} />
        <HangmanWord
          reveal={loser}
          guessedLetters={guessedLetters}
          wordToGuess={wordToGuess}
        />
        <Keyboard
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
          disabled={loser || winner}
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
        />
      </div>
    </div>
  );
}

export default App;
