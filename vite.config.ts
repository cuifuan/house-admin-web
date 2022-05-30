import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import type { ConfigEnv } from 'vite'

/**
 * 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node
 * pnpm add -D @types/node
 */
import { resolve } from 'path'
import * as path from 'path'
// import styleImport from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
      extensions: ['.js', '.vue'],
    },
    base: '/',
    server: {
      host: '127.0.0.1',
      port: 3002, // 设置服务启动端口号
      open: false, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:9999/house',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${path.resolve('src/styles/base.less')}";`,
            // 'menu-dark-bg': '#334154'
          },
          javascriptEnabled: true,
        },
      },
    },
  }
})
