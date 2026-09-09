import Reveal from "../Reveal.jsx";

export default function Metrics() {
  return (
    <section className="impact wrap" aria-label="A few numbers behind the work">
      <Reveal className="impact__intro"><span className="eyebrow">Not just code.</span><p>Outcomes.</p></Reveal>
      <Reveal className="impact__item" delay={0.04}><p className="impact__number">4,000<span>+</span></p><p>Datacenters secured</p><span className="eyebrow">VMware / Fleet remediation</span></Reveal>
      <Reveal className="impact__item" delay={0.08}><p className="impact__number">8h <span className="impact__arrow">→</span> &lt;20m</p><p>Reserved-instance exchanges</p><span className="eyebrow">Harness / Execution time</span></Reveal>
      <Reveal className="impact__item" delay={0.12}><p className="impact__number">1,500<span>+</span></p><p>Engineers on AlgoRush</p><span className="eyebrow">Independent / Built solo</span></Reveal>
    </section>
  );
}
