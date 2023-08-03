// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/github-store/business-components/node_modules/.pnpm/vite@4.4.5_@types+node@18.16.5_less@4.1.3/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/github-store/business-components/node_modules/.pnpm/@vitejs+plugin-vue@4.2.3_vite@4.4.5_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { cwd } from "process";
import vueJsx from "file:///D:/github-store/business-components/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.0.1_vite@4.4.5_vue@3.3.4/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "D:\\github-store\\business-components\\examples";
var vite_config_default = defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, cwd());
  const { VITE_HOST } = env;
  return {
    plugins: [vue(), vueJsx()],
    server: {
      proxy: {
        "/bdcloud-call-analytic": {
          target: "https://demo.bdsaas.cn/",
          changeOrigin: true,
          secure: true
        },
        "/associate-web": {
          target: "https://demo.bdsaas.cn/",
          changeOrigin: true,
          secure: true
        },
        "/bdsaas": {
          target: "https://demo.bdsaas.cn/",
          changeOrigin: true,
          secure: true
        }
      },
      open: true,
      port: 5676
    },
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "src")
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxnaXRodWItc3RvcmVcXFxcYnVzaW5lc3MtY29tcG9uZW50c1xcXFxleGFtcGxlc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcZ2l0aHViLXN0b3JlXFxcXGJ1c2luZXNzLWNvbXBvbmVudHNcXFxcZXhhbXBsZXNcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2dpdGh1Yi1zdG9yZS9idXNpbmVzcy1jb21wb25lbnRzL2V4YW1wbGVzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB7IGN3ZCB9IGZyb20gJ3Byb2Nlc3MnXHJcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KSA9PiB7XHJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBjd2QoKSlcclxuICBjb25zdCB7IFZJVEVfSE9TVCB9ID0gZW52XHJcbiAgcmV0dXJuIHtcclxuICAgIHBsdWdpbnM6IFt2dWUoKSwgdnVlSnN4KCldLFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgJy9iZGNsb3VkLWNhbGwtYW5hbHl0aWMnOiB7XHJcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwczovL2RlbW8uYmRzYWFzLmNuLycsXHJcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgICBzZWN1cmU6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgICcvYXNzb2NpYXRlLXdlYic6IHtcclxuICAgICAgICAgIHRhcmdldDogJ2h0dHBzOi8vZGVtby5iZHNhYXMuY24vJyxcclxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICAgIHNlY3VyZTogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJy9iZHNhYXMnOiB7XHJcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwczovL2RlbW8uYmRzYWFzLmNuLycsXHJcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgICBzZWN1cmU6IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG9wZW46IHRydWUsXHJcbiAgICAgIHBvcnQ6IDU2NzZcclxuICAgIH0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFQsU0FBUyxjQUFjLGVBQWU7QUFDcFcsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsV0FBVztBQUNwQixPQUFPLFlBQVk7QUFDbkIsU0FBUyxlQUFlO0FBSnhCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsU0FBUyxLQUFLLE1BQU07QUFDakQsUUFBTSxNQUFNLFFBQVEsTUFBTSxJQUFJLENBQUM7QUFDL0IsUUFBTSxFQUFFLFVBQVUsSUFBSTtBQUN0QixTQUFPO0FBQUEsSUFDTCxTQUFTLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztBQUFBLElBQ3pCLFFBQVE7QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMLDBCQUEwQjtBQUFBLFVBQ3hCLFFBQVE7QUFBQSxVQUNSLGNBQWM7QUFBQSxVQUNkLFFBQVE7QUFBQSxRQUNWO0FBQUEsUUFDQSxrQkFBa0I7QUFBQSxVQUNoQixRQUFRO0FBQUEsVUFDUixjQUFjO0FBQUEsVUFDZCxRQUFRO0FBQUEsUUFDVjtBQUFBLFFBQ0EsV0FBVztBQUFBLFVBQ1QsUUFBUTtBQUFBLFVBQ1IsY0FBYztBQUFBLFVBQ2QsUUFBUTtBQUFBLFFBQ1Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxNQUMvQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
