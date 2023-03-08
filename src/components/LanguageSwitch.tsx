import { useAppDispatch, useAppSelector } from "../hooks";

// Slice related imports
import { switchLanguage } from "../features/languages/languageSlice";

const options = [{ language: "en" }, { language: "fr" }];

const LanguageSwitch = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.language.language);
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
    <div className="duration-200 text-gray-400 dark:tetx-gray-300 rounded-lg flex flex-col items-center mb-4 self-end">
      {options.map((option) => {
        return (
          <div
            key={option.language}
            className={`h-8 leading-9 rounded-full flex justify-center items-center ${
              language === option.language && "text-sky-600"
            } font-bold cursor-pointer`}
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
