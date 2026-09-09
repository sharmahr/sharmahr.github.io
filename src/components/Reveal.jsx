import { useEffect, useRef } from "react";

/* Content is visible in server HTML. Only off-screen elements are enrolled
   in the entrance, so a failed script never leaves an invisible page. */
export default function Reveal({ as: Tag = "div", delay = 0, y = 20, className = "", children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || reduced.matches || !("IntersectionObserver" in window)) return undefined;
    if (element.getBoundingClientRect().top < window.innerHeight) return undefined;

    element.dataset.enter = "waiting";
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.dataset.enter = "visible";
        observer.disconnect();
      }
    }, { threshold: 0.08 });
    observer.observe(element);

    const release = () => {
      if (reduced.matches) {
        element.dataset.enter = "visible";
        observer.disconnect();
      }
    };
    reduced.addEventListener("change", release);
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", release);
      delete element.dataset.enter;
    };
  }, []);

  return (
    <Tag ref={ref} data-reveal className={`reveal ${className}`} style={{ "--reveal-delay": `${delay}s`, "--reveal-y": `${y}px` }} {...rest}>
      {children}
    </Tag>
  );
}
