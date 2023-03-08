import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";

// Slice related imports
import { switchTheme } from "../features/theme/themeSlice";

// Icon imports
import { IoDesktopOutline, IoSunny, IoMoon } from "react-icons/io5";

const ThemeSwitch = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();

  // Different theme options
  const options = [
    { icon: <IoSunny />, text: "light" },
    { icon: <IoMoon />, text: "dark" },
    { icon: <IoDesktopOutline />, text: "system" },
  ];

  // Theme switching logic
  const element = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const onWindowMatch = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && darkQuery.matches)
    ) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  };
  onWindowMatch();
  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      default:
        localStorage.removeItem("theme");
        onWindowMatch();
        break;
    }
  }, [theme]);
  darkQuery.addEventListener("change", (event) => {
    if (!("theme" in localStorage)) {
      if (event.matches) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    }
  });
  return (
    <div className="duration-200 text-gray-400 dark:text-gray-300 rounded-lg flex flex-col-reverse md:flex-row items-center mb-4 fixed top-16 right-1">
      {options.map((option) => {
        return (
          <div
            key={option.text}
            className={`w-8 h-8 leading-9 text-xl rounded-full flex items-center justify-center ${
              theme === option.text && "text-sky-600"
            } cursor-pointer`}
            onClick={() => {
              dispatch(switchTheme(option.text));
            }}
          >
            {option.icon}
          </div>
        );
      })}
    </div>
  );
};

export default ThemeSwitch;
