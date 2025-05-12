import uni from '@dcloudio/vite-plugin-uni'
import tailwindcss from '@tailwindcss/postcss'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import { UnifiedViteWeappTailwindcssPlugin } from 'weapp-tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    UnifiedViteWeappTailwindcssPlugin({
      rem2rpx: true,
    }),
    AutoImport({
      // 自动导入Vue相关API
      imports: ['vue', 'vue-router', 'uni-app'],
      // 可以选择auto-import.d.ts生成的位置，使IDE自动获取类型
      dts: 'src/auto-import.d.ts',
      // 解决eslint报错问题
      eslintrc: {
        enabled: true
      }
    })
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss()
      ]
    }
  }
})
