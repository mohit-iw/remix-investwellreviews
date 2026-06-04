// EC2 / Node SSR build (Nitro node-server preset).
// Invoked only by `npm run build:ec2`. The Lovable sandbox uses
// `vite.config.ts` (Cloudflare Workers preset) and never loads this file.
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      // Route TanStack Start's bundled server entry through our SSR error wrapper.
      server: { entry: "src/server.ts" },
    }),
    nitro(),
    viteReact(),
  ],
  server: {
    host: "::",
    port: 8080,
  },
});