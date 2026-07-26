import { useEffect, useRef, useState } from "react";

const SIZE = 520;
const S = 26;
const COORDS = [-1, 0, 1];
/* Three nodes stand in for the ones you actually get paged about. */
const HOT = new Set(["-1,1,0", "1,-1,1", "0,0,-1"]);

/**
 * A 3×3×3 cluster lattice, drawn the way you would sketch one on paper.
 * Zdog rather than WebGL: flat vector pseudo-3D reads as a diagram, which
 * is the point — it is a figure in an engineering document, not a hero
 * background. Loaded lazily and paused whenever it is off screen.
 */
export default function Lattice() {
  const canvasRef = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let raf;
    let illo;
    let observer;
    let themes;
    let cancelled = false;
    let running = true;
    let dragging = false;

    const onVisibility = () => {
      if (document.hidden) running = false;
    };

    import("zdog")
      .then(({ default: Zdog }) => {
        if (cancelled) return;

        const readVar = (name, fallback) =>
          (getComputedStyle(document.body).getPropertyValue(name) || fallback).trim();

        let ink = readVar("--ink", "#f3efe7");
        let accent = readVar("--accent", "#e8663a");

        illo = new Zdog.Illustration({
          element: canvas,
          zoom: 4.4,
          dragRotate: true,
          resize: false
        });

        const hotShapes = [];
        const coolShapes = [];

        COORDS.forEach((x) =>
          COORDS.forEach((y) =>
            COORDS.forEach((z) => {
              const isHot = HOT.has(`${x},${y},${z}`);
              const node = new Zdog.Shape({
                addTo: illo,
                translate: { x: x * S, y: y * S, z: z * S },
                stroke: isHot ? 4.2 : 2.2,
                color: isHot ? accent : ink
              });
              (isHot ? hotShapes : coolShapes).push(node);
            })
          )
        );

        const edge = (a, b) =>
          coolShapes.push(new Zdog.Shape({ addTo: illo, path: [a, b], stroke: 0.55, color: ink }));

        COORDS.forEach((a) =>
          COORDS.forEach((b) => {
            edge({ x: -S, y: a * S, z: b * S }, { x: S, y: a * S, z: b * S });
            edge({ x: a * S, y: -S, z: b * S }, { x: a * S, y: S, z: b * S });
            edge({ x: a * S, y: b * S, z: -S }, { x: a * S, y: b * S, z: S });
          })
        );

        illo.rotate.x = -0.32;
        illo.rotate.y = 0.6;
        illo.onDragStart = () => {
          dragging = true;
        };
        illo.onDragEnd = () => {
          dragging = false;
        };

        const frame = () => {
          if (running) {
            if (!dragging) illo.rotate.y += 0.0042;
            illo.updateRenderGraph();
          }
          raf = requestAnimationFrame(frame);
        };
        frame();
        setShown(true);

        observer = new IntersectionObserver(
          ([entry]) => {
            running = entry.isIntersecting && !document.hidden;
          },
          { threshold: 0 }
        );
        observer.observe(canvas);
        document.addEventListener("visibilitychange", onVisibility);

        /* Re-read the palette when the theme flips. */
        themes = new MutationObserver(() => {
          ink = readVar("--ink", ink);
          accent = readVar("--accent", accent);
          hotShapes.forEach((s) => {
            s.color = accent;
          });
          coolShapes.forEach((s) => {
            s.color = ink;
          });
          illo.updateRenderGraph();
        });
        themes.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["data-theme"]
        });
      })
      .catch(() => {
        /* Decorative. If it never arrives, the canvas simply stays empty. */
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      observer?.disconnect();
      themes?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`lattice${shown ? " is-in" : ""}`}
      width={SIZE}
      height={SIZE}
      aria-hidden="true"
    />
  );
}
