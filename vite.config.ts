import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/carbon-calculator/',
  plugins: [
    preact(), 
    tailwindcss(),
    VitePWA({ registerType: 'autoUpdate' })
  ],
})
