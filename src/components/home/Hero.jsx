import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Lattice from "../Lattice.jsx";
import Clock from "../Clock.jsx";
import { ArrowOut } from "../icons.jsx";
import { ENTER, LEAD } from "../../lib/motion.js";
import { PROFILE } from "../../data/site.js";

/* One choreographed entrance rather than eight independent ones. The name
   leads on a heavier spring; everything else falls in behind it. */
const heroStage = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } }
};

const heroPart = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: ENTER }
};

const namePart = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: LEAD }
};

export default function Hero() {
  const mediaRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: mediaRef,
    offset: ["start end", "end start"]
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [-14, 22]);

  return (
    <motion.section className="hero wrap" initial="hidden" animate="visible" variants={heroStage}>
      <motion.p className="hero__meta mono" variants={heroPart} data-reveal>
        <span>
          <span className="dot" />
          Open to senior backend &amp; platform roles
        </span>
        <span>{PROFILE.location}</span>
        <span>
          <Clock /> IST
        </span>
      </motion.p>

      <motion.h1 className="hero__name" variants={namePart} data-reveal>
        Hardik
        <br />
        Sharma
      </motion.h1>

      <motion.div className="hero__rule" variants={heroPart} data-reveal>
        <span className="mono">Software Engineer 2 — Microsoft</span>
        <hr className="hr" />
        <span className="mono muted">Since 2020</span>
      </motion.div>

      <div className="hero__grid">
        <motion.div variants={heroPart} data-reveal>
          <p className="lead">
            I build the systems other engineers depend on. At VMware I architected the
            vulnerability remediation platform that scanned and patched{" "}
            <strong>4,000+ datacenters</strong>. At Harness I cut reserved-instance exchange
            execution from eight hours to under twenty minutes. At Microsoft I work on contextual
            personalisation and real-time voice for Bing and OneDrive.
          </p>
          <p className="lead mt-lg">
            Six years of backend, cloud infrastructure and applied&nbsp;AI — mostly{" "}
            <span className="serif it">Java, Python and Kubernetes</span>.
          </p>

          <div className="hero__cta">
            <motion.a
              className="btn btn--solid"
              href={`mailto:${PROFILE.email}?subject=Role%20opportunity`}
              whileTap={{ scale: 0.96 }}
            >
              Email me
            </motion.a>
            <Link className="btn" to="/resume">
              Résumé
            </Link>
            <motion.a
              className="btn"
              href={PROFILE.github}
              target="_blank"
              rel="noopener"
              whileTap={{ scale: 0.96 }}
            >
              GitHub
              <ArrowOut />
            </motion.a>
            <motion.a
              className="btn"
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener"
              whileTap={{ scale: 0.96 }}
            >
              LinkedIn
              <ArrowOut />
            </motion.a>
          </div>
        </motion.div>

        <motion.div variants={heroPart} data-reveal>
          <div className="hero__media" ref={mediaRef}>
            <Lattice />
            <figure className="portrait">
              <motion.img
                src="/assets/images/Hardik_Sharma.jpeg"
                width="512"
                height="512"
                alt="Portrait of Hardik Sharma"
                style={{ y: portraitY }}
              />
            </figure>
          </div>
          <p className="lattice__cap mono muted" aria-hidden="true">
            Fig. 1 — cluster topology · drag to rotate
          </p>
          <dl className="stack mt-3xl">
            <div className="stackrow">
              <dt className="mono">Now</dt>
              <dd>Software Engineer 2, Microsoft — Frontier Foundry</dd>
            </div>
            <div className="stackrow">
              <dt className="mono">Before</dt>
              <dd>Harness (Cloud Cost Management) · VMware (Cloud Platform)</dd>
            </div>
            <div className="stackrow">
              <dt className="mono">Focus</dt>
              <dd>Distributed systems, cloud infrastructure, applied AI</dd>
            </div>
          </dl>
        </motion.div>
      </div>
    </motion.section>
  );
}
