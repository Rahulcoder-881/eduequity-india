import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const rawPort = process.env.PORT;
// PORT is only required when running the dev/preview server, not during build
const port = rawPort ? Number(rawPort) : 3000;

const basePath = process.env.BASE_PATH ?? "/";

const PAGES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/overview", priority: "0.9", changefreq: "monthly" },
  { path: "/barriers", priority: "0.9", changefreq: "monthly" },
  { path: "/interventions", priority: "0.9", changefreq: "monthly" },
  { path: "/case-studies", priority: "0.8", changefreq: "monthly" },
  { path: "/funding", priority: "0.8", changefreq: "monthly" },
  { path: "/policy", priority: "0.8", changefreq: "monthly" },
  { path: "/india-map", priority: "0.7", changefreq: "monthly" },
  { path: "/colleges", priority: "0.8", changefreq: "monthly" },
  { path: "/exams", priority: "0.8", changefreq: "monthly" },
  { path: "/get-involved", priority: "0.7", changefreq: "monthly" },
];

function getSiteUrl(): string {
  const domains = process.env.REPLIT_DOMAINS;
  if (domains) {
    const first = domains.split(",")[0].trim();
    return `https://${first}`;
  }
  return "https://localhost";
}

function buildSitemap(siteUrl: string): string {
  const today = new Date().toISOString().split("T")[0];
  const urls = PAGES.map(
    (p) =>
      `  <url>\n    <loc>${siteUrl}${p.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`,
  ).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function robotsPlugin(): Plugin {
  return {
    name: "robots",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === "/robots.txt") {
          const siteUrl = getSiteUrl();
          const content = `User-agent: *\nDisallow:\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
          res.setHeader("Content-Type", "text/plain");
          res.end(content);
          return;
        }
        next();
      });
    },
    closeBundle() {
      const outDir = path.resolve(import.meta.dirname, "dist/public");
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
      const siteUrl = getSiteUrl();
      const content = `User-agent: *\nDisallow:\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
      fs.writeFileSync(path.join(outDir, "robots.txt"), content, "utf-8");
    },
  };
}

function sitemapPlugin(): Plugin {
  return {
    name: "sitemap",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === "/sitemap.xml") {
          const xml = buildSitemap(getSiteUrl());
          res.setHeader("Content-Type", "application/xml");
          res.end(xml);
          return;
        }
        next();
      });
    },
    closeBundle() {
      const outDir = path.resolve(import.meta.dirname, "dist/public");
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
      const xml = buildSitemap(getSiteUrl());
      fs.writeFileSync(path.join(outDir, "sitemap.xml"), xml, "utf-8");
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    robotsPlugin(),
    sitemapPlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react-dom") || id.includes("node_modules/react/")) {
            return "vendor-react";
          }
          if (id.includes("node_modules/framer-motion")) {
            return "vendor-motion";
          }
          if (id.includes("node_modules/recharts")) {
            return "vendor-charts";
          }
          if (id.includes("node_modules/@tanstack")) {
            return "vendor-query";
          }
          if (id.includes("node_modules/wouter")) {
            return "vendor-router";
          }
        },
      },
    },
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
