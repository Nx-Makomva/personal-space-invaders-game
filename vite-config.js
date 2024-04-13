import { defineConfig } from "vitest/config";
import { fileURLToPath } from "url";
export default defineConfig({
  test: {
    globals: true,
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL("index.html", import.meta.url)),
        game: fileURLToPath(new URL("main.ts", import.meta.url)),
      },
    },
  },
  base: "./",
});