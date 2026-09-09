import { Link } from "react-router-dom";
import Reveal from "../Reveal.jsx";
import { ArrowOut, ArrowRight } from "../icons.jsx";

export default function Playground() {
  return (
    <section className="playground wrap" id="playground" aria-labelledby="playground-title">
      <Reveal className="playground__inner">
        <div className="playground__copy">
          <p className="eyebrow">04 / After hours</p>
          <h2 id="playground-title">No roadmap.<br />Just curiosity.</h2>
          <p>Neural networks learning to fly. Rockets evolving a way around obstacles. Sometimes, the best way to understand something is to play with it.</p>
          <Link className="btn btn--dark" to="/lab/flappy-bird">Teach a bird to fly <ArrowRight /></Link>
          <div className="playground__links"><Link to="/lab/smart-rockets">Smart Rockets <ArrowOut /></Link><Link to="/lab/maze-solver">Maze solver <ArrowOut /></Link><Link to="/lab/snake">Snake <ArrowOut /></Link></div>
        </div>
        <div className="flight-study" aria-hidden="true">
          <div className="flight-study__top eyebrow"><span>Neuroevolution / Flight study</span><span>p5.js</span></div>
          <svg viewBox="0 0 500 360" fill="none" className="flight-study__paths">
            <path d="M0 90c80 0 110 140 165 95s65-100 160-75 85 50 180-15" stroke="#627a35" strokeWidth="1" opacity=".6" />
            <path d="M0 175c80-60 115 15 165 10s80-85 140-35 130 50 200 75" stroke="#627a35" strokeWidth="1" opacity=".5" />
            <path d="M0 235c70-70 115-15 165-50s90-30 150 45 100 25 190 15" stroke="#627a35" strokeWidth="1" opacity=".4" />
            <path d="M0 175c70 35 135 45 175 0s80-52 135 0 100 40 195 5" stroke="#283b15" strokeWidth="2" pathLength="1" className="flight-study__best" />
            <path d="M352 0h50v112h-50zm0 249h50v111h-50Z" fill="#a7c765" stroke="#6d8a3d" />
            <path d="M345 101h64v12h-64zm0 137h64v12h-64Z" transform="translate(0 112)" fill="none" />
            <g transform="translate(167 177)" className="flight-study__bird"><rect x="-18" y="-15" width="32" height="27" rx="7" fill="#243718" /><path d="M14-6h13v10H14Z" fill="#f1f5dc" /><rect x="2" y="-10" width="5" height="5" fill="#d8edb0" /><path d="M-28-1h19m-22 8h17" stroke="#243718" strokeWidth="2" /></g>
            <circle cx="436" cy="196" r="4" fill="#243718" />
          </svg>
          <div className="flight-study__bottom"><span>Try. Learn. Evolve.</span><span className="eyebrow">An experiment, not a product.</span></div>
        </div>
      </Reveal>
    </section>
  );
}
