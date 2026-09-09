/* The two arrows the site uses. Hand-drawn paths rather than an icon
   package: two glyphs do not justify a dependency. */

export function ArrowOut() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2.5 9.5 9.5 2.5M4 2.5h5.5V8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowBack() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M7.5 2.5 4 6l3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Plus() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h12M10 4v12" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function MicrosoftMark() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M1 1h8v8H1zm10 0h8v8h-8zM1 11h8v8H1zm10 0h8v8h-8z" />
    </svg>
  );
}
