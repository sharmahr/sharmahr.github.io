import { motion } from "framer-motion";
import { ENTER, VIEWPORT } from "../lib/motion.js";

/**
 * The site's standard entrance. Framer Motion owns opacity and transform;
 * `index.html` carries a `noscript` block and a hydration watchdog so a
 * reader without working JavaScript never meets an invisible page.
 */
export default function Reveal({
  as = "div",
  delay = 0,
  y = 18,
  className,
  children,
  ...rest
}) {
  const Tag = motion[as];

  return (
    <Tag
      data-reveal
      className={className}
      initial={{ opacity: 0, y, filter: "blur(3px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={VIEWPORT}
      transition={{ ...ENTER, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
