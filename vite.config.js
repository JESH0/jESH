import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
    server: {
    host: '0.0.0.0', // This allows access from other devices
    port: 5173
  },
  plugins: [
    tailwindcss(),
  ],
})