import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  resolve: {
    alias: {
      './lib-cov/fluent-ffmpeg': './lib/fluent-ffmpeg'
    },
  },
})
