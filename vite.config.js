import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  // Relative asset paths, so the build works at the domain root or under /portfolio/ on GitHub Pages.
  base: './',
  build: {
    rollupOptions: {
      // Two real HTML pages: the site and the printable resume.
      input: { main: resolve(import.meta.dirname, 'index.html'), resume: resolve(import.meta.dirname, 'resume.html') },
    },
  },
})
