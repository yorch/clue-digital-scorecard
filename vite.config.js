import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
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
  build: {
    rollupOptions: {
      input: 'index.html',
    },
    outDir: 'dist',
  },
  server: {
    port: 3000,
    open: true,
  },
  root: '.',
});
