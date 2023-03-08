import { useAppDispatch, useAppSelector } from "../hooks";

// Slice related imports
import { setDifficulty } from "../features/difficulty/difficultySlice";

// Language content import
import languageSwitch from "../assets/languageSwitch.json";

interface DifficultySwitchProps {
  setWordToGuess: (val: string) => void;
  setGuessedLetters: (val: string[]) => void;
  getWord: () => any;
}

const DifficultySwitch = ({
  setWordToGuess,
  setGuessedLetters,
  getWord,
}: DifficultySwitchProps) => {
  const dispatch = useAppDispatch();
  const difficulty = useAppSelector((state) => state.difficulty.level);
  const language = useAppSelector((state) => state.language.language);

  return (
    <div className="duration-200 text-gray-400 dark:text-gray-300 rounded-lg flex flex-col items-center mb-4 fixed top-16 left-1">
      {language === "en"
        ? languageSwitch[language].levelOptions.map((option) => {
            return (
              <div
                key={option.level}
                className={`h-8 leading-9 rounded-full flex justify-center items-center ${
                  difficulty === option.level && "text-sky-600"
                } font-bold cursor-pointer`}
                onClick={() => {
                  difficulty !== option.level &&
                    dispatch(setDifficulty(option.level));
                  difficulty !== option.level && setGuessedLetters([]);
                  difficulty !== option.level && setWordToGuess(getWord());
                }}
              >
                {option.text}
              </div>
            );
          })
        : language === "fr" &&
          languageSwitch.fr.levelOptions.map((option) => {
            return (
              <div
                key={option.level}
                className={`h-8 leading-9 rounded-full flex justify-center items-center ${
                  difficulty === option.level && "text-sky-600"
                } font-bold cursor-pointer`}
                onClick={() => {
                  difficulty !== option.level &&
                    dispatch(setDifficulty(option.level));
                  difficulty !== option.level && setGuessedLetters([]);
                  difficulty !== option.level && setWordToGuess(getWord());
                }}
              >
                {option.text}
              </div>
            );
          })}
    </div>
  );
};

export default DifficultySwitch;
