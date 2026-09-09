import { Link } from "react-router-dom";
import Reveal from "../Reveal.jsx";
import CopyField from "../CopyField.jsx";
import { ArrowOut } from "../icons.jsx";
import { PROFILE } from "../../data/site.js";

export default function Contact() {
  return (
    <section className="contact wrap" id="contact" aria-labelledby="contact-title">
      <Reveal className="contact__top"><p className="eyebrow">06 / What&apos;s next?</p><span className="contact__status"><span className="status-dot" /> Open to meaningful conversations</span></Reveal>
      <Reveal className="contact__main">
        <h2 id="contact-title">Have a good<br /><span>problem?</span></h2>
        <a className="contact__arrow" href={`mailto:${PROFILE.email}?subject=Let%27s%20build%20something`} aria-label="Start a conversation by email"><ArrowOut /></a>
      </Reveal>
      <Reveal className="contact__bottom">
        <div><p>Let&apos;s make something that matters.</p><CopyField value={PROFILE.email} /></div>
        <nav className="social" aria-label="Get in touch">
          <a className="text-link" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowOut /></a>
          <a className="text-link" href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowOut /></a>
          <Link className="text-link" to="/resume">Résumé <ArrowOut /></Link>
        </nav>
      </Reveal>
    </section>
  );
}
