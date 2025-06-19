import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: '**/*.{jsx,js}', // This tells the React plugin to process both .jsx and .js files
    }),
    tailwindcss()
  ],
})
