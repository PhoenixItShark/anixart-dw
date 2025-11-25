import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import sassAlias from 'sass-alias';

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@server": path.resolve(__dirname, "../server/src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        importer: sassAlias.create({
          '@': path.resolve(__dirname, './src'),
          '@app': path.resolve(__dirname, './src/app'),
          '@pages': path.resolve(__dirname, './src/pages'),
          '@widgets': path.resolve(__dirname, './src/widgets'),
          '@features': path.resolve(__dirname, './src/features'),
          '@entities': path.resolve(__dirname, './src/entities'),
          '@shared': path.resolve(__dirname, './src/shared'),
        })
      }
    }
  },
  plugins: [react()],
});