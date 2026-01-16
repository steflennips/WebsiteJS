
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    // Deze vervanging is cruciaal voor Vercel om de API-sleutel vanuit de environment
    // variabelen naar de browser-code te 'branden' tijdens het bouwen.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
