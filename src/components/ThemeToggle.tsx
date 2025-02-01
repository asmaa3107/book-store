import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const getStoredTheme = () => {
    if (localStorage.theme) return localStorage.theme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [theme, setTheme] = useState(getStoredTheme());

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 transition-all"
    >
      <i className={`pi ${theme === "light" ? "pi-moon" : "pi-sun"} text-xl`} />
    </button>
  );
};

export default ThemeToggle;
