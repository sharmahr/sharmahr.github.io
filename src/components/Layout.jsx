import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";
import ScrollProgress from "./ScrollProgress.jsx";

/** Puts the reader at the top of a new page, or at the anchor they asked for. */
function useRouteScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
}

export default function Layout() {
  useRouteScroll();

  /* Tells the watchdog in index.html to stand down. */
  useEffect(() => {
    window.__hsReady = true;
    document.documentElement.classList.remove("hydration-stalled");
  }, []);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <ScrollProgress />
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}
