/* Hardik Sharma — site behaviour. Vanilla, no dependencies. */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Theme ---------- */
  var THEME_COLOR = { dark: "#0b0a09", light: "#f6f4f0" };

  function setTheme(t) {
    root.setAttribute("data-theme", t);
    try { localStorage.setItem("hs-theme", t); } catch (e) {}
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", THEME_COLOR[t] || THEME_COLOR.dark);
  }

  var toggle = document.querySelector("[data-theme-toggle]");
  if (toggle) {
    toggle.addEventListener("click", function () {
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }

  /* The site is designed dark; that is a decision, not a default we
     hand to the OS. Light is available, but only if the visitor asks. */

  /* ---------- Scroll reveal ----------
     This owns visibility, always, using a plain IntersectionObserver and a
     CSS transition. assets/js/motion.js layers spring physics on top when
     it loads, but it only ever touches transform. Nothing about the
     animation layer can leave a visitor staring at invisible content. */
  var revealables = document.querySelectorAll("[data-reveal]");
  function reveal(el) { el.classList.add("is-in"); }

  if (reduced || !("IntersectionObserver" in window)) {
    revealables.forEach(reveal);
  } else {
    observeReveal();
  }

  function observeReveal() {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var group = el.parentElement ? el.parentElement.querySelectorAll(":scope > [data-reveal]") : [];
        var i = Array.prototype.indexOf.call(group, el);
        /* Motion supplies its own stagger; only add CSS delay without it. */
        if (!window.__hsMotion) el.style.setProperty("--d", Math.min(i < 0 ? 0 : i, 6) * 65 + "ms");
        reveal(el);
        io.unobserve(el);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealables.forEach(function (el) { io.observe(el); });

    /* Anything already on screen, or sitting in the bottom band the
       observer's negative margin can never reach, is shown outright. */
    var sweep = function () {
      var vh = window.innerHeight;
      var atEnd = window.scrollY + vh >= document.documentElement.scrollHeight - 4;
      revealables.forEach(function (el) {
        if (el.classList.contains("is-in")) return;
        var top = el.getBoundingClientRect().top;
        if (atEnd || (top < vh && top > -el.offsetHeight)) { reveal(el); io.unobserve(el); }
      });
    };
    sweep();
    window.addEventListener("scroll", sweep, { passive: true });
  }

  /* ---------- Nav: stuck state + scroll progress ---------- */
  var nav = document.querySelector(".nav");
  var prog = document.querySelector(".prog");
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle("is-stuck", y > 8);
    /* Motion drives the progress bar when it is present. */
    if (prog && !window.__hsMotion) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.transform = "scaleX(" + (max > 0 ? Math.min(y / max, 1) : 0) + ")";
    }
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------- Scrollspy ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__link[href^='#']"));
  var sections = navLinks
    .map(function (l) { return document.querySelector(l.getAttribute("href")); })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (l) {
          l.classList.toggle("is-active", l.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Copy to clipboard ---------- */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      var done = function () {
        var prev = btn.textContent;
        btn.textContent = "Copied";
        btn.classList.add("is-done");
        setTimeout(function () {
          btn.textContent = prev;
          btn.classList.remove("is-done");
        }, 1800);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done);
      } else {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  });

  /* ---------- Local time in IST (small human detail) ---------- */
  var clocks = document.querySelectorAll("[data-clock]");
  if (clocks.length) {
    var fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
    var tick = function () {
      var now = fmt.format(new Date());
      clocks.forEach(function (c) { c.textContent = now; });
    };
    tick();
    setInterval(tick, 15000);
  }
})();
