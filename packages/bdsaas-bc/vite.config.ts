import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import vueJsx from '@vitejs/plugin-vue-jsx'

const cssPath =
  '../../../packages/bdsaas-bc/components/bc-side-menu/style/index.less'
const cssPath2 = '../style/index.css'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      outDir: resolve(__dirname, './dist/es'),
      tsconfigPath: './tsconfig.json'
    }),
    dts({
      outDir: resolve(__dirname, './dist/lib'),
      tsconfigPath: './tsconfig.json'
    })
    // {
    //   name: 'style',
    //   generateBundle(config, bundle) {
    //     const keys = Object.keys(bundle)
    //
    //     for (const key of keys) {
    //       const bundler: any = bundle[key as string]
    //
    //       this.emitFile({
    //         type: 'asset',
    //         fileName: key,
    //         source: bundler.code.replace(/\.less/g, '.css') // fixme 有问题，需要优化！！！
    //         // source: bundler.code.replace(cssPath, cssPath2) // todo 需要优化！！！（可能是 vite 版本导致，后期排查 rollup 配置）
    //       })
    //     }
    //   }
    // }
  ],
  build: {
    target: 'modules',
    outDir: 'dist',
    // minify: true,
    minify: 'esbuild',
    rollupOptions: {
      external: [
        'axios',
        'aplayer',
        'lodash-es',
        'qs',
        'vue',
        'vue-router',
        /\.less/
      ],
      input: 'index.ts',
      output: [
        {
          format: 'es',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: resolve(__dirname, './'),
          dir: resolve(__dirname, './dist/es')
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: resolve(__dirname, './'),
          dir: resolve(__dirname, './dist/lib')
        }
      ]
    },
    lib: {
      entry: './index.ts',
      name: 'BdsaasBc'
    }
  },
  resolve: {
    alias: {
      // fixme 使用别名在工作空间内引入会导致解析报错！！！
      // '@utils': resolve(__dirname, '_utils'),
      // '@plugins': resolve(__dirname, '_plugins'),
      // '@hooks': resolve(__dirname, '_hooks')
    }
  }
})
