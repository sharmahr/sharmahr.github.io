import { Link } from "react-router-dom";
import Reveal from "../Reveal.jsx";
import Clock from "../Clock.jsx";
import { ArrowOut } from "../icons.jsx";
import { TOOLKIT, PROFILE } from "../../data/site.js";

export default function Toolkit() {
  return (
    <section className="about sec wrap" id="about" aria-labelledby="about-title">
      <Reveal className="about__portrait-column">
        <p className="eyebrow">03 / The person behind the code</p>
        <figure className="about__portrait">
          <img src="/assets/images/Hardik_Sharma.jpeg" width="653" height="653" loading="lazy" decoding="async" alt="Hardik Sharma, smiling" />
          <figcaption><span>Hardik Sharma</span><span className="eyebrow">Engineer, not a robot.</span></figcaption>
          <span className="portrait-corner" aria-hidden="true">hs.</span>
        </figure>
        <div className="about__location"><span className="status-dot" /><span>{PROFILE.location}</span><span className="mono"><Clock /> IST</span></div>
      </Reveal>
      <div className="about__content">
        <Reveal>
          <h2 id="about-title">Serious about the craft.<br /><span className="muted">Curious about everything.</span></h2>
          <p className="about__lead">I&apos;ve always liked taking things apart.<br />These days, I get to build them back better.</p>
          <p>It started with competition robots. Then cloud platforms, developer tools, and systems spanning thousands of datacenters. Now, it&apos;s AI experiences at Microsoft&apos;s Frontier Foundry.</p>
          <p>The throughline? I care about what happens underneath: the architecture, the edge cases, the small decisions that make something feel effortless.</p>
          <Link className="text-link" to="/resume">The full story, on paper <ArrowOut /></Link>
        </Reveal>
        <Reveal className="about__toolkit" id="toolkit">
          <p className="eyebrow">A working toolkit / Always evolving</p>
          <dl className="tools">{TOOLKIT.map((group) => <div className="toolrow" key={group.label}><dt>{group.label}</dt><dd>{group.items.map((item) => <span className="chip" key={item}>{item}</span>)}</dd></div>)}</dl>
        </Reveal>
      </div>
    </section>
  );
}
