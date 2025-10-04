import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html',
    },
  },
  plugins: [
    tailwindcss(),
    react({
      jsxRuntime: 'automatic',
    }),
    viteSingleFile({
      removeViteModuleLoader: false,
      useRecommendedBuildConfig: true,
    }),
  ],
  publicDir: 'public', // Copy public assets to dist
  root: '.',
  server: {
    open: true,
    port: 3000,
  },
});
