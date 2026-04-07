import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// 모든 앱에서 공통으로 사용하는 Vite 기본 설정
// 앱별로 다른 설정(server.port, resolve.alias, 앱 고유 플러그인)은 각 앱에서 mergeConfig로 추가
export const baseViteConfig = defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
  ],

  base: '/',

  build: {
    // 청크 크기 경고 임계값 설정 (개선 목표: 500KB 이하)
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // 함수 형태: 실제 번들에 포함된 모듈만 청킹 (미설치 패키지는 자동으로 건너뜀)
        manualChunks(id) {
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/scheduler/')
          ) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/framer-motion/')) {
            return 'vendor-motion'
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'vendor-icons'
          }
          if (id.includes('node_modules/@radix-ui/')) {
            return 'vendor-radix'
          }
        },
      },
    },
  },
})
