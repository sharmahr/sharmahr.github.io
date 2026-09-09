import { Link } from "react-router-dom";
import Reveal from "../Reveal.jsx";
import ProjectVisual from "../ProjectVisual.jsx";
import { ArrowOut, ArrowRight } from "../icons.jsx";
import { PROJECTS } from "../../data/site.js";

function Project({ project, index }) {
  const content = (
    <>
      <div className={`project__visual project__visual--${project.id}`}><ProjectVisual id={project.id} /><span className="project__open" aria-hidden="true"><ArrowOut /></span></div>
      <div className="project__meta eyebrow"><span>{String(index + 1).padStart(2, "0")} / {project.category}</span><span>{project.external ? "Visit project" : "Case study"} <ArrowOut /></span></div>
      <h3 className="project__title">{project.title}</h3>
      <p className="project__description">{project.description}</p>
      <div className="project__bottom"><span>{project.result}</span><span className="project__tags">{project.tags.join(" / ")}</span></div>
    </>
  );

  return (
    <Reveal as="article" className="project" delay={index % 2 * 0.08}>
      {project.external
        ? <a className="project__link" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={project.action}>{content}</a>
        : <Link className="project__link" to={project.href} aria-label={project.action}>{content}</Link>}
    </Reveal>
  );
}

export default function SelectedWork() {
  return (
    <section className="work sec wrap" id="work" aria-labelledby="work-title">
      <Reveal className="section-heading">
        <div><p className="eyebrow">01 / Selected work</p><h2 id="work-title">Ideas are good.<br /><span className="muted">Shipped is better.</span></h2></div>
        <p className="section-heading__note">A few things I&apos;ve taken from<br />&ldquo;what if&rdquo; to the real world.</p>
      </Reveal>
      <div className="projects">{PROJECTS.map((project, index) => <Project key={project.id} project={project} index={index} />)}</div>
      <Reveal className="work__archive"><p>There&apos;s a longer story.<span>Robots, experiments, and a few late-night ideas.</span></p><Link className="text-link" to="/archive">Explore the archive <ArrowRight /></Link></Reveal>
    </section>
  );
}
