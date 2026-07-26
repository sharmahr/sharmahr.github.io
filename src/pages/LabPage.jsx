import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import P5Canvas from "../components/P5Canvas.jsx";
import { ArrowBack, ArrowOut } from "../components/icons.jsx";
import { ENTER } from "../lib/motion.js";
import { LAB } from "../data/lab.js";

export default function LabPage({ slug }) {
  const item = LAB[slug];

  return (
    <>
      <Seo title={item.seoTitle} description={item.seoDescription} path={`/lab/${slug}`} />

      <main id="main" className="wrap">
        <Reveal className="pagehead">
          <Link className="back mono" to="/archive">
            <ArrowBack />
            Archive
          </Link>
          <h1>{item.title}</h1>
          <p className="mono muted mt-note">{item.kicker}</p>
        </Reveal>

        <Reveal className="rail pb-md" delay={0.06}>
          <p className="mono muted">Controls</p>
          <p className="lead t-body">{item.controls}</p>
        </Reveal>

        {/* The sketch itself scales up rather than sliding: it should read as
            the canvas coming to life, not as another block of page furniture. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...ENTER, delay: 0.12 }}
        >
          <P5Canvas sketch={item.sketch} label={item.label} />
        </motion.div>

        <Reveal className="rail band band--tight">
          <p className="mono muted">How it works</p>
          <div className="prose">
            {item.how.map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
          </div>
        </Reveal>

        {item.source && (
          <Reveal className="rail band band--lead">
            <p className="mono muted">Source</p>
            <p>
              <a className="arrowlink lnk" href={item.source} target="_blank" rel="noopener">
                View on GitHub
                <ArrowOut />
              </a>
            </p>
          </Reveal>
        )}
      </main>
    </>
  );
}
