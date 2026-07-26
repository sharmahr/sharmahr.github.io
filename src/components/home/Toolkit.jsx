import { motion } from "framer-motion";
import SectionHead from "../SectionHead.jsx";
import { ENTER } from "../../lib/motion.js";
import { TOOLKIT } from "../../data/site.js";

const rows = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const rowV = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { ...ENTER, staggerChildren: 0.025 } }
};
const chipV = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Toolkit() {
  return (
    <section className="sec wrap" id="toolkit">
      <SectionHead
        num="03"
        title="Toolkit"
        note="What I reach for, roughly in order of how often."
      />

      <motion.dl
        className="tools"
        data-reveal
        variants={rows}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {TOOLKIT.map((group) => (
          <motion.div className="toolrow" key={group.label} variants={rowV}>
            <dt className="mono">{group.label}</dt>
            <dd>
              {group.items.map((item) => (
                <motion.span className="chip" key={item} variants={chipV}>
                  {item}
                </motion.span>
              ))}
            </dd>
          </motion.div>
        ))}
      </motion.dl>
    </section>
  );
}
