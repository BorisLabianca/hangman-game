interface KeyboardProps {
  inactiveLetters: string[];
  addGuessedLetter: (letter: string) => void;
  disabled?: boolean;
  activeLetters: string[];
}

const Keyboard = ({
  inactiveLetters,
  addGuessedLetter,
  disabled = false,
  activeLetters,
}: KeyboardProps) => {
  const keys = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  return (
    <div className="flex flex-wrap justify-center gap-1 max-w-3xl">
      {keys.map((key) => {
        const isActive = activeLetters.includes(key);
        const isInactive = inactiveLetters.includes(key);
        return (
          <button
            disabled={isActive || isInactive || (disabled && true)}
            className={`uppercase aspect-square text-lg font-bold p-2 border-black border-solid border-[1px] enabled:hover:bg-blue-300 enabled:focus:bg-blue-300 ${
              !isActive && "dark:bg-gray-700 dark:text-gray-400"
            } ${isInactive && "opacity-30"} ${
              isActive &&
              "bg-blue-500 text-white dark:bg-blue-500 dark:text-gray-200"
            } disabled:hover:bg-none disabled:focus:bg-none  flex-1 flex-grow-0 h-10 w-10 md:w-14 md:h-14`}
            key={key}
            onClick={() => {
              addGuessedLetter(key);
            }}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
};

export default Keyboard;
