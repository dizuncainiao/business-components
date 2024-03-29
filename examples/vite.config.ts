import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { cwd } from 'process'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, cwd())
  const { VITE_HOST } = env
  return {
    plugins: [vue(), vueJsx()],
    server: {
      proxy: {
        '/bdcloud-call-analytic': {
          target: 'https://demo.bdsaas.cn/',
          changeOrigin: true,
          secure: true
        },
        '/associate-web': {
          target: 'https://demo.bdsaas.cn/',
          changeOrigin: true,
          secure: true
        },
        '/bdsaas': {
          target: 'https://demo.bdsaas.cn/',
          changeOrigin: true,
          secure: true
        }
      },
      open: true,
      port: 5678
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }
  }
})
