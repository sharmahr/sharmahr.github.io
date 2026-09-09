/* Post-build. vite-react-ssg emits `dist/<route>/index.html`; GitHub Pages
   needs two extra things on top of that:

   1. `dist/404.html`, which Pages serves for any unmatched path.
   2. Stubs at every URL the previous two versions of this site published,
      so existing links and search results do not rot.

   Stubs are real HTML with a canonical link and a meta refresh rather than
   a JS redirect, so they work with scripting disabled and tell crawlers
   where the content actually moved to. */

import { mkdir, writeFile, copyFile, access } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

const DIST = resolve(process.cwd(), "dist");
const ORIGIN = "https://sharmahr.github.io";

/** old published URL → new route.
 *  `/index.html` is deliberately absent: Pages already serves the home page
 *  there, and a stub at that path would overwrite it. */
const REDIRECTS = {
  "/about.html": "/#main",
  "/featuredprojects.html": "/#work",
  "/awards.html": "/#recognition",
  "/contact.html": "/#contact",
  "/software.html": "/archive",
  "/hardware.html": "/archive",
  "/simulations.html": "/archive",
  "/events.html": "/archive",
  "/archive.html": "/archive",
  "/resume.html": "/resume",
  "/projects/software_projects/parkit/parkit.html": "/work/smart-parking",
  "/events/workshop/workshop.html": "/events/robotics-workshop",
  "/assets/certificates/sih2019.html": "/credentials/sih-2019",
  "/assets/certificates/iitbombay.html": "/credentials/iit-bombay",
  "/assets/certificates/iitguwahati.html": "/credentials/iit-guwahati",
  "/assets/certificates/vnit.html": "/credentials/vnit",
  "/projects/games_and_simulations/Flappy_Bird/flappybird.html": "/lab/flappy-bird",
  "/projects/games_and_simulations/MazeSolver/mazesolver.html": "/lab/maze-solver",
  "/projects/games_and_simulations/SmartRockets/smartrockets.html": "/lab/smart-rockets",
  "/projects/games_and_simulations/SnakeGame/snakegame.html": "/lab/snake"
};

const stub = (target) => {
  /* Static hosts may resolve /resume to the old resume.html before the
     directory. A trailing slash avoids redirecting that stub into itself. */
  const destination = target.startsWith("/#") || target.endsWith("/") ? target : `${target}/`;
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<link rel="canonical" href="${ORIGIN}${destination}">
<meta http-equiv="refresh" content="0; url=${destination}">
<title>Moved — Hardik Sharma</title>
</head>
<body>
<p>This page has moved to <a href="${destination}">${ORIGIN}${destination}</a>.</p>
<script>location.replace(${JSON.stringify(destination)});</script>
</body>
</html>
`;
};

const exists = (p) =>
  access(p).then(
    () => true,
    () => false
  );

async function main() {
  if (!(await exists(DIST))) throw new Error("dist/ not found — run the build first");

  let written = 0;
  for (const [from, to] of Object.entries(REDIRECTS)) {
    const file = join(DIST, from.replace(/^\//, ""));
    /* A stub must never clobber a page the build actually rendered. */
    if (await exists(file)) {
      throw new Error(`redirect stub ${from} would overwrite a built file`);
    }
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, stub(to), "utf8");
    written += 1;
  }

  const notFound = join(DIST, "404", "index.html");
  if (!(await exists(notFound))) throw new Error("prerendered /404 missing — check routes.jsx");
  await copyFile(notFound, join(DIST, "404.html"));

  /* Tells GitHub Pages to serve the files as-is rather than running Jekyll,
     which would otherwise drop any path beginning with an underscore. */
  await writeFile(join(DIST, ".nojekyll"), "", "utf8");

  console.log(`postbuild: ${written} redirect stubs, 404.html, .nojekyll`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
