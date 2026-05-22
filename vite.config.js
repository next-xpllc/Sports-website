import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Sports-website/',
  build: {
    target: 'esnext',
    minify: 'terser',
  },
});
