import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 部署配置
  // 设置正确的base路径，确保资源能正确加载
base: process.env.NODE_ENV === 'production' ? '/personal-homepage/' : '/'
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // 确保构建时生成正确的资源路径
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})
