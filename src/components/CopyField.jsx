import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SNAP } from "../lib/motion.js";

export default function CopyField({ value }) {
  const [done, setDone] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        const ta = document.createElement("textarea");
        ta.value = value;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setDone(true);
      timer.current = setTimeout(() => setDone(false), 1800);
    } catch {
      /* Clipboard refused; the address is right there to select by hand. */
    }
  }, [value]);

  return (
    <div className="copyfield">
      <span>{value}</span>
      <motion.button
        className={`copybtn${done ? " is-done" : ""}`}
        type="button"
        onClick={copy}
        whileTap={{ scale: 0.96 }}
        transition={SNAP}
      >
        {done ? "Copied" : "Copy"}
      </motion.button>
    </div>
  );
}
