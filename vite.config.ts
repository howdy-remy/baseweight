import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/lib/vitest.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
      api: "/src/api",
    },
  },
});
