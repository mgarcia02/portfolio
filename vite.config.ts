import { defineConfig } from 'vite'

export default defineConfig({
  base: '/portfolio/',
  build: {
    sourcemap: true,
    // three.js is a single large dependency; keep it in its own long-lived chunk.
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks: { three: ['three'] },
      },
    },
  },
})
