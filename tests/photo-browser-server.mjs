// Local-only browser test bundle, never imported by the application.
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { mkdir, readFile } from "node:fs/promises";
const require = createRequire(import.meta.url);
const tsxRequire = createRequire(require.resolve("tsx/package.json"));
const { build } = tsxRequire("esbuild");
await mkdir("artifacts", { recursive: true });
await build({
  entryPoints: ["src/lib/services/photos.ts"],
  bundle: true,
  platform: "browser",
  format: "iife",
  globalName: "PhotoTest",
  outfile: "artifacts/photo-test.js",
  define: {
    "process.env.NEXT_PUBLIC_SUPABASE_URL": '"http://127.0.0.1:3999"',
    "process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY": '"test"',
  },
});
const pixel = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=",
  "base64",
);
createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3101");
  try {
    if (req.url === "/pixel.png") {
      res.setHeader("Content-Type", "image/png");
      res.end(pixel);
      return;
    }
    const paths = {
      "/photo-test.js": "artifacts/photo-test.js",
      "/sample.heic": "artifacts/sample.heic",
    };
    if (!paths[req.url]) {
      res.writeHead(404);
      res.end();
      return;
    }
    res.setHeader(
      "Content-Type",
      req.url.endsWith(".js") ? "text/javascript" : "image/heic",
    );
    res.end(await readFile(paths[req.url]));
  } catch {
    res.writeHead(500);
    res.end();
  }
}).listen(3102, "127.0.0.1", () =>
  console.log("Photo test assets: http://localhost:3102"),
);
