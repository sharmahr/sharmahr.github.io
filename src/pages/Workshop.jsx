import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import { ArrowBack, ArrowOut } from "../components/icons.jsx";
import { listParent, listChild, VIEWPORT } from "../lib/motion.js";

function Metric({ number, label }) {
  return (
    <motion.div className="metric" variants={listChild}>
      <span className="metric__n">{number}</span>
      <span className="metric__l">{label}</span>
    </motion.div>
  );
}

export default function Workshop() {
  return (
    <>
      <Seo
        title="Processing workshop — Hardik Sharma"
        description="A three-hour Processing workshop I ran for 61 computer science students at RCOEM, from first shapes to a working brick-breaker game."
        path="/events/robotics-workshop"
      />

      <main id="main" className="wrap">
        <Reveal className="pagehead">
          <Link className="back mono" to="/archive">
            <ArrowBack />
            Archive
          </Link>
          <h1>Introduction to Processing</h1>
          <p className="mono muted mt-note">Polaris, RCOEM · 4 January 2019 · 61 attendees</p>
        </Reveal>

        <motion.div
          className="metrics gap-b"
          data-reveal
          variants={listParent(0.055, 0.03)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <Metric number="77" label="Students registered through the sign-up form" />
          <Metric number="61" label="Actually turned up on the day" />
          <Metric number="3 hrs" label="From first shape to a working brick-breaker" />
          <Metric number="20 min" label="Set aside for them to build whatever they wanted" />
        </motion.div>

        <Reveal className="rail band">
          <p className="mono muted">Why</p>
          <div className="prose">
            <p>
              Over a winter break I started learning Processing — the open-source graphics library
              and IDE built for artists and designers, which runs on Java with most of the
              ceremony stripped out. It was good enough fun that I wanted to hand it to other
              people.
            </p>
            <p>
              I asked my professor and the head of department for a slot, and got three hours with
              second-, third- and fourth-year computer science students as part of Polaris.
              Seventy-seven registered; sixty-one showed up.
            </p>
            <img
              src="/assets/events/workshop.png"
              alt="Students attending the Processing workshop in a college computer lab"
            />
          </div>
        </Reveal>

        <Reveal className="rail band band--boxed">
          <p className="mono muted">What we covered</p>
          <div className="prose">
            <p>
              We started from the bottom: opening a window, drawing circles, rectangles and
              polygons, and setting background and fill colours. From there into the graphics
              underneath — line-drawing algorithms, polygon-drawing algorithms and 2D
              transformations.
            </p>
            <p>
              Then I stopped teaching and gave them twenty minutes to make anything they liked.
              That was the best part of the day. Students learn more when they are set loose, and
              the room produced genuinely good work out of a handful of primitives — which made a
              natural excuse to push further into motion and physics.
            </p>
            <p>
              We finished by building a bouncing ball, then turning it into a brick-breaker game.
              Several people left interested in a domain they had not considered that morning,
              which was the entire objective.
            </p>
          </div>
        </Reveal>

        <Reveal className="rail band band--open">
          <p className="mono muted">Related</p>
          <p>
            <Link className="arrowlink lnk" to="/archive">
              Simulations and games built with p5.js
              <ArrowOut />
            </Link>
          </p>
        </Reveal>
      </main>
    </>
  );
}
