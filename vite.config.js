import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Required for path resolution

export default defineConfig({
  plugins: [react()],
  server: {
    cors: true,
    host: '0.0.0.0',
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        login: path.resolve(__dirname, 'frontEnd/html-files/loginpage.html'),
        join: path.resolve(__dirname, 'frontEnd/html-files/join-us.html')
      }
    }
  },
  publicDir: 'public',
  resolve: {
    alias: {
      // Add any necessary aliases here
      '@': path.resolve(__dirname, './src')
    }
  }
});