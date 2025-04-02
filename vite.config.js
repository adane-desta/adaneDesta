import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    cors: true,
    host: '0.0.0.0',
  },
  build: {
    outDir: 'dist',
  },
  resolve: {
    fallback: {
      default: 'index.html' // Ensures routing fallback
    }
  }

})

