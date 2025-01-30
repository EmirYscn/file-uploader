import { createContext } from "react";

type ThemeContextType = {
  isDark: boolean;
  toggleDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ThemeContext = createContext({} as ThemeContextType);
