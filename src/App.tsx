import { useEffect, useCallback, useState } from "react";
import { useAppSelector } from "./hooks";
import "./App.css";
import languageSwitch from "./assets/languageSwitch.json";

// Components imports
import Header from "./components/Header";
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
      <div className="flex flex-col gap-6 my-0 mx-3 items-center p-4 justify-center max-w-5xl md:border-gray-200 md:border-solid md:border md:rounded-lg md:shadow-xl">
        <p
          className={`text-2xl font-semibold md:text-3xl text-center dark:text-gray-400 h-8 md:h-9 ${
            loser || winner ? "visible" : "invisible"
          }`}
        >
          {loser && language === "en"
            ? languageSwitch.en.lost
            : winner && language === "en"
            ? languageSwitch.en.won
            : loser && language === "fr"
            ? languageSwitch.fr.lost
            : winner && language === "fr" && languageSwitch.fr.won}
        </p>
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
