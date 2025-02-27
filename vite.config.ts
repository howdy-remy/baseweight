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
      hooks: "/src/hooks",
      contexts: "/src/contexts",
      styles: "/src/styles",
      lib: "/src/lib",
      types: "/src/types",
      utils: "/src/utils",
      features: "/src/features",
    },
  },
});
