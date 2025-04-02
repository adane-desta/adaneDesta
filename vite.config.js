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
    outDir: 'dist' // Ensures the build files are output to the 'dist' folder
  }
})


// npm install -g serve
// serve -s dist