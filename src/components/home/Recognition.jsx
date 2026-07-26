import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHead from "../SectionHead.jsx";
import { ENTER } from "../../lib/motion.js";
import { AWARDS } from "../../data/site.js";

const list = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };
const item = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: ENTER }
};

export default function Recognition() {
  return (
    <section className="sec wrap" id="recognition">
      <SectionHead
        num="04"
        title="Recognition"
        note="A robotics habit that never quite wore off."
      />

      <motion.div
        className="awards"
        data-reveal
        variants={list}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {AWARDS.map((award) => (
          <motion.div className="award" key={award.title} variants={item}>
            <span className="award__yr mono">{award.year}</span>
            <p className="award__t">
              {award.to ? (
                <Link className="lnk" to={award.to}>
                  {award.title}
                </Link>
              ) : (
                award.title
              )}
            </p>
            <p className="award__by">{award.by}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="rail edu"
        data-reveal
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={ENTER}
      >
        <p className="mono muted">Education</p>
        <div>
          <p className="edu__deg">Bachelor of Engineering, Computer Science &amp; Engineering</p>
          <p className="edu__meta">
            Shri Ramdeobaba College of Engineering and Management, Nagpur · 2016–2020 · GPA 8.86/10
          </p>
        </div>
      </motion.div>
    </section>
  );
}
