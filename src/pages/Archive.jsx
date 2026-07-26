import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHead from "../components/SectionHead.jsx";
import { ArrowBack } from "../components/icons.jsx";
import { listParent, listChild, VIEWPORT } from "../lib/motion.js";

const MotionLink = motion.create(Link);

function Card({ href, to, image, alt, title, description, meta, external = false }) {
  const children = (
    <>
      <img className="card__img" src={image} alt={alt} />
      <span className="card__t">{title}</span>
      <span className="card__d">{description}</span>
      <span className="card__meta">{meta}</span>
    </>
  );

  const props = { className: "card", variants: listChild };

  return external ? (
    <motion.a {...props} href={href} target="_blank" rel="noopener">
      {children}
    </motion.a>
  ) : (
    <MotionLink {...props} to={to}>
      {children}
    </MotionLink>
  );
}

function Cards({ children }) {
  return (
    <motion.div
      className="cards"
      data-reveal
      variants={listParent(0.055, 0.03)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

function IndexRow({ to, n, title, note, meta }) {
  return (
    <MotionLink className="idxrow" to={to} variants={listChild}>
      <span className="idxrow__n mono">{n}</span>
      <span className="idxrow__t">
        {title}
        <small>{note}</small>
      </span>
      <span className="idxrow__meta">{meta}</span>
    </MotionLink>
  );
}

export default function Archive() {
  return (
    <>
      <Seo
        title="Archive — Hardik Sharma"
        description="Project archive: competition robots, computer-vision builds, genetic-algorithm simulations and playable p5.js games by Hardik Sharma."
        path="/archive"
      />

      <main id="main" className="wrap">
        <Reveal className="pagehead">
          <Link className="back mono" to="/">
            <ArrowBack />
            Back
          </Link>
          <h1>Archive</h1>
          <p className="lead mt-xl">
            Before the datacenters there were robots. Competition builds, computer-vision
            experiments and simulations from 2017 onward — most of them still run.
          </p>
        </Reveal>

        <section className="sec--tight">
          <SectionHead num="01" title="Robotics" note="Built for competition, mostly at 3am." />

          <Cards>
            <Card
              external
              href="https://www.youtube.com/watch?v=fKBgzZK45yA"
              image="/assets/images/escalade.jpg"
              alt="Wall-climbing robot gripping a vertical surface during the Escalade competition"
              title="Wall-climbing robot"
              description="Built for Escalade at IIT Guwahati: climb a vertical wall and complete tasks against the clock. First place out of 60 teams."
              meta="2018 · Winner · Video ↗"
            />
            <Card
              external
              href="https://www.youtube.com/watch?v=Q7-LRJBurlQ"
              image="/assets/images/mazesolving.jpg"
              alt="Maze-solving robot navigating a taped maze"
              title="Maze-solving robot"
              description="Records every turn on a dry run, then eliminates the dead-end U-turns to compute the shortest path on the second pass. Third at Techfest, IIT Bombay."
              meta="2018 · C++ · Video ↗"
            />
            <Card
              external
              href="https://www.youtube.com/watch?v=t-L7Ybl-mp4"
              image="/assets/images/towerofhanoi.png"
              alt="Robotic arm moving discs in a Tower of Hanoi puzzle"
              title="Tower of Hanoi robot"
              description="A robotic arm that solves the puzzle physically — the recursive solution driving real servos rather than console output."
              meta="C++ · Video ↗"
            />
            <Card
              external
              href="https://www.youtube.com/watch?v=CvS2zukQTMM"
              image="/assets/images/cnc.jpg"
              alt="CNC plotter drawing a portrait sketch on paper"
              title="CNC portrait plotter"
              description="Detects a face in a photograph, reduces it to strokes, and drives a two-axis plotter to draw the sketch on paper."
              meta="Vision + CNC · Video ↗"
            />
            <Card
              external
              href="https://youtu.be/cruiM_0TyPw"
              image="/assets/images/quad.jpg"
              alt="Custom-built quadcopter in flight"
              title="Quadcopter"
              description="Built from the frame up. The starting point for a longer detour into autonomous flight and crop-health monitoring."
              meta="Hardware · Video ↗"
            />
          </Cards>
        </section>

        <section className="sec--tight">
          <SectionHead num="02" title="Computer vision" note="Cameras pointed at problems." />

          <Cards>
            <Card
              to="/work/smart-parking"
              image="/assets/projects/parkit/parkit.png"
              alt="Park It parking availability application interface"
              title="Park It"
              description="Mask R-CNN over parking-lot camera feeds to find genuinely vacant bays, with an Android app to reserve one before you drive out. Smart India Hackathon finalist."
              meta="2019 · Mask R-CNN · Write-up"
            />
            <Card
              external
              href="https://www.youtube.com/watch?v=G3Z0gUNIwow"
              image="/assets/projects/mirror.png"
              alt="Smart mirror projecting virtual glasses onto a face"
              title="Smart mirror"
              description="A mirror that tracks your face and overlays eyewear in real time, so the fitting-room queue becomes optional."
              meta="Face tracking · Video ↗"
            />
            <Card
              external
              href="https://www.youtube.com/watch?v=-VJ5w3DlcYw"
              image="/assets/projects/spaceinvader.png"
              alt="Space Invader arcade game controlled by body motion"
              title="Space Invader, motion-controlled"
              description="The arcade classic rebuilt so the ship follows your body instead of the arrow keys. Playing it counts as light exercise."
              meta="Processing · Video ↗"
            />
          </Cards>
        </section>

        <section className="sec--tight">
          <SectionHead num="03" title="Simulations" note="All four still run in the browser." />

          <Cards>
            <Card
              to="/lab/flappy-bird"
              image="/assets/projects/flappybird.png"
              alt="Flappy Bird clone with multiple AI-controlled birds in flight"
              title="Neuroevolution of Flappy Bird"
              description="A population of neural networks evolved by genetic algorithm across generations until the birds stop hitting pipes."
              meta="p5.js · Playable"
            />
            <Card
              to="/lab/smart-rockets"
              image="/assets/projects/rocket.png"
              alt="Smart Rockets genetic algorithm simulation with rockets avoiding an obstacle"
              title="Smart Rockets"
              description="Rockets encode their thrust sequence as DNA and breed toward the target across generations, learning to steer around the obstacle."
              meta="Genetic algorithm · Playable"
            />
            <Card
              to="/lab/maze-solver"
              image="/assets/projects/mazesolver.png"
              alt="Maze solver visualisation showing a shortest path search"
              title="Maze solver"
              description="Generates a maze, then visualises shortest-path search through it — the textbook graph algorithms made watchable."
              meta="Pathfinding · Playable"
            />
            <Card
              to="/lab/snake"
              image="/assets/projects/snake.png"
              alt="Classic Snake game rendered in p5.js"
              title="Snake"
              description="The first game I ever finished. Kept here mostly for sentimental reasons."
              meta="p5.js · Playable"
            />
          </Cards>
        </section>

        <section className="sec--tight">
          <SectionHead num="04" title="Teaching" />

          <motion.div
            className="index"
            data-reveal
            variants={listParent(0.055, 0.02)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <IndexRow
              to="/events/robotics-workshop"
              n="01"
              title="Workshop on Processing"
              note="Ran a hands-on session for my college on creative coding with Processing."
              meta="Jan 2019"
            />
            <IndexRow
              to="/credentials/sih-2019"
              n="02"
              title="Competition certificates"
              note="Smart India Hackathon, Escalade, Meshmerize and RoboCup."
              meta="2017 — 2019"
            />
          </motion.div>
        </section>
      </main>
    </>
  );
}
