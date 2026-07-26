import { motion } from "framer-motion";
import { ENTER, VIEWPORT } from "../lib/motion.js";

/** Numbered section index, hairline rule, short note. Used on every section. */
export default function SectionHead({ num, title, note }) {
  return (
    <motion.div
      className="sec__head"
      data-reveal
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0, transition: { ...ENTER, staggerChildren: 0.06 } }
      }}
    >
      <span className="sec__num mono">{num}</span>
      <h2 className="sec__title">{title}</h2>
      <motion.hr
        className="hr"
        style={{ transformOrigin: "0 50%" }}
        variants={{
          hidden: { scaleX: 0 },
          visible: { scaleX: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
        }}
      />
      {note && <p className="sec__note">{note}</p>}
    </motion.div>
  );
}
