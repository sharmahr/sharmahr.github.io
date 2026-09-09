import { Link } from "react-router-dom";
import Clock from "./Clock.jsx";
import { PROFILE } from "../data/site.js";

export default function Footer() {
  return (
    <footer className="foot wrap">
      <div className="foot__signature" aria-hidden="true">HARDIK SHARMA<span>↗</span></div>
      <div className="foot__in">
        <p>© {new Date().getFullYear()} Hardik Sharma</p>
        <p className="foot__crafted">Built with intention. Always in progress.</p>
        <p className="foot__clock">Hyderabad <span className="status-dot" /> <Clock /> IST</p>
        <nav className="foot__links" aria-label="Footer"><Link to="/archive">Archive</Link><a href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a><Link to="/#main">Back to top ↑</Link></nav>
      </div>
    </footer>
  );
}
