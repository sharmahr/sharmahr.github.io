# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters and hiring managers evaluating Hardik Sharma for AI and
platform engineering roles. They arrive from LinkedIn, GitHub, or a referral,
usually on a laptop between other candidate reviews, and often first on a phone.
They are scanning to answer one question fast — is this person worth a
conversation — before deciding whether to read anything in depth.

Secondary: senior engineers on the interview loop who follow up on the technical
claims after the recruiter passes the profile along.

## Product Purpose

A personal site that converts a cold profile view into an inbound conversation
about a role. Success is an email or LinkedIn message; everything else on the
site exists to make that message feel justified.

## Positioning

Six years of shipped infrastructure at three companies where the systems were
load-bearing, now applied to AI products. The differentiator is not "full-stack
generalist" but a verifiable record of large-scale remediation, cost and fleet
platforms, with measurable before/after numbers attached to each.

## Operating Context

- Evaluated in minutes, frequently on mobile, often with the résumé PDF open
  alongside.
- Claims get cross-checked against GitHub and LinkedIn in adjacent tabs.
- The site is also handed out directly by the owner during a job search, so it
  must read well cold and when introduced.

## Capabilities and Constraints

- React 19 + Vite 8, prerendered with `vite-react-ssg`; hand-authored CSS in
  `src/styles/site.css`, no utility framework.
- Deployed as a static build to GitHub Pages via GitHub Actions. No server, no
  database, no analytics backend.
- Routes: home, `/resume`, `/archive`, `/work/smart-parking`, `/lab/*`
  (interactive p5 sketches), `/credentials/*`, `/workshop`.
- Motion via `framer-motion`; `p5`, `zdog`, `vanilla-tilt` are lazily loaded and
  decorative or interactive extras, never required for content.
- Must stay fast and legible on a mid-range phone; interactive sketches are
  progressive enhancement only.

## Brand Commitments

- Name and wordmark: "Hardik Sharma" / "HS".
- Voice: plain, specific, measured. States numbers and lets them carry the
  claim; no superlatives about himself.
- Existing portrait and certificate scans are real and must be preserved.

## Evidence on Hand

Real, verifiable, and already in the repository (`src/data/site.js`):

- VMware — vulnerability remediation platform across **4,000+ datacenters**;
  distributed fleet execution platform, **>50%** operational efficiency gain;
  semantic search over operational data; automated SLA computation.
- Harness — reserved-instance exchange execution cut from **eight hours to under
  twenty minutes**; seed-based RI optimisation workflow; commitment inventory
  platform.
- Microsoft (Frontier Foundry) — contextual personalisation for Bing and
  OneDrive wallpapers; real-time voice assistant with intent inference.
- Awards with certificate scans in `public/assets/certificates/`: Smart India
  Hackathon 2019 finalist (top 4 of 314), Escalade IIT Guwahati winner (1 of 60),
  RoboCup VNIT Best Innovation, Meshmerize IIT Bombay third place. VMware
  Exceptional Mentorship, Spot (Log4Shell response) and At Our Best awards.
- Side work: MacStorage Studio (Swift), zed-db (relational database written from
  scratch in Python), High/Low-Level System Design note repos, p5.js
  neuroevolution and genetic-algorithm sketches, robotics archive.
- AlgoRush — **1,500+** registered engineers.

Absent and not to be fabricated: testimonials, named clients, salary or level
bands, press coverage, open-source download counts.

## Product Principles

1. Answer "is this person worth a conversation" inside the first viewport.
2. Every claim carries its number and its employer; nothing is asserted without
   a place it happened.
3. Depth is available but never blocking — the scanner and the interviewer both
   get served on the same page.
4. Content survives without JavaScript, motion, or WebGL; the extras are a
   demonstration of craft, not a dependency.
5. Nothing on the site may be more impressive than the work it describes.

## Accessibility & Inclusion

Keyboard-operable throughout, visible focus, `prefers-reduced-motion` honoured
across all animation, and text contrast that holds on a phone in daylight.
