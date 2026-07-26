import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHead from "../SectionHead.jsx";
import Tilt from "../Tilt.jsx";
import { ArrowOut } from "../icons.jsx";
import { ENTER } from "../../lib/motion.js";
import { ALSO_BUILT } from "../../data/site.js";

const MotionLink = motion.create(Link);

/* An entry arrives as one object: rail, prose and figure move together on
   the same spring rather than as three separate reveals. */
const entry = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { ...ENTER, staggerChildren: 0.07, delayChildren: 0.05 } }
};

const part = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: ENTER }
};

const partX = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: ENTER }
};

/** Wraps a figure so it drifts against the scroll — depth, not decoration. */
function useFigureDrift(ref) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return useTransform(scrollYProgress, [0, 1], [16, -16]);
}

function Entry({ children, figure }) {
  const ref = useRef(null);
  const y = useFigureDrift(ref);

  return (
    <motion.article
      className="entry entry--fig"
      ref={ref}
      data-reveal
      variants={entry}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
      {figure(y)}
    </motion.article>
  );
}

const rowV = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 }
};

/* Each row drives its own entrance rather than inheriting one. The index
   is a list of links, and a link that never arrives is a link nobody
   clicks — this keeps the reveal independent of anything above it. */
function IndexRow({ item, i }) {
  const inner = (
    <>
      <motion.span className="idxrow__n mono" variants={{ hover: { x: 3 } }}>
        {item.n}
      </motion.span>
      <span className="idxrow__t">
        {item.title}
        <small>{item.note}</small>
      </span>
      <motion.span className="idxrow__meta" variants={{ hover: { x: 5, opacity: 1 } }}>
        {item.meta}
      </motion.span>
    </>
  );

  const props = {
    className: "idxrow",
    variants: rowV,
    initial: "hidden",
    whileInView: "visible",
    whileHover: "hover",
    viewport: { once: true, amount: 0.4 },
    transition: { ...ENTER, delay: Math.min(i, 6) * 0.05 }
  };

  return item.external ? (
    <motion.a {...props} href={item.href} target="_blank" rel="noopener">
      {inner}
    </motion.a>
  ) : (
    <MotionLink {...props} to={item.href}>
      {inner}
    </MotionLink>
  );
}

export default function SelectedWork() {
  return (
    <section className="sec wrap" id="work">
      <SectionHead
        num="01"
        title="Selected work"
        note="Things I built end to end, and that you can actually look at."
      />

      <Entry
        figure={() => (
          <Tilt className="plate">
            <span className="plate__n">1,500+</span>
            <span className="plate__l">
              Registered
              <br />
              engineers
            </span>
          </Tilt>
        )}
      >
        <motion.div className="entry__rail" variants={partX}>
          <span className="entry__idx mono">01</span>
          <span className="entry__yr mono">2025 —</span>
          <span className="mono muted">Solo</span>
        </motion.div>
        <motion.div className="entry__body" variants={part}>
          <h3 className="entry__title">
            <a className="lnk" href="https://algorush.web.app/" target="_blank" rel="noopener">
              AlgoRush
            </a>
            <span className="badge badge--live">Live</span>
          </h3>
          <p className="entry__desc">
            A coding-interview prep platform for engineers who don&apos;t have six months to spare —
            curated problem sets, customisable practice tracks and structured roadmaps instead of an
            undifferentiated list of a thousand questions. Built, shipped and operated on my own,
            from product decisions through to deployment.
          </p>
          <div className="outcomes">
            <span className="outcome">
              <b>1,500+</b>
              <span>registered engineers</span>
            </span>
            <span className="outcome">
              <b>0</b>
              <span>funding, 0 team</span>
            </span>
          </div>
          <div className="entry__links">
            <a
              className="arrowlink lnk"
              href="https://algorush.web.app/"
              target="_blank"
              rel="noopener"
            >
              Open AlgoRush
              <ArrowOut />
            </a>
          </div>
        </motion.div>
      </Entry>

      <Entry
        figure={(y) => (
          <Tilt as="figure" className="shot">
            <motion.img
              src="/assets/projects/parkit/roi.png"
              alt="Mask R-CNN detection overlay marking occupied and vacant parking bays"
              style={{ y }}
            />
            <figcaption>Occupancy detection, region-of-interest overlay</figcaption>
          </Tilt>
        )}
      >
        <motion.div className="entry__rail" variants={partX}>
          <span className="entry__idx mono">02</span>
          <span className="entry__yr mono">2019</span>
          <span className="mono muted">Team lead</span>
        </motion.div>
        <motion.div className="entry__body" variants={part}>
          <h3 className="entry__title">
            <Link className="lnk" to="/work/smart-parking">
              Smart Parking System
            </Link>
            <span className="badge">SIH 2019</span>
          </h3>
          <p className="entry__desc">
            India has the world&apos;s fourth-largest car market and nowhere to put the cars. This
            system points a camera at a parking lot, runs Mask R-CNN over the frame to work out which
            bays are actually empty, and lets drivers reserve one from an Android app before they set
            off. I led a team of five; it took us to the Smart India Hackathon finals.
          </p>
          <div className="outcomes">
            <span className="outcome">
              <b>Top 4</b>
              <span>of 314 teams</span>
            </span>
            <span className="outcome">
              <b>5</b>
              <span>engineers led</span>
            </span>
          </div>
          <div className="tags">
            <span className="tag">Mask R-CNN</span>
            <span className="tag">Python</span>
            <span className="tag">OpenCV</span>
            <span className="tag">Android</span>
          </div>
          <div className="entry__links">
            <Link className="arrowlink lnk" to="/work/smart-parking">
              Read the write-up
              <ArrowOut />
            </Link>
          </div>
        </motion.div>
      </Entry>

      <h3 className="mono muted subhead">Also built</h3>
      <div className="index">
        {ALSO_BUILT.map((item, i) => (
          <IndexRow item={item} i={i} key={item.n} />
        ))}
      </div>
    </section>
  );
}
