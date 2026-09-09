import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import { ArrowOut } from "./icons.jsx";

const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "playground", label: "Playground" }
];

export default function Nav() {
  const { pathname, hash } = useLocation();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [stuck, setStuck] = useState(false);
  const header = useRef(null);
  const trigger = useRef(null);
  const home = pathname === "/";

  useEffect(() => setOpen(false), [pathname, hash]);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (!home) {
      return () => window.removeEventListener("scroll", onScroll);
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id === "intro" ? "" : entry.target.id);
      });
    }, { rootMargin: "-20% 0px -65% 0px" });
    [{ id: "intro" }, ...SECTIONS].forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [home]);

  useEffect(() => {
    if (!open) return undefined;
    const closeOutside = (event) => {
      if (!header.current?.contains(event.target)) setOpen(false);
    };
    const closeEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 901px)");
    const onResize = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeEscape);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeEscape);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const sectionLink = ({ id, label }, mobile = false) => (
    <Link
      key={id}
      to={`/#${id}`}
      className={`${mobile ? "nav__mobile-link" : "nav__link"}${home && active === id ? " is-active" : ""}`}
      aria-current={home && active === id ? "location" : undefined}
      onClick={() => setOpen(false)}
    >
      {label}{mobile && <ArrowOut />}
    </Link>
  );

  return (
    <header className={`nav${stuck ? " is-stuck" : ""}`} ref={header}>
      <div className="wrap nav__in">
        <Link className="mark" to="/" aria-label="Hardik Sharma, home">
          <span className="mark__glyph" aria-hidden="true">h<span>s</span><i /></span>
          <span className="mark__name">Hardik Sharma<span>Software engineer</span></span>
        </Link>
        <nav className="nav__set" aria-label="Main navigation">
          {SECTIONS.map((section) => sectionLink(section))}
        </nav>
        <div className="nav__actions">
          <ThemeToggle />
          <Link className="nav__contact" to="/#contact">Let&apos;s talk <ArrowOut /></Link>
          <button ref={trigger} className="nav__toggle" type="button" aria-controls="mobile-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
            <span>{open ? "Close" : "Menu"}</span>
            <span className={`menu-lines${open ? " is-open" : ""}`} aria-hidden="true"><i /><i /></span>
          </button>
        </div>
      </div>
      <nav id="mobile-navigation" className="nav__panel wrap" aria-label="Mobile navigation" hidden={!open}>
        {SECTIONS.map((section) => sectionLink(section, true))}
        <Link className="nav__mobile-link" to="/resume" onClick={() => setOpen(false)}>Résumé <ArrowOut /></Link>
        <Link className="nav__mobile-link acc" to="/#contact" onClick={() => setOpen(false)}>Let&apos;s talk <ArrowOut /></Link>
      </nav>
    </header>
  );
}
