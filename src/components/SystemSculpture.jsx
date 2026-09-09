import { useEffect, useRef, useState } from "react";

function SystemFallback() {
  return (
    <svg className="system__fallback" viewBox="0 0 600 620" fill="none" aria-hidden="true">
      <g stroke="#536246" strokeWidth="1">
        <path d="m65 432 235 136 235-136M90 418l235 136M115 404l235 136M140 390l235 136M165 376l235 136M190 362l235 136M215 348l235 136" opacity=".3" />
        <path d="M180 410V215m240 210V225M300 515V320" strokeDasharray="3 6" />
        <path d="m115 402 185-108 185 108v12L300 522 115 414Z" fill="#192117" />
        <path d="m115 402 185 108 185-108-185-108Z" fill="#232d20" />
        <path d="m142 303 158-91 158 91v12l-158 92-158-92Z" fill="#1c2419" />
        <path d="m142 303 158 91 158-91-158-91Z" fill="#293123" />
        <path d="m166 201 134-78 134 78v15l-134 78-134-78Z" fill="#20291d" />
        <path d="m166 201 134 78 134-78-134-78Z" fill="#303d25" />
        <path d="m190 201 110-64 110 64-110 64Zm34 0 76-44 76 44-76 44Z" />
        <path d="m175 306 125 72 125-72M206 321l94-54 94 54M145 404l155 90 155-90M175 404l125 73 125-73" />
      </g>
      <path d="m257 183 43-25 43 25v23l-43 25-43-25Z" fill="#b4d564" stroke="#d5f695" />
      <path d="m257 183 43 25 43-25-43-25Z" fill="#d6f5a2" />
      <path d="M300 208v23" stroke="#688139" />
      <path d="m237 340 21-12 21 12-21 12Zm84 0 21-12 21 12-21 12Z" fill="#b4d564" />
      <circle cx="300" cy="482" r="3" fill="#d5f695" />
    </svg>
  );
}

export default function SystemSculpture() {
  const canvas = useRef(null);
  const renderer = useRef(null);
  const [ready, setReady] = useState(false);
  const [exploded, setExploded] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => setReduced(preference.matches);
    onMotion();
    preference.addEventListener("change", onMotion);

    import("../lib/system-renderer.js").then(({ createSystemRenderer }) => {
      if (cancelled || !canvas.current) return;
      renderer.current = createSystemRenderer(canvas.current, { reduced: preference.matches });
      if (renderer.current) setReady(true);
      else {
        console.warn("The interactive system needs a 2D canvas context. Showing the static illustration.");
        setUnavailable(true);
      }
    }).catch((error) => {
      if (cancelled) return;
      console.error("Could not load the interactive system illustration.", error);
      setUnavailable(true);
    });
    return () => {
      cancelled = true;
      renderer.current?.destroy();
      renderer.current = null;
      preference.removeEventListener("change", onMotion);
    };
  }, []);

  useEffect(() => {
    renderer.current?.setOptions({ exploded, paused: paused || reduced, reduced });
  }, [exploded, paused, reduced, ready]);

  return (
    <figure className={`system${ready ? " is-ready" : ""}`} aria-labelledby="system-caption">
      <div className="system__heading eyebrow"><span className="crosshair" aria-hidden="true" /> System study No. 001 <span>3D / Interactive</span></div>
      <div className="system__stage" role="img" aria-label="An original three-dimensional system sculpture: an intelligence core above orchestration and infrastructure layers. Move your pointer to inspect its perspective.">
        <div className="system__orbit system__orbit--one" aria-hidden="true" />
        <div className="system__orbit system__orbit--two" aria-hidden="true" />
        <SystemFallback />
        <canvas ref={canvas} className="system__canvas" aria-hidden="true" />
        <span className="system__label system__label--top"><i />01 / Intelligence</span>
        <span className="system__label system__label--middle"><i />02 / Orchestration</span>
        <span className="system__label system__label--bottom"><i />03 / Infrastructure</span>
        <span className="system__coordinates eyebrow" aria-hidden="true">x 01 / y 03 / z 06</span>
      </div>
      <figcaption id="system-caption" className="system__caption">
        <span>The invisible, made visible.<small>{unavailable ? "Static study. Interactive preview unavailable." : "A small study in how I think and build."}</small></span>
        <div className="system__controls">
          <div className="segmented" role="group" aria-label="System view">
            <button type="button" aria-pressed={!exploded} disabled={!ready} onClick={() => setExploded(false)}>Assembled</button>
            <button type="button" aria-pressed={exploded} disabled={!ready} onClick={() => setExploded(true)}>Exploded</button>
          </div>
          <button className="system__pause iconbtn" type="button" disabled={!ready || reduced} aria-label={reduced ? "Motion disabled by system preference" : paused ? "Play system motion" : "Pause system motion"} onClick={() => setPaused(!paused)}>
            {paused || reduced ? <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 4 9 6-9 6Z" fill="currentColor" /></svg> : <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 5h2v10H6zm6 0h2v10h-2z" fill="currentColor" /></svg>}
          </button>
        </div>
      </figcaption>
    </figure>
  );
}
