/**
 * Flattens TanStack Start output (dist/client + dist/server) into a single
 * static dist/ folder with index.html at the root for Netlify/CDN deploy.
 */
import { existsSync, readdirSync, renameSync, rmSync } from "node:fs";
import { join } from "node:path";

const dist = "dist";
const client = join(dist, "client");

if (!existsSync(client)) {
  console.error("[prepare-netlify-dist] dist/client not found — run vite build first.");
  process.exit(1);
}

for (const name of readdirSync(client)) {
  const from = join(client, name);
  const to = join(dist, name);
  if (existsSync(to)) rmSync(to, { recursive: true, force: true });
  renameSync(from, to);
}

rmSync(client, { recursive: true, force: true });
rmSync(join(dist, "server"), { recursive: true, force: true });

if (!existsSync(join(dist, "index.html"))) {
  console.error("[prepare-netlify-dist] dist/index.html missing after flatten.");
  process.exit(1);
}

console.log("[prepare-netlify-dist] Ready — dist/index.html + dist/assets/");
