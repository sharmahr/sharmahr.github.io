import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets/build",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/p5")) return "p5";
          if (id.includes("node_modules/zdog")) return "zdog";
          if (id.includes("node_modules/framer-motion")) return "motion";
        }
      }
    }
  },
  ssgOptions: {
    script: "async",
    formatting: "minify",
    dirStyle: "nested",
    crittersOptions: false
  }
});
