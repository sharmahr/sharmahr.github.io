import { Link } from "react-router-dom";
import Reveal from "../Reveal.jsx";
import { ArrowOut } from "../icons.jsx";
import { AWARDS } from "../../data/site.js";

export default function Recognition() {
  return (
    <section className="recognition sec wrap" id="recognition" aria-labelledby="recognition-title">
      <Reveal className="recognition__intro"><p className="eyebrow">05 / Along the way</p><h2 id="recognition-title">A few<br /><span className="muted">milestones.</span></h2><p>From competition floors<br />to production systems.</p></Reveal>
      <Reveal className="awards">
        {AWARDS.map((award) => (
          <div className="award" key={award.title}>
            <span className="award__yr eyebrow">{award.year}</span>
            <div><h3 className="award__t">{award.to ? <Link to={award.to}>{award.title}<ArrowOut /></Link> : award.title}</h3><p className="award__by">{award.by}</p></div>
          </div>
        ))}
        <div className="education"><span className="eyebrow">The foundations</span><p>B.E. Computer Science &amp; Engineering</p><span>RCOEM, Nagpur / 2016–2020 / GPA 8.86</span></div>
      </Reveal>
    </section>
  );
}
