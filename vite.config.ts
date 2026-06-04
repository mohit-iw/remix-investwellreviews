// Editor / Lovable Publish build (Cloudflare Workers preset).
// The Lovable sandbox is wired for this stack — do not swap it.
// EC2 builds use `vite.config.ec2.ts` (Nitro node-server preset).
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Route TanStack Start's bundled server entry through our SSR error wrapper.
    server: { entry: "server" },
  },
});
