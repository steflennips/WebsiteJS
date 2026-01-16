
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    // Dit zorgt ervoor dat alle voorkomens van 'process.env.API_KEY' in je code
    // tijdens de build worden vervangen door de waarde die in Vercel is ingesteld.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
