import { EXPERIENCE } from "../data/site.js";
import { Plus, MicrosoftMark } from "./icons.jsx";

const SUMMARIES = [
  "Making AI more personal, and more useful.",
  "Eight hours of work. Done in under twenty minutes.",
  "Infrastructure built for 4,000+ datacenters.",
  "Turning operational incidents into faster resolutions."
];

export default function Timeline() {
  return (
    <div className="career">
      {EXPERIENCE.map((job, index) => (
        <details className="career__item" key={`${job.company}-${job.when}`} open={index === 0}>
          <summary className="career__summary">
            <span className={`career__symbol career__symbol--${index}`} aria-hidden="true">{index === 0 ? <MicrosoftMark /> : index === 1 ? "h" : "v"}</span>
            <span className="career__identity"><span className="career__company">{job.company}{index === 0 && <span className="career__current">Currently</span>}</span><span className="career__role">{job.role}</span></span>
            <span className="career__dates eyebrow">{job.when}</span>
            <span className="career__plus"><Plus /></span>
          </summary>
          <div className="career__content">
            <p className="career__statement">{SUMMARIES[index]}</p>
            <p className="career__team eyebrow">{job.team} / {job.where}</p>
            <ul className="bullets">{job.bullets.map((html) => <li key={html} dangerouslySetInnerHTML={{ __html: html }} />)}</ul>
            {index === 1 && <div className="execution-comparison" aria-label="RI execution: eight hours before, under twenty minutes after"><span>Before <b>8 hours</b></span><i /><span>After <b>&lt;20 minutes</b></span><i /></div>}
          </div>
        </details>
      ))}
    </div>
  );
}
