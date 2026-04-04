import path from 'path'

import { baseViteConfig } from '@dessert/config/vite/base'
import { copyRobotsTxt, fontPreloadPlugin } from '@dessert/config/vite/plugins'
import { mergeConfig } from 'vite'

// https://vite.dev/config/
export default mergeConfig(baseViteConfig, {
  plugins: [fontPreloadPlugin(__dirname), copyRobotsTxt(__dirname)],

  // 포트지정
  server: {
    port: 6078,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
