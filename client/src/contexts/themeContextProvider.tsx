import { useEffect, useState } from "react";
import { ThemeContext } from "./themeContext";

type ThemeContextContextProviderProps = {
  children: React.ReactNode;
};

function ThemeContextProvider({ children }: ThemeContextContextProviderProps) {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("isDark");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  const toggleDarkMode = () => setIsDark((isDark: boolean) => !isDark);
  return (
    <ThemeContext.Provider value={{ isDark, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
