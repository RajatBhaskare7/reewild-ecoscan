// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // ⬅️ THIS IS REQUIRED
    globals: true, // optional: lets you use `it`, `expect`, etc. globally
    setupFiles: "./setupTest.js", // optional
  },
});
