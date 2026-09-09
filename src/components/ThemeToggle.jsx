import { useEffect, useState } from "react";

const COLORS = { dark: "#121510", light: "#f1f2eb" };

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "dark");
  }, []);

  function flip() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", COLORS[next]);
    setTheme(next);
    try {
      localStorage.setItem("hs-theme", next);
      setNotice("");
    } catch {
      setNotice("Theme changed for this visit. Your browser prevented saving the preference.");
    }
  }

  return (
    <>
      <button className="iconbtn theme-toggle" type="button" onClick={flip} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.4" />
          <path d="M12 5a7 7 0 0 1 0 14Z" fill="currentColor" />
        </svg>
      </button>
      <span className="sr-only" role="status">{notice}</span>
    </>
  );
}
