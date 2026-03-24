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
        manualChunks: {
          // React 관련 모듈
          'vendor-react': [
            'react',
            'react-dom',
            'scheduler',
            'react/jsx-runtime',
          ],
          // 애니메이션 관련 모듈
          'vendor-motion': ['framer-motion'],
          // 아이콘 관련 모듈
          'vendor-icons': ['lucide-react'],
          // Radix UI 관련 모듈
          'vendor-radix': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-label',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-separator',
            '@radix-ui/react-slot',
            '@radix-ui/react-switch',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip',
          ],
        },
      },
    },
  },
})
