import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "../components/Seo.jsx";
import { ENTER } from "../lib/motion.js";

const stage = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const part = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: ENTER }
};

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found — Hardik Sharma"
        description="That URL does not exist any more. Everything worth keeping is still here."
        path="/404"
      />

      <motion.main
        id="main"
        className="wrap notfound"
        initial="hidden"
        animate="visible"
        variants={stage}
      >
        <motion.p className="mono acc" variants={part}>
          Error 404
        </motion.p>
        <motion.h1 className="serif notfound__t" variants={part}>
          This page doesn&apos;t
          <br />
          exist <span className="it">any more</span>.
        </motion.h1>
        <motion.p className="lead mb-4xl" variants={part}>
          The site was rebuilt in 2026 and a few old URLs went with it. Everything worth keeping is
          still here.
        </motion.p>
        <motion.div className="hero__cta mt-0" variants={part}>
          <Link className="btn btn--solid" to="/">
            Home
          </Link>
          <Link className="btn" to="/#work">
            Selected work
          </Link>
          <Link className="btn" to="/archive">
            Archive
          </Link>
          <Link className="btn" to="/resume">
            Résumé
          </Link>
        </motion.div>
      </motion.main>
    </>
  );
}
