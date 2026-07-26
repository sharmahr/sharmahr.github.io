import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import ThemeToggle from "./ThemeToggle.jsx";

const HOME_LINKS = [
  { href: "#work", label: "Work", num: "01" },
  { href: "#experience", label: "Experience", num: "02" },
  { href: "#toolkit", label: "Toolkit", num: "03" },
  { href: "#recognition", label: "Recognition", num: "04" },
  { href: "#contact", label: "Contact", num: "05" }
];

const AWAY_LINKS = [
  { to: "/#work", label: "Work", num: "01" },
  { to: "/archive", label: "Archive", num: "02" },
  { to: "/resume", label: "Résumé", num: "03" },
  { to: "/#contact", label: "Contact", num: "04" }
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
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setStuck(y > 8));

  const active = useScrollSpy(
    HOME_LINKS.map((l) => l.href.slice(1)),
    isHome
  );

  // The index closes on navigation, on Escape, and on any click outside it.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const links = isHome ? HOME_LINKS : AWAY_LINKS;

  return (
    <motion.header
      className={`nav${stuck ? " is-stuck" : ""}`}
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 140, damping: 22, delay: 0.05 }}
      ref={panelRef}
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

          {/* Below 900px the horizontal set cannot hold five plates, so the
              index becomes a disclosure rather than disappearing. */}
          <button
            type="button"
            className="nav__idx"
            aria-expanded={open}
            aria-controls="nav-index"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Index"}
          </button>

          <ThemeToggle />
        </nav>
      </div>

      <div className="nav__panel" id="nav-index" hidden={!open}>
        <ul className="wrap plateidx">
          {links.map((l) =>
            isHome ? (
              <li key={l.href}>
                <a
                  className={`plateidx__a${active === l.href.slice(1) ? " is-active" : ""}`}
                  href={l.href}
                  onClick={() => setOpen(false)}
                >
                  <span className="plateidx__n">{l.num}</span>
                  <span>{l.label}</span>
                </a>
              </li>
            ) : (
              <li key={l.to}>
                <Link
                  className={`plateidx__a${pathname === l.to ? " is-active" : ""}`}
                  to={l.to}
                  onClick={() => setOpen(false)}
                >
                  <span className="plateidx__n">{l.num}</span>
                  <span>{l.label}</span>
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </motion.header>
  );
}
