import { useAppDispatch, useAppSelector } from "../hooks";

// Slice related imports
import { switchLanguage } from "../features/languages/languageSlice";

const options = [{ language: "en" }, { language: "fr" }];

const LanguageSwitch = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.language.language);
  const isOpen = useAppSelector((state) => state.dropdown.isOpen);

  const handleClick = (option: string) => {
    if (language !== option) {
      dispatch(switchLanguage(option));
      localStorage.setItem("language", option);
      window.location.reload();
    } else {
      return;
    }
  };
  return (
    <div
      className={`duration-200 ease-in-out text-gray-400 dark:text-gray-300 rounded-lg flex flex-col items-center md:mb-4 md:fixed md:top-40 md:right-2 md:h-18 md:w-fit md:overflow-visible ${
        !isOpen && "h-0 w-0 overflow-hidden"
      }`}
    >
      {options.map((option) => {
        return (
          <div
            key={option.language}
            className={`h-8 w-auto text-lg leading-9 rounded-full flex justify-center items-center md:overflow-visible  ${
              language === option.language && "text-sky-600"
            } font-bold cursor-pointer ${
              !isOpen && "h-0 w-0 overflow-hidden"
            } duration-200 ease-in-out`}
            onClick={() => {
              handleClick(option.language);
            }}
          >
            {option.language}
          </div>
        );
      })}
    </div>
  );
};

export default LanguageSwitch;
