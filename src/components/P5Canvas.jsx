import { useEffect, useRef, useState } from "react";

/**
 * Mounts a p5 sketch in instance mode and tears it down on unmount.
 * p5 is imported lazily so it never lands in the main bundle and never
 * runs during prerender, where `window` does not exist.
 */
export default function P5Canvas({ sketch, className = "canvas-holder", label }) {
  const holder = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let instance;
    let cancelled = false;

    import("p5")
      .then(({ default: p5 }) => {
        if (cancelled || !holder.current) return;
        instance = new p5(sketch, holder.current);
      })
      .catch(() => setFailed(true));

    return () => {
      cancelled = true;
      if (instance) instance.remove();
    };
  }, [sketch]);

  return (
    <div className={className} ref={holder} role="img" aria-label={label}>
      {failed && <p className="canvas-holder__fallback">This sketch failed to load.</p>}
    </div>
  );
}
