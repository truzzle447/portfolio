import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Projects from "./components/Projects.jsx";
import Background from "./components/Background.jsx";
import Contact from "./components/Contact.jsx";

const STORAGE_KEY = "theme";

const getInitialTheme = () => {
  if (typeof window === "undefined") {
    return "light";
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  const themeLabel = useMemo(
    () => (theme === "dark" ? "Light Mode" : "Dark Mode"),
    [theme]
  );

  return (
    <div className="app">
      <Header
        themeLabel={themeLabel}
        onToggleTheme={toggleTheme}
        isDark={theme === "dark"}
      />
      <main>
        <Hero />
        <Projects />
        <Background />
        <Contact />
      </main>
    </div>
  );
}
