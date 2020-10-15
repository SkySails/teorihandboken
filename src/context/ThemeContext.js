import React from "react";
import { COLORS } from "../theme/main.style";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const [colorScheme, changeColorScheme] = React.useState(undefined);

  React.useEffect(() => {
    changeColorScheme(window.initialColorMode); // initialColorMode is defined before page load

    // To be able to react to changes to the prefers-color-scheme
    // media query, a listener is added to this property
    window
      .matchMedia("(prefers-color-scheme: dark")
      .addListener((e) => setColorScheme(e.matches ? "dark" : "light"));
  }, []);

  const setColorScheme = (newValue) => {
    const root = window.document.documentElement;
    // 1. Update React color-mode state
    changeColorScheme(newValue);
    // 2. Update localStorage
    localStorage.setItem("color-mode", newValue);
    // 3. Update each color
    Object.entries(COLORS).forEach(([name, colorByTheme]) => {
      const cssVarName = `--${name}`;

      root.style.setProperty(cssVarName, colorByTheme[newValue]);
    });
  };

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider
      value={{ colorScheme, setColorScheme, toggleColorScheme }}
    >
      <StyledThemeProvider theme={{ colorScheme }}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export function useColorScheme() {
  return React.useContext(ThemeContext);
}
