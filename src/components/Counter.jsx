import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

/**
 * Counts up once, when the number arrives on screen. The prerendered
 * markup already carries the final value, so a reader without JS — or one
 * who scrolls past before hydration — still reads the real figure.
 */
export default function Counter({ to, locale = "en-US" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(to);

  /* Zeroed only after hydration, so the prerendered HTML keeps the figure. */
  useEffect(() => setValue(0), []);

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(0, to, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v))
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{value.toLocaleString(locale)}</span>;
}
