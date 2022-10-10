import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};  
  return {
    plugins: [
      react(),
      EnvironmentPlugin(['SECURE_LOCAL_STORAGE_HASH_KEY'])
    ]
  }
})
