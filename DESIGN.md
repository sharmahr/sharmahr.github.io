# Design

<!-- impeccable:design-schema 1 -->

## Visual World

**Emigre bitmap type specimen.** The page is a specimen sheet for one
engineer. Coarse pixel letterforms set proudly at poster scale, dense grotesk
text beneath them, halftone and dot-matrix treated as legitimate surfaces
rather than as texture-decoration. Low resolution is the aesthetic, not an
apology: the display face never antialiases, and it scales only in whole-pixel
multiples.

This world replaces the previous one (warm near-black paper, Instrument Serif
display, burnt-orange accent, and a short-lived azure/violet glass variant).
That look is anti-reference now, not authority. Nothing gradient-filled,
glass-blurred or glow-shadowed survives.

### Why it carries the product

A specimen exists to prove one thing at many scales — which is exactly the
claim being made here: the same engineer at intern scale and at 4,000-datacenter
scale. The specimen's native habit of repeating one form at 72 / 48 / 24 / 16 /
8 px becomes the site's signature move, applied to real career figures.

## Light and Dark

Picked from the use scene, not the category: a recruiter on a laptop or phone,
mid-morning, in an office or by a window, between other candidate reviews.
Daylight reading wants ink on paper.

- **Default: newsprint.** `#F5F3EC` stock, rich black ink.
- **Toggle: ink.** Rich black stock, newsprint ink — the same specimen printed
  as a negative. Both are first-class; neither is a fallback.

## Color

Strategy: **Restrained** — newsprint and rich black carry the surface, one
synthetic accent does all the signalling.

| Role | Newsprint | Ink |
|---|---|---|
| Stock | `#f5f3ec` | `#0a0a0a` |
| Stock, second | `#eae7dc` | `#141413` |
| Ink | `#0a0a0a` | `#f5f3ec` |
| Ink, secondary | `#33322d` | `#c9c6ba` |
| Ink, muted | `#6b6a61` | `#8b8980` |
| Rule | `#0a0a0a` at 100% — rules are printed, not hinted |
| Accent | `#e8452a` | `#ff5a3c` |

The accent is a spot ink. It marks exactly three things: the live availability
state, the primary action, and the active navigation item. It is never a
background wash and never a gradient.

## Typography

- **Display — `Silkscreen`.** Bitmap, uppercase, poster scale only. Never below
  1.5rem, never for running text, `-webkit-font-smoothing: none` so pixels stay
  pixels. Tracking is positive, because bitmap faces set tight turn to mud.
- **Text — `Geist`.** Dense neo-grotesk for every paragraph, label and control.
  Body measure 62–70ch.
- **Data — `Geist Mono`.** Tabular figures only: dates, durations, coordinates,
  counts, the clock. Used for measurement, never as a costume for "technical".

The bitmap floor is enforced in code by `--t-bitmap-min: 1.5rem`; every
`Silkscreen` rule clamps against it. Anything that would fall below the floor
(plate indices, years, entry numbers, company names, outcome figures) takes
`Geist Mono` or weighted `Geist` instead — an 8px pixel grid loses its counters
under roughly 24px, so a smaller bitmap setting is unreadable, not smaller.

Instrument Serif is removed from the project.

## Material and Composition

- **Square.** `border-radius: 0` everywhere. The one exception is the theme
  toggle, which is a printer's registration mark and is therefore a circle.
- **Printed rules.** 1px and 2px solid ink. No low-opacity hairlines, no
  `rgba` fog.
- **Hard offset shadow.** `4px 4px 0 var(--ink)` on raised/active elements.
  Never a blurred shadow, never a colored halo.
- **Halftone and dot-matrix** as surfaces: a 60lpi dot field replaces the old
  film-grain overlay, and a 10×10 dot matrix fills plate margins and the
  portrait's backing.
- **Numbered plates.** Sections are `01 / 02 / 03` specimen plates. The
  specimen form earns section numbers that a generic page would not.
- **Size ladder.** The signature component: one figure repeated at descending
  sizes with its px label, exactly as a type specimen ranks one glyph.

## Motion

One authored moment, not an effect on every section: the hero's size ladder
resolves from its smallest step to its largest on load, in whole-pixel jumps
rather than a smooth tween, because the world does not antialias. Everything
else is a state change — hard offset appears, accent fills, rule thickens.
All of it is skipped under `prefers-reduced-motion`.

## Responsive

- Breakpoints: 1180, 900, 720, 560, 400.
- Display type is capped so `HARDIK` never overflows 320px; the ladder drops
  steps rather than shrinking below legibility. Verified at 320/390/768/1440
  with zero horizontal overflow.
- Plates stack to one column at 860; the metadata rail collapses above content.
- The `Fig. 1` lattice is decorative and fixed-size, so it is dropped below 900
  where it has no plate margin to sit in; the photograph takes the width.
- **Navigation is never removed.** Below 900 the horizontal plate set becomes an
  `Index` disclosure listing the numbered plates at ≥52px rows. It closes on
  navigation, on `Escape`, and on pointer-down outside.
- Every standalone touch target ≥44px, including the masthead mark and the theme
  toggle, whose 2rem registration mark is centred inside a 44px hit area. Links
  inline in a sentence keep their natural line box per WCAG 2.5.8, and coarse
  pointers get extra row separation instead.

## Bans carried from the craft floor

Gradient text, decorative glass and blur, colored border-left rules above 1px,
soft-shadowed rounded rectangles, monospace as costume, and eyebrow pills on
every section.
