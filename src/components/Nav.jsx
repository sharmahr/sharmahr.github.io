import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import ThemeToggle from "./ThemeToggle.jsx";

const HOME_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#toolkit", label: "Toolkit" },
  { href: "#recognition", label: "Recognition" },
  { href: "#contact", label: "Contact" }
];

const AWAY_LINKS = [
  { to: "/#work", label: "Work" },
  { to: "/archive", label: "Archive" },
  { to: "/resume", label: "Résumé" },
  { to: "/#contact", label: "Contact" }
];

/** Highlights the section the reader is actually looking at. */
function useScrollSpy(ids, enabled) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === "undefined") return undefined;
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return undefined;

    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, [ids, enabled]);

  return active;
}

export default function Nav() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [stuck, setStuck] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setStuck(y > 8));

  const active = useScrollSpy(
    HOME_LINKS.map((l) => l.href.slice(1)),
    isHome
  );

  return (
    <motion.header
      className={`nav${stuck ? " is-stuck" : ""}`}
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 140, damping: 22, delay: 0.05 }}
    >
      <div className="wrap nav__in">
        <Link className="mark" to="/" aria-label="Hardik Sharma, home">
          H<span>S</span>
        </Link>
        <nav className="nav__links" aria-label="Sections">
          <div className="nav__set">
            {isHome
              ? HOME_LINKS.map((l) => (
                  <a
                    key={l.href}
                    className={`nav__link${active === l.href.slice(1) ? " is-active" : ""}`}
                    href={l.href}
                  >
                    {l.label}
                  </a>
                ))
              : AWAY_LINKS.map((l) => (
                  <Link
                    key={l.to}
                    className={`nav__link${pathname === l.to ? " is-active" : ""}`}
                    to={l.to}
                  >
                    {l.label}
                  </Link>
                ))}
          </div>
          <ThemeToggle />
        </nav>
      </div>
    </motion.header>
  );
}
