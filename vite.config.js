import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  server: {
    // For dev server
    historyApiFallback: true,
  },
  preview: {
    // For preview server
    historyApiFallback: true,
  },
 })

 