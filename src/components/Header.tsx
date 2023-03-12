import { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import languageSwitch from "../assets/languageSwitch.json";
import { FaBars } from "react-icons/fa";

// Components imports
import ThemeSwitch from "../components/ThemeSwitch";
import DifficultySwitch from "../components/DifficultySwitch";
import LanguageSwitch from "../components/LanguageSwitch";

import { toggleDropdown } from "../features/dropdown/dropdownSlice";

interface HeaderProps {
  setWordToGuess: (val: string) => void;
  setGuessedLetters: (val: string[]) => void;
  getWord: () => any;
}

const Header = ({
  setWordToGuess,
  setGuessedLetters,
  getWord,
}: HeaderProps) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.language.language);
  const isOpen = useAppSelector((state) => state.dropdown.isOpen);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        !hamburgerRef.current?.contains(event.target) &&
        !dropdownRef.current?.contains(event.target)
      ) {
        dispatch(toggleDropdown());
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="p-4 flex justify-center items-center gap-2 md:gap-4">
      <div className="bg-[url('./assets/hangman_logo.svg')] dark:bg-[url('./assets/hangman_logo_dark_mode.svg')] h-7 w-7 md:h-20 md:w-20" />
      <h1 className="dark:text-gray-400 text-2xl md:text-6xl font-semibold uppercase">
        {language === "en"
          ? languageSwitch.en.title
          : language === "fr" && languageSwitch.fr.title}
      </h1>
      <div
        className="text-2xl absolute right-4 visible md:invisible"
        onClick={() => {
          dispatch(toggleDropdown());
        }}
        ref={hamburgerRef}
      >
        <FaBars className="dark:text-gray-400" />
      </div>

      <div
        className={`dropdown-menu fixed top-12 right-4 origin-top-right flex items-start gap-6 p-3 ${
          isOpen
            ? "w-fit h-fit dark:bg-slate-800 dark:drop-shadow-[0px_0px_10px_rgba(225,225,225,0.5)] bg-white shadow-lg"
            : "w-0 h-0 overflow-hidden shadow-none invisible bg-none"
        } md:hidden duration-200 ease-in-out z-10`}
        ref={dropdownRef}
      >
        <ThemeSwitch />
        <DifficultySwitch
          setWordToGuess={setWordToGuess}
          setGuessedLetters={setGuessedLetters}
          getWord={getWord}
        />
        <LanguageSwitch />
      </div>
      <div className="hidden md:block">
        <ThemeSwitch />
        <DifficultySwitch
          setWordToGuess={setWordToGuess}
          setGuessedLetters={setGuessedLetters}
          getWord={getWord}
        />
        <LanguageSwitch />
      </div>
    </header>
  );
};

export default Header;
