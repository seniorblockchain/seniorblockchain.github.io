import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  integrations: [react(), tailwind()],
  vite: {
    plugins: [
      nodePolyfills({
        globals: {
          Buffer: true,
        },
        protocolImports: true,
      }),
    ],
    resolve: {
      alias: {
        buffer: 'buffer',
      },
    },
    optimizeDeps: {
      include: ['buffer'],
    },
  },
});
