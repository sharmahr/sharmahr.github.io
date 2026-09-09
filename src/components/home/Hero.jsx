import { Link } from "react-router-dom";
import SystemSculpture from "../SystemSculpture.jsx";
import { ArrowRight, ArrowOut, MicrosoftMark } from "../icons.jsx";

export default function Hero() {
  return (
    <section className="hero wrap" id="intro" aria-labelledby="hero-title">
      <div className="hero__topline eyebrow">
        <span><span className="status-dot" /> An engineer. A builder. A curious mind.</span>
        <span className="hero__edition">Independent portfolio / 2026</span>
      </div>
      <div className="hero__stage">
        <div className="hero__copy">
          <p className="hero__intro">Hi, I&apos;m Hardik Sharma.</p>
          <h1 id="hero-title">Complex<br />systems.<br /><span>Real impact.</span></h1>
          <p className="hero__description">
            I build distributed systems and AI products. Currently at Microsoft,
            turning complex technology into experiences that feel simple.
          </p>
          <div className="hero__cta">
            <Link className="btn btn--solid" to="/#work">Explore my work <ArrowRight /></Link>
            <Link className="text-link" to="/resume">View résumé <ArrowOut /></Link>
          </div>
        </div>
        <SystemSculpture />
      </div>
      <div className="hero__bottom">
        <div className="hero__companies">
          <span className="eyebrow">Built with<br />good company</span>
          <span className="company-wordmark company-wordmark--microsoft"><MicrosoftMark /> Microsoft</span>
          <span className="company-wordmark company-wordmark--harness"><i aria-hidden="true">h</i> Harness</span>
          <span className="company-wordmark company-wordmark--vmware">vmware</span>
        </div>
        <Link className="hero__scroll eyebrow" to="/#work"><span>Scroll to explore</span><span aria-hidden="true">↓</span></Link>
      </div>
    </section>
  );
}
