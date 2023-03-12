import { useAppDispatch, useAppSelector } from "../hooks";

// Slice related imports
import { setDifficulty } from "../features/difficulty/difficultySlice";
import { toggleDropdown } from "../features/dropdown/dropdownSlice";

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
  const isOpen = useAppSelector((state) => state.dropdown.isOpen);

  return (
    <div
      className={`duration-200 text-gray-400 dark:text-gray-300 rounded-lg flex flex-col items-center ease-in-out md:w-fit md:h-fit md:overflow-visible ${
        !isOpen && "h-0 w-0 overflow-hidden"
      }`}
    >
      {language === "en"
        ? languageSwitch[language].levelOptions.map((option) => {
            return (
              <div
                key={option.level}
                className={`h-8 w-auto leading-9 rounded-full flex justify-center items-center ${
                  difficulty === option.level && "text-sky-600"
                } font-bold cursor-pointer ${
                  !isOpen && "h-0 w-0 overflow-hidden"
                } duration-200 ease-in-out md:overflow-visible `}
                onClick={() => {
                  difficulty !== option.level &&
                    dispatch(setDifficulty(option.level));
                  difficulty !== option.level && setGuessedLetters([]);
                  difficulty !== option.level && setWordToGuess(getWord());
                  isOpen && dispatch(toggleDropdown(false));
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
                className={`md:h-8 leading-9 rounded-full flex justify-center items-center ${
                  difficulty === option.level && "text-sky-600"
                } font-bold cursor-pointer ${
                  !isOpen && "h-0 w-0 overflow-hidden"
                } duration-200 ease-in-out md:overflow-visible `}
                onClick={() => {
                  difficulty !== option.level &&
                    dispatch(setDifficulty(option.level));
                  difficulty !== option.level && setGuessedLetters([]);
                  difficulty !== option.level && setWordToGuess(getWord());
                  dispatch(toggleDropdown(false));
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
