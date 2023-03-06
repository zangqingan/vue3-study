import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import EslintPlugin from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// mock
import { viteMockServe } from 'vite-plugin-mock'
const prodMock = true // 是否开启生产环境mock

const baseURL = '/api'
const https = false

const prefix = https ? 'https://' : 'http://'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: prefix + baseURL,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [
    vue(),
    viteMockServe({
      // 解析根目录下的mock文件夹
      mockPath: './src/mock', // 解析指定目录下的mock文件夹
      prodEnabled: prodMock,
      injectCode: `
          import { setupProdMockServer } from './utils/mockProdServer';
          setupProdMockServer();
        `
    }),
    EslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/**/*.ts'],
      exclude: ['./node_modules']
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      eslintrc: {
        enabled: false, // Default `false`需要注意的是，一旦生成配置文件之后，最好把改成false。否则这个文件每次会在重新加载的时候重新生成，这会导致eslint有时会找不到这个文件。
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      resolvers: [ElementPlusResolver()],
      dts: './src/types/auto-imports.d.ts' // 指定类型声明文件，为true时在项目根目录创建
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      directoryAsNamespace: true, // 组件名称包含目录，防止同名组件冲突
      dts: './src/types/components.d.ts' // 指定类型声明文件，为true时在项目根目录创建
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'static',
    minify: 'terser', // 使用terser压缩加密
    sourcemap: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        // 静态资源分类打包
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import './src/assets/css/_variables.scss';"
      }
    }
  }
})
