import { motion } from "framer-motion";
import { ENTER } from "../../lib/motion.js";

const grid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } }
};

const cell = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: ENTER }
};

/* Ordered by magnitude, because on this ladder the size step carries the
   information: the largest figure is set largest. */
const RUNGS = [
  {
    n: "4000+",
    label:
      "Datacenters scanned and patched by the vulnerability remediation platform I architected",
    src: "VMware · 2020—2024"
  },
  {
    n: "1500+",
    label: "Engineers registered on AlgoRush, the interview-prep platform I build and run",
    src: "Independent · ongoing"
  },
  {
    n: "50%",
    label: "Cut in mean incident resolution time from the script-recommendation service I built",
    src: "VMware · 2020"
  },
  {
    n: ["8h", "20m"],
    label: "Reserved-instance exchange execution, after the transaction accelerator I built",
    src: "Harness · 2024"
  }
];

export default function Metrics() {
  return (
    <section className="sec--tight wrap" aria-label="Impact at a glance">
      <motion.div
        className="ladder"
        variants={grid}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {RUNGS.map((r, i) => (
          <motion.div className="rung" data-step={i + 1} key={r.src} variants={cell} data-reveal>
            <span className="rung__n">
              {Array.isArray(r.n) ? (
                <>
                  {r.n[0]} <em>&rarr;</em> {r.n[1]}
                </>
              ) : (
                r.n
              )}
            </span>
            <span className="rung__body">
              <span className="rung__l">{r.label}</span>
              <span className="rung__src mono">{r.src}</span>
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
