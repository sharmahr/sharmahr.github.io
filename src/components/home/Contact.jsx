import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHead from "../SectionHead.jsx";
import CopyField from "../CopyField.jsx";
import { ArrowOut } from "../icons.jsx";
import { ENTER } from "../../lib/motion.js";
import { PROFILE } from "../../data/site.js";

export default function Contact() {
  return (
    <section className="contact wrap" id="contact">
      <SectionHead num="05" title="Contact" />

      <motion.p
        className="contact__big"
        data-reveal
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={ENTER}
      >
        Open to senior backend,
        <br />
        platform and <span className="it acc">infrastructure</span> roles.
      </motion.p>

      <motion.div
        data-reveal
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ ...ENTER, delay: 0.08 }}
      >
        <p className="lead mb-3xl">
          If you&apos;re hiring for systems that have to stay up, I&apos;d like to hear about it. I
          read every email.
        </p>

        <CopyField value={PROFILE.email} />

        <div className="social">
          <a className="arrowlink lnk lnk--on" href={`mailto:${PROFILE.email}`}>
            Email
          </a>
          <a className="arrowlink lnk" href={PROFILE.linkedin} target="_blank" rel="noopener">
            LinkedIn
            <ArrowOut />
          </a>
          <a className="arrowlink lnk" href={PROFILE.github} target="_blank" rel="noopener">
            GitHub
            <ArrowOut />
          </a>
          <Link className="arrowlink lnk" to="/resume">
            Résumé
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
