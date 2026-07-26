import { Link } from "react-router-dom";
import Clock from "./Clock.jsx";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot__in">
        <p className="mono">© {new Date().getFullYear()} Hardik Sharma</p>
        <p className="mono mono--sent">
          Hyderabad · <Clock /> IST
        </p>
        <p className="mono">
          <Link className="lnk" to="/archive">
            Archive
          </Link>
        </p>
      </div>
    </footer>
  );
}
