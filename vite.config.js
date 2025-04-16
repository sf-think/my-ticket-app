import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // <--- 确保导入了 'path' 模块

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 这行是关键，它将 '@' 指向 './src' 目录
      '@': path.resolve(__dirname, './src'),
    }
  },
  // ... 其他配置
})