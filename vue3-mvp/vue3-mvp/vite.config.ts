import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import vueJsx from '@vitejs/plugin-vue-jsx'

const __dirname = dirname(fileURLToPath(import.meta.url))
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),vueJsx()],
  base:"/axshare/",
  define:{
    'process.env':{}
  },
  server: {
    host: 'localhost', // 指定服务器主机名
    port: 8880, // 指定服务器端口
    hmr: true,  // 开启热更新
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    https: false // 是否开启 https
},
resolve: {
  alias: {
    '@': path.join(__dirname, './src'),
    '@Project': path.join(__dirname, './src/Projects')
  }
}
})

