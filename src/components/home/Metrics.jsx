import { motion } from "framer-motion";
import Counter from "../Counter.jsx";
import { ENTER } from "../../lib/motion.js";

const grid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const cell = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: ENTER }
};

const METRICS = [
  {
    figure: (
      <>
        <Counter to={4000} />
        <em>+</em>
      </>
    ),
    label: "Datacenters scanned and patched by the remediation platform I architected at VMware"
  },
  {
    figure: (
      <>
        8h <em>→</em> 20m
      </>
    ),
    label: "Reserved-instance exchange execution, after the accelerator I built at Harness"
  },
  {
    figure: (
      <>
        <Counter to={1500} />
        <em>+</em>
      </>
    ),
    label: "Engineers registered on AlgoRush, the interview-prep platform I build and run"
  },
  {
    figure: (
      <>
        <Counter to={50} />
        <em>%</em>
      </>
    ),
    label: "Cut in mean incident resolution time from the script-recommendation service"
  }
];

export default function Metrics() {
  return (
    <section className="sec--tight wrap" aria-label="Impact at a glance">
      <motion.div
        className="metrics"
        variants={grid}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {METRICS.map((m) => (
          <motion.div className="metric" key={m.label} variants={cell} data-reveal>
            <span className="metric__n">{m.figure}</span>
            <span className="metric__l">{m.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
