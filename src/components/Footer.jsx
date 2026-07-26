import { Link } from "react-router-dom";
import Clock from "./Clock.jsx";
import { PROFILE } from "../data/site.js";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        {/* The availability note is the reason anyone scrolled this far,
            so it leads the footer instead of hiding in the fine print. */}
        <div className="foot__top">
          <p className="live mono">
            <span className="dot" />
            Open to AI roles
          </p>
          <p className="foot__say">
            Applied AI, agents, inference and personalisation platforms — and the backend and
            cloud infrastructure underneath them.{" "}
            <a
              className="lnk acc"
              href={`mailto:${PROFILE.email}?subject=AI%20role%20opportunity`}
            >
              Start a conversation
            </a>
            .
          </p>
        </div>

        <hr className="hr" />

        <div className="foot__in">
          <p className="mono">© {new Date().getFullYear()} Hardik Sharma</p>
          <p className="mono mono--sent">
            Hyderabad · <Clock /> IST
          </p>
          <nav className="foot__links mono" aria-label="Footer">
            <Link className="lnk" to="/resume">
              Résumé
            </Link>
            <Link className="lnk" to="/archive">
              Archive
            </Link>
            <a className="lnk" href={PROFILE.github} target="_blank" rel="noopener">
              GitHub
            </a>
            <a className="lnk" href={PROFILE.linkedin} target="_blank" rel="noopener">
              LinkedIn
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
