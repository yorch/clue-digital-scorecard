import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic',
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
