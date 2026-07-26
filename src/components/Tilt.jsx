import { useEffect, useRef } from "react";

/* Deliberately shallow, and no glare: this should read as the page having
   depth, not as a novelty card effect. */
const OPTIONS = {
  max: 6,
  speed: 700,
  perspective: 1400,
  scale: 1.012,
  glare: false,
  gyroscope: false,
  "reset-to-start": true
};

export default function Tilt({ as: Tag = "div", className, children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(pointer: coarse)").matches) return undefined;

    let cancelled = false;
    import("vanilla-tilt").then(({ default: VanillaTilt }) => {
      if (!cancelled) VanillaTilt.init(el, OPTIONS);
    });

    return () => {
      cancelled = true;
      el.vanillaTilt?.destroy();
    };
  }, []);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
