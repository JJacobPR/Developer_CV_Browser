/// <reference types="vitest" /> /// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@components",
        replacement: path.resolve(__dirname, "./src/components"),
      },
      {
        find: "@utils",
        replacement: path.resolve(__dirname, "./src/utils"),
      },
      {
        find: "@configs",
        replacement: path.resolve(__dirname, "./src/configs"),
      },
      {
        find: "@img",
        replacement: path.resolve(__dirname, "./src/assets/img"),
      },
      {
        find: "@partials",
        replacement: path.resolve(__dirname, "./src/assets/partials/_partials.scss"),
      },
      {
        find: "@hooks",
        replacement: path.resolve(__dirname, "./src/hooks"),
      },
      {
        find: "@store",
        replacement: path.resolve(__dirname, "./src/store"),
      },
      {
        find: "@views",
        replacement: path.resolve(__dirname, "./src/views"),
      },
    ],
  },
});
