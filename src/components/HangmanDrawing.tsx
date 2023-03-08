import { useAppSelector } from "../hooks";

interface HangmanDrawingProps {
  incorrectGuesses: number;
}

const HangmanDrawing = ({ incorrectGuesses }: HangmanDrawingProps) => {
  const difficulty = useAppSelector((state) => state.difficulty.level);
  return (
    <div className="relative h-64">
      <div
        className={`absolute h-16 w-2  bg-black right-[40px] top-40 dark:bg-gray-300 -rotate-45 origin-top-left ${
          (difficulty === "easy" && incorrectGuesses >= 11) ||
          (difficulty === "medium" && incorrectGuesses >= 8) ||
          (difficulty === "hard" && incorrectGuesses >= 6)
            ? "visible"
            : "invisible"
        }`}
      />
      <div
        className={`absolute h-16 w-2  bg-black right-[40px] top-40 dark:bg-gray-300 rotate-45 origin-top-right ${
          (difficulty === "easy" && incorrectGuesses >= 10) ||
          (difficulty === "medium" && incorrectGuesses >= 7) ||
          (difficulty === "hard" && incorrectGuesses >= 5)
            ? "visible"
            : "invisible"
        }`}
      />
      <div
        className={`absolute h-16 w-2  bg-black -right-[8px] top-16 dark:bg-gray-300 rotate-45 origin-top-left ${
          (difficulty === "easy" && incorrectGuesses >= 9) ||
          (difficulty === "medium" && incorrectGuesses >= 6) ||
          (difficulty === "hard" && incorrectGuesses >= 4)
            ? "visible"
            : "invisible"
        }`}
      />
      <div
        className={`absolute h-16 w-2  bg-black right-[87px] top-16 dark:bg-gray-300 -rotate-45 origin-top-right ${
          (difficulty === "easy" && incorrectGuesses >= 8) ||
          (difficulty === "medium" && incorrectGuesses >= 5) ||
          (difficulty === "hard" && incorrectGuesses >= 3)
            ? "visible"
            : "invisible"
        }`}
      />
      <div
        className={`absolute h-20 w-2  bg-black right-10 top-20 dark:bg-gray-300 ${
          (difficulty === "easy" && incorrectGuesses >= 7) ||
          (difficulty === "medium" && incorrectGuesses >= 4) ||
          (difficulty === "hard" && incorrectGuesses >= 2)
            ? "visible"
            : "invisible"
        }`}
      />
      <div
        className={`absolute rounded-full h-12 w-12 border-solid border-black border-8 right-5 top-10 dark:border-gray-300 ${
          (difficulty === "easy" && incorrectGuesses >= 6) ||
          (difficulty === "medium" && incorrectGuesses >= 3) ||
          (difficulty === "hard" && incorrectGuesses >= 1)
            ? "visible"
            : "invisible"
        }`}
      />
      <div
        className={`h-10 w-2 origin-top-left ml-12 absolute right-10 bg-amber-900 ${
          (difficulty === "easy" && incorrectGuesses >= 5) ||
          (difficulty === "medium" && incorrectGuesses >= 2) ||
          difficulty === "hard"
            ? "visible"
            : "invisible"
        }`}
      />
      <div
        className={`h-3 w-[90px] -rotate-45 origin-top-left ml-12 absolute top-16 bg-amber-900 ${
          (difficulty === "easy" && incorrectGuesses >= 4) ||
          (difficulty === "medium" && incorrectGuesses >= 1) ||
          difficulty === "hard"
            ? "visible"
            : "invisible"
        }`}
      />
      <div
        className={`h-3 w-40 bg-amber-900 ml-12 ${
          (difficulty === "easy" && incorrectGuesses >= 3) ||
          difficulty === "hard" ||
          difficulty === "medium"
            ? "visible"
            : "invisible"
        }`}
      />
      <div
        className={`h-60 w-3 bg-amber-900 ml-12 ${
          (difficulty === "easy" && incorrectGuesses >= 2) ||
          difficulty === "hard" ||
          difficulty === "medium"
            ? "visible"
            : "invisible"
        }`}
      />
      <div
        className={`h-3 w-64 bg-amber-900 ${
          (difficulty === "easy" && incorrectGuesses >= 1) ||
          difficulty === "hard" ||
          difficulty === "medium"
            ? "visible"
            : "invisible"
        }`}
      />
    </div>
  );
};

export default HangmanDrawing;
