import { useEffect, useRef, useState } from "react";

export default function CopyField({ value }) {
  const [status, setStatus] = useState("idle");
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    clearTimeout(timer.current);
    if (!navigator.clipboard || !window.isSecureContext) {
      setStatus("error");
      return;
    }
    try {
      await navigator.clipboard.writeText(value);
      setStatus("done");
      timer.current = setTimeout(() => setStatus("idle"), 2400);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="copyfield">
      <a href={`mailto:${value}`}>{value}</a>
      <button className={`copybtn${status === "done" ? " is-done" : ""}`} type="button" onClick={copy} aria-label={status === "done" ? "Email address copied" : "Copy email address"}>
        {status === "done" ? <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="1.5" /></svg> : <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="7" y="7" width="9" height="10" rx="1" stroke="currentColor" /><path d="M12 7V3H3v10h4" stroke="currentColor" /></svg>}
      </button>
      <span className={`copyfield__status${status === "error" ? " is-error" : ""}`} role="status">{status === "error" ? "Copy unavailable. Select the email address, or tap it to send a message." : status === "done" ? "Copied to clipboard." : ""}</span>
    </div>
  );
}
