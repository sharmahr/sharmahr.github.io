import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SNAP } from "../lib/motion.js";

const THEME_COLOR = { dark: "#0b0a09", light: "#f6f4f0" };

/* The site is designed dark; that is a decision, not a default we hand to
   the OS. Light is available, but only if the visitor asks for it. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "dark");
  }, []);

  const flip = useCallback(() => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
    try {
      localStorage.setItem("hs-theme", next);
    } catch {
      /* private mode; the choice just will not survive a reload */
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", THEME_COLOR[next]);
  }, []);

  return (
    <motion.button
      className="iconbtn"
      type="button"
      onClick={flip}
      whileTap={{ scale: 0.94 }}
      transition={SNAP}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        animate={{ rotate: theme === "dark" ? 0 : 180 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 3a9 9 0 0 1 0 18Z" fill="currentColor" />
      </motion.svg>
    </motion.button>
  );
}
