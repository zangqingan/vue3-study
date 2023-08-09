import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import EslintPlugin from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// mock
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_APP_BASE_URL, // 后台服务器地址
          changeOrigin: true, // 是否允许不同源
          secure: false, // 支持https
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
    // 插件
    plugins: [
      vue(),
      // 开启 mock
      viteMockServe({
        // 解析根目录下的mock文件夹
        mockPath: './mock', // 解析指定目录下的mock文件夹
        localEnabled: command === 'serve', // 是否开启生产环境mock
        prodEnabled: command !== 'serve' && true,
        // 这样可以控制关闭mock的时候不让mock打包到最终代码内
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
        // 自动导入 Vue 和vue-router 相关函数，如：ref, reactive, toRef 等
        imports: ['vue', 'vue-router','pinia'],
        eslintrc: {
          enabled: false, // Default `false`需要注意的是，一旦生成配置文件之后，最好把改成false。否则这个文件每次会在重新加载的时候重新生成，这会导致eslint有时会找不到这个文件。
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon'
          })
        ],
        dts: './src/types/auto-imports.d.ts' // 指定类型声明文件，为true时在项目根目录创建
      }),
      Components({
        resolvers: [
          // ui库解析器-自动导入 Element Plus 组件
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep']
          })
        ],
        directoryAsNamespace: true, // 组件名称包含目录，防止同名组件冲突
        dts: './src/types/components.d.ts' // 指定类型声明文件，为true时在项目根目录创建
      }),
      Icons({
        autoInstall: true
      })
    ],
    resolve: {
      // 路径别名
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // 构建
    build: {
      outDir: 'dist', // 指定打包路径，默认为项目根目录下的 dist 目录
      assetsDir: 'static',
      minify: 'terser', // 使用terser压缩加密
      sourcemap: true,
      terserOptions: {
        compress: {
          keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          drop_console: true, // 生产环境去除 console
          drop_debugger: true // 生产环境去除 debugger
        }
      },
      rollupOptions: {
        output: {
          // 静态资源分类打包
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      },
      chunkSizeWarningLimit: 1500 // chunk 大小警告的限制（以 kbs 为单位）
    },
    // 全局样式
    css: {
      preprocessorOptions: {
        // 全局scss文件挂载
        scss: {
          additionalData: "@import '@/assets/styles/_variables.scss';"
        }
      }
    }
  }
})
