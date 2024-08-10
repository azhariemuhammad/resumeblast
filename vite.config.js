import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3003,
  },
  preview: {
    host: true,
    port: 8080
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './setupTests.js',
  },
})
