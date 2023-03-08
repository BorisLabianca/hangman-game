interface HangmanWordProps {
  guessedLetters: string[];
  wordToGuess: string;
  reveal?: boolean;
}

const HangmanWord = ({
  guessedLetters,
  wordToGuess,
  reveal = false,
}: HangmanWordProps) => {
  return (
    <div className="flex gap-1 text-xl md:text-3xl uppercase font-bold flex-wrap justify-center">
      {wordToGuess.split("").map((letter, index) => {
        return (
          <span
            key={index}
            className={`md:border-b-4 border-b-[3px] border-black flex w-5 md:w-7 dark:text-gray-400 dark:border-gray-600 justify-center`}
          >
            <span
              className={`${
                guessedLetters.includes(letter) || reveal
                  ? "visible"
                  : "invisible"
              } ${
                reveal && !guessedLetters.includes(letter) && "text-red-600"
              }`}
            >
              {letter}
            </span>
          </span>
        );
      })}
    </div>
  );
};

export default HangmanWord;
