import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
// 按需加载elementUI
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    open: false,// 是否自动在浏览器打开
    https: false,// 是否开启 https
    ssr: false,// 服务端渲染
    hot: true,
    outDir: 'target',
    host: "localhost",
    port: 3000,
    proxy: {
      '/api/test': {
        target: '192.168.6.240:9300', 
        changeOrigin: true,
        loglevel: "debug",
        rewrite: path => path.replace(/^\/api\/test/, '')
      },
      '/api': {
        // target: 'http://192.168.250.119:9999/', //
        target: 'http://43.134.8.73:9595',
        changeOrigin: true,
        loglevel: "debug",
        rewrite: path => path.replace(/^\/api/, '')
      },
    },
  },
})

