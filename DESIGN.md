# Design

## Direction: the invisible, made visible

A software engineer's working world, expressed as a considered editorial
portfolio. The central object is an original exploded system: intelligence,
orchestration, and infrastructure. It is a model of how the engineer thinks,
not a claim about a proprietary architecture or a live telemetry dashboard.

This replaces the bitmap specimen direction. Typography, honest project
evidence, and the three-dimensional system carry the identity. No preloader,
scroll hijacking, cursor replacement, autoplay video, or decorative WebGL.

## Palette and type

| Role | Graphite (default) | Daylight |
| --- | --- | --- |
| Background | `#121510` | `#f1f2eb` |
| Raised surface | `#1b2017` | `#e5e9dc` |
| Text | `#eff1e9` | `#1b2415` |
| Secondary text | `#bdc3b5` | `#4d5745` |
| Muted text | `#abb59e` | `#59664c` |
| Rule | `#353d2e` | `#c5cdb8` |
| Accent | `#d2ef8a` | `#476424` |

Geist carries display, body, and interface text. Geist Mono is reserved for
indices, dates, and diagram annotations. Both variable fonts are self-hosted
as Latin WOFF2 subsets; their SIL Open Font Licenses accompany the files.
Employer attributions use a 12px minimum and at least 4.5:1 contrast. The
working toolkit and dates remain readable at mobile sizes.

The default theme is an art-direction choice. The visitor can switch themes;
the document head applies the saved choice before rendering.

## Composition

- A quiet, persistent masthead with conventional links and a contact action.
- A large, left-aligned editorial headline paired with a purposeful original
  system sculpture. Text and actions never depend on the canvas.
- An attributed outcome strip, followed by four staggered project studies.
- Native disclosure rows for career depth without a wall of text.
- The real portrait and a working toolkit, then a distinct, lighter playground.
- Factual recognition with direct certificate links.
- A large contact invitation, visible email address, copy feedback, and a
  restrained signature footer.

Project illustrations use their own bounded material palette. AlgoRush shows
the actual live product. Park It uses the original annotated training image.
The storage and database illustrations are explicitly conceptual studies,
not fabricated application screenshots. The storage study depicts the real
SwiftUI/ScannerClient, isolated ScannerWorker, and local SQLite relationship.
The hero's frame defines the study's bounds. On tall desktop viewports, the
experience introduction and portrait stay in view beside the longer content.

## Motion and interaction

Standard controls use 160-250ms transitions with
`cubic-bezier(0.22, 1, 0.36, 1)`. Hover motion is restricted to fine pointers.
Press feedback is small and immediate. Scroll entrances move approximately
20px, once, without delaying access to content.

`Reveal` leaves server-rendered content visible. Only off-screen elements are
enrolled after hydration; reduced-motion and hydration-failure paths release
all text immediately.

The original renderer in `src/lib/system-renderer.js` projects authored
three-dimensional geometry onto Canvas 2D. It caps rendering at 30fps and
device pixel ratio at 1.75. It cancels animation frames off screen, in hidden
tabs, and when paused. Reduced motion disables drift and pointer tracking;
assembly controls still work. A static SVG is the first-render and
no-JavaScript alternative.

## Accessibility and performance

Native links and buttons, visible keyboard focus, an explicit skip link, and
semantic heading order. Anchor navigation moves focus to the destination.
The mobile menu closes on navigation, Escape, or outside interaction; Escape
returns focus to the trigger. Important controls have at least 44px targets.

Email remains visible and clickable even if clipboard access fails. Copy
success and refusal are both announced.

All existing routes remain prerendered for GitHub Pages. Legacy redirects,
certificates, the printable resume, and playable labs are retained.
Hydration is deferred until the complete document has been parsed: the SSG
router data and build hash are emitted after the page markup. Legacy
redirects target directory URLs with trailing slashes to avoid alias loops.
The large p5 dependency is loaded only on experiment routes. The home-page
sculpture is a small dynamic import with no textures, model downloads, or
third-party requests. Project imagery and the portrait load lazily.

## Content invariant

Career facts and project summaries live in `src/data/site.js`. Outcomes
remain attributed to their employer or independent project. Do not add
testimonials, clients, awards, performance claims, or adoption figures
without evidence. Keep the voice plain and specific.
