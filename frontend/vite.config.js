import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 👈 This is the important part
    port: 5173, // Optional: You can set a fixed port
  },
})
