import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env
  },
  server: {
    // host: "0.0.0.0",
    host: "127.0.0.1", 
    port: 3000,
  }
})
