import Seo from "../components/Seo.jsx";
import Hero from "../components/home/Hero.jsx";
import Metrics from "../components/home/Metrics.jsx";
import SelectedWork from "../components/home/SelectedWork.jsx";
import Toolkit from "../components/home/Toolkit.jsx";
import Recognition from "../components/home/Recognition.jsx";
import Contact from "../components/home/Contact.jsx";
import Playground from "../components/home/Playground.jsx";
import Reveal from "../components/Reveal.jsx";
import Timeline from "../components/Timeline.jsx";
import { Link } from "react-router-dom";
import { ArrowOut } from "../components/icons.jsx";
import { PERSON_LD } from "../data/site.js";

export default function Home() {
  return (
    <>
      <Seo
        title="Hardik Sharma — Software Engineer / Systems, AI & Products"
        description="Software engineer with 6+ years building distributed systems and cloud infrastructure at Microsoft, Harness and VMware. Vulnerability remediation across 4,000+ datacenters, reserved-instance optimisation, applied AI."
        path="/"
        type="profile"
      >
        <script type="application/ld+json">{JSON.stringify(PERSON_LD)}</script>
      </Seo>

      <main id="main">
        <Hero />
        <Metrics />
        <SelectedWork />

        <section className="experience sec wrap" id="experience" aria-labelledby="experience-title">
          <Reveal className="experience__intro">
            <p className="eyebrow">02 / Experience</p>
            <h2 id="experience-title">Big challenges.<br /><span className="muted">Good company.</span></h2>
            <p>Six years of building things<br />people and platforms depend on.</p>
            <Link className="text-link" to="/resume">View full résumé <ArrowOut /></Link>
            <div className="experience__record eyebrow"><span>6+ years</span><span>3 companies</span></div>
          </Reveal>
          <Reveal><Timeline /></Reveal>
        </section>

        <Toolkit />
        <Playground />
        <Recognition />
        <Contact />
      </main>
    </>
  );
}
