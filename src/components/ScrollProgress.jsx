import { motion, useScroll } from "framer-motion";

/** Reading progress, driven straight off scroll position. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="prog"
      aria-hidden="true"
      style={{ scaleX: scrollYProgress, transformOrigin: "0 50%" }}
    />
  );
}
