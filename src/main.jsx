import { ViteReactSSG } from "vite-react-ssg";
import { createBrowserRouter } from "react-router-dom";
import routes from "./routes.jsx";
import "./styles/site.css";

// Static document URLs must match their directory routes before hydration.
if (typeof window !== "undefined" && window.location.pathname.endsWith("/index.html")) {
  const url = new URL(window.location.href);
  url.pathname = url.pathname.replace(/index\.html$/, "");
  window.history.replaceState(window.history.state, "", url);
}

function copyRoutes(records) {
  return records.map((route) => ({
    ...route,
    ...(route.children ? { children: copyRoutes(route.children) } : {})
  }));
}

// SSG mutates the route tree to inject build-specific data loaders. These
// pages need no loaders, so keep client navigation independent of old manifests.
const clientRoutes = copyRoutes(routes);

export const createRoot = ViteReactSSG({
  routes,
  customCreateRouter: (_generatedRoutes, options) =>
    createBrowserRouter(clientRoutes, options)
});
