import { useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ENTER } from "../lib/motion.js";
import { EXPERIENCE } from "../data/site.js";

const railVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } }
};

const railItem = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: ENTER }
};

const bulletList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.16 } }
};

const bullet = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: ENTER }
};

function Job({ job }) {
  const [live, setLive] = useState(false);

  return (
    <motion.article
      className="job"
      data-reveal
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { ...ENTER, staggerChildren: 0.07 } }
      }}
    >
      <motion.span
        className={`job__node${live ? " is-live" : ""}`}
        aria-hidden="true"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        onViewportEnter={() => setLive(true)}
        transition={{ type: "spring", stiffness: 380, damping: 14, delay: 0.1 }}
      />

      <motion.div className="entry__rail" variants={railVariants}>
        <motion.h3 className="job__co" variants={railItem}>
          {job.company}
        </motion.h3>
        <motion.span className="job__when mono" variants={railItem}>
          {job.when}
        </motion.span>
        <motion.span className="job__where" variants={railItem}>
          {job.where}
        </motion.span>
      </motion.div>

      <div>
        <motion.p className="job__role" variants={railItem}>
          {job.role}
        </motion.p>
        <motion.p className="job__team mono mono--sent" variants={railItem}>
          {job.team}
        </motion.p>
        <motion.ul className="bullets" variants={bulletList}>
          {job.bullets.map((html) => (
            <motion.li
              key={html.slice(0, 48)}
              variants={bullet}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ))}
        </motion.ul>
      </div>
    </motion.article>
  );
}

/**
 * The rule down the gutter is drawn by scroll position rather than by a
 * timer, so it tracks the reader exactly — scrubbing back up un-draws it.
 * Each role then knots onto the rule as it arrives, and its bullets slide
 * in behind it.
 */
export default function Timeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.82", "end 0.65"]
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });

  return (
    <div className="timeline" ref={ref}>
      <motion.span
        className="timeline__line"
        aria-hidden="true"
        style={{ scaleY, transformOrigin: "50% 0" }}
      />
      {EXPERIENCE.map((job) => (
        <Job key={`${job.company}-${job.when}`} job={job} />
      ))}
    </div>
  );
}
