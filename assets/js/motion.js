/* Motion layer — Motion (motion.dev), the vanilla build of Framer Motion.
   Loaded as a module and treated as an enhancement: site.js keeps the page
   usable on its own, and reveals everything if this file never arrives. */

import { animate, inView, scroll, stagger } from "../vendor/motion.min.js";

const root = document.documentElement;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const coarse = matchMedia("(pointer: coarse)").matches;

/* Springs tuned once so the whole page shares a physical vocabulary.
   Entrances are settled and quiet; interactions are quicker and lighter. */
const ENTER = { type: "spring", stiffness: 120, damping: 20, mass: 0.9 };
const SNAP = { type: "spring", stiffness: 420, damping: 26, mass: 0.6 };

const revealables = () => document.querySelectorAll("[data-reveal]");

/* Division of labour, and it matters: CSS owns opacity, so `.is-in` alone
   is enough to make a thing readable. Motion only ever animates transform.
   If the animation stalls, is throttled, or the module half-loads, the
   worst case is content sitting a few pixels low — never invisible. */
function settle(el) {
  el.classList.add("is-in");
  el.style.removeProperty("transform");
}

function enter(el, keyframes, options) {
  el.classList.add("is-in");
  const controls = animate(el, keyframes, options);
  controls.finished.then(() => settle(el)).catch(() => settle(el));
  return controls;
}

if (reduced) {
  revealables().forEach((el) => el.classList.add("is-in"));
  window.__hsMotion = true;
  root.classList.add("motion");
} else {
  try {
    boot();
    window.__hsMotion = true;
    root.classList.add("motion");
    watchdog();
  } catch (err) {
    /* Leave site.js's plain fallback armed rather than risk a blank page. */
    console.error("motion layer failed, falling back", err);
  }
}

/* Nothing visible on screen is ever allowed to stay at opacity 0. */
function watchdog() {
  const check = () => {
    const vh = window.innerHeight;
    revealables().forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0 && parseFloat(getComputedStyle(el).opacity) < 0.99) settle(el);
    });
  };
  setTimeout(check, 2600);
  window.addEventListener("load", () => setTimeout(check, 1200));
}

function boot() {
  revealOnScroll();
  heroSequence();
  parallax();
  progressBar();
  countMetrics();
  experienceTimeline();
  pressFeedback();
  lattice();
  tiltPlates();
}

/* ---------- Scroll reveal, staggered per group ---------- */

function revealOnScroll() {
  const groups = new Map();
  /* The hero is choreographed separately; animating it twice would fight. */
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    if (el.closest(".hero")) return;
    const parent = el.parentElement || document.body;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(el);
  });

  groups.forEach((items) => {
    items.forEach((el, i) => {
      inView(
        el,
        () => {
          enter(el, { y: [18, 0] }, { ...ENTER, delay: Math.min(i, 5) * 0.06 });
        },
        { amount: 0.15, margin: "0px 0px -8% 0px" }
      );
    });
  });
}

/* ---------- Hero: one choreographed entrance, not eight ---------- */

function heroSequence() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const parts = Array.from(hero.querySelectorAll("[data-reveal]"));
  const name = hero.querySelector(".hero__name");
  const rest = parts.filter((el) => el !== name);

  rest.forEach((el) => el.classList.add("is-in"));
  const run = animate(rest, { y: [26, 0] }, { ...ENTER, delay: stagger(0.08, { startDelay: 0.05 }) });
  const release = () => rest.forEach(settle);
  run.finished.then(release).catch(release);

  /* The name gets its own beat: a heavier spring, and it leads. */
  if (name) {
    enter(name, { y: [40, 0], scale: [0.97, 1] }, { type: "spring", stiffness: 90, damping: 18 });
  }
}

/* ---------- Scroll-linked parallax ---------- */

function parallax() {
  if (coarse) return;

  const portrait = document.querySelector(".portrait img");
  if (portrait) {
    scroll(animate(portrait, { y: [-14, 22] }, { ease: "linear" }), {
      target: document.querySelector(".hero__media"),
      offset: ["start end", "end start"]
    });
  }

  document.querySelectorAll(".entry .plate, .entry .shot img").forEach((el) => {
    scroll(animate(el, { y: [16, -16] }, { ease: "linear" }), {
      target: el.closest(".entry"),
      offset: ["start end", "end start"]
    });
  });
}

/* ---------- Nav progress, driven by Motion's scroll() ---------- */

function progressBar() {
  const bar = document.querySelector(".prog");
  if (!bar) return;
  bar.style.transformOrigin = "0 50%";
  scroll(animate(bar, { scaleX: [0, 1] }, { ease: "linear" }));
}

/* ---------- Experience timeline ----------
   The rule down the gutter is drawn by scroll position rather than by a
   timer, so it tracks the reader exactly: scrubbing back up un-draws it.
   Each role then knots onto the rule as it arrives, and its bullets slide
   in behind it. Transform only, so nothing here can hide the content. */

function experienceTimeline() {
  const tl = document.querySelector(".timeline");
  if (!tl) return;

  const line = tl.querySelector(".timeline__line");
  if (line) {
    scroll(animate(line, { scaleY: [0, 1] }, { ease: "linear" }), {
      target: tl,
      offset: ["start 82%", "end 65%"]
    });
  }

  tl.querySelectorAll(".job").forEach((job) => {
    const node = job.querySelector(".job__node");
    if (node) {
      /* The knot pops via CSS: a transform this small is not worth a
         JS animation that could be interrupted mid-flight and vanish. */
      inView(job, () => node.classList.add("is-live"), { amount: 0.1 });
    }

    const bullets = job.querySelectorAll(".bullets li");
    if (bullets.length) {
      inView(
        job,
        () => {
          animate(bullets, { x: [-10, 0] }, { ...ENTER, delay: stagger(0.05, { startDelay: 0.1 }) });
        },
        { amount: 0.1 }
      );
    }
  });
}

/* ---------- Metrics count up once, when they arrive ---------- */

function countMetrics() {
  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = parseFloat(el.dataset.count);
    if (Number.isNaN(target)) return;
    let done = false;

    inView(
      el,
      () => {
        if (done) return;
        done = true;
        animate(0, target, {
          duration: 1.5,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (v) => {
            el.textContent = Math.round(v).toLocaleString("en-US");
          }
        });
      },
      { amount: 0.6 }
    );
  });
}

/* ---------- Press feedback with real spring physics ---------- */

function pressFeedback() {
  document.querySelectorAll(".btn, .copybtn, .iconbtn").forEach((el) => {
    el.addEventListener("pointerdown", () => animate(el, { scale: 0.96 }, SNAP));
    ["pointerup", "pointerleave", "pointercancel"].forEach((evt) =>
      el.addEventListener(evt, () => animate(el, { scale: 1 }, SNAP))
    );
  });
}

/* ---------- 3D: cluster lattice (Zdog) ---------- */

function lattice() {
  const canvas = document.getElementById("lattice");
  if (!canvas || !window.Zdog) return;

  const Z = window.Zdog;
  const css = getComputedStyle(document.body);
  const readVar = (n, fallback) => (css.getPropertyValue(n) || fallback).trim();

  const illo = new Z.Illustration({
    element: canvas,
    zoom: 4.4,
    dragRotate: true,
    resize: false
  });

  const ink = readVar("--ink", "#f3efe7");
  const accent = readVar("--accent", "#e8663a");

  /* A 3x3x3 lattice of nodes with edges along each axis: a cluster, drawn
     the way you would sketch one on paper. Three nodes are marked to stand
     in for the ones you are actually paged about. */
  const S = 26;
  const coords = [-1, 0, 1];
  const hot = new Set(["-1,1,0", "1,-1,1", "0,0,-1"]);
  const hotShapes = [];
  const coolShapes = [];

  coords.forEach((x) =>
    coords.forEach((y) =>
      coords.forEach((z) => {
        const isHot = hot.has(`${x},${y},${z}`);
        const node = new Z.Shape({
          addTo: illo,
          translate: { x: x * S, y: y * S, z: z * S },
          stroke: isHot ? 4.2 : 2.2,
          color: isHot ? accent : ink
        });
        (isHot ? hotShapes : coolShapes).push(node);
      })
    )
  );

  /* Edges: one segment per adjacent pair, no duplicates. */
  const edge = (a, b) =>
    coolShapes.push(
      new Z.Shape({
        addTo: illo,
        path: [a, b],
        stroke: 0.55,
        color: ink
      })
    );

  coords.forEach((a) =>
    coords.forEach((b) => {
      edge({ x: -S, y: a * S, z: b * S }, { x: S, y: a * S, z: b * S });
      edge({ x: a * S, y: -S, z: b * S }, { x: a * S, y: S, z: b * S });
      edge({ x: a * S, y: b * S, z: -S }, { x: a * S, y: b * S, z: S });
    })
  );

  illo.rotate.x = -0.32;
  illo.rotate.y = 0.6;

  /* Fade in only once there is something to show. The class is the
     guarantee; the animation is just the nicer version of it. */
  setTimeout(() => canvas.classList.add("is-in"), 420);

  let dragging = false;
  illo.onDragStart = () => (dragging = true);
  illo.onDragEnd = () => (dragging = false);

  let raf;
  let running = true;

  function frame() {
    if (running) {
      if (!dragging) illo.rotate.y += 0.0042;
      illo.updateRenderGraph();
    }
    raf = requestAnimationFrame(frame);
  }
  frame();

  /* Stop burning frames when it is off screen or the tab is hidden. */
  new IntersectionObserver(
    ([e]) => {
      running = e.isIntersecting && !document.hidden;
    },
    { threshold: 0 }
  ).observe(canvas);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) running = false;
  });

  /* Re-read the palette when the theme flips. */
  const themes = new MutationObserver(() => {
    const c = getComputedStyle(document.body);
    const nextInk = (c.getPropertyValue("--ink") || ink).trim();
    const nextAccent = (c.getPropertyValue("--accent") || accent).trim();
    hotShapes.forEach((s) => (s.color = nextAccent));
    coolShapes.forEach((s) => (s.color = nextInk));
    illo.updateRenderGraph();
  });
  themes.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

  window.addEventListener("pagehide", () => cancelAnimationFrame(raf));
}

/* ---------- 3D: parallax tilt on the figure column ---------- */

function tiltPlates() {
  if (coarse || !window.VanillaTilt) return;
  const targets = document.querySelectorAll(".entry .plate, .entry .shot");
  if (!targets.length) return;

  /* Deliberately shallow, and no glare: this should read as the page
     having depth, not as a novelty card effect. */
  window.VanillaTilt.init(targets, {
    max: 6,
    speed: 700,
    perspective: 1400,
    scale: 1.012,
    glare: false,
    gyroscope: false,
    "reset-to-start": true
  });
}
