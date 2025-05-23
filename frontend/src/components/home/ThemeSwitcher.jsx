import { useState, useEffect } from "react";
import Icon from "./Icon";

const ThemeSwitcher = ({ enableHover = true }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const html = window.document.documentElement;

    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg cursor-pointer ${
        enableHover
          ? "hover:bg-gray-100 dark:hover:bg-gray-700"
          : "hover:bg-black/20 opacity-70"
      }`}
    >
      {theme === "dark" ? (
        <Icon name="sun" className="w-6 h-6 text-gray-400" />
      ) : (
        <Icon
          name="moon"
          className={`w-6 h-6 ${
            enableHover ? "text-gray-500" : "text-gray-400"
          }`}
        />
      )}
    </button>
  );
};

export default ThemeSwitcher;
