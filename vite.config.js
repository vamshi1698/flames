import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base : "/Flames",
  define: {
    'process.env.API_URL': JSON.stringify(process.env.API_URL),

  },
})
