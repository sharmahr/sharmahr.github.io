import Seo from "../components/Seo.jsx";
import Hero from "../components/home/Hero.jsx";
import Metrics from "../components/home/Metrics.jsx";
import SelectedWork from "../components/home/SelectedWork.jsx";
import Toolkit from "../components/home/Toolkit.jsx";
import Recognition from "../components/home/Recognition.jsx";
import Contact from "../components/home/Contact.jsx";
import SectionHead from "../components/SectionHead.jsx";
import Timeline from "../components/Timeline.jsx";
import { PERSON_LD } from "../data/site.js";

export default function Home() {
  return (
    <>
      <Seo
        title="Hardik Sharma — Software Engineer, Distributed Systems &amp; Cloud Platforms"
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

        <section className="sec wrap" id="experience">
          <SectionHead
            num="02"
            title="Experience"
            note="Six years, three companies, one throughline: infrastructure at scale."
          />
          <Timeline />
        </section>

        <Toolkit />
        <Recognition />
        <Contact />
      </main>
    </>
  );
}
