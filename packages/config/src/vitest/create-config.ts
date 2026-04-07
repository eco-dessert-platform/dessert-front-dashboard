import path from 'path'

import react from '@vitejs/plugin-react-swc'
import { type Plugin, defineConfig } from 'vitest/config'

export function createVitestConfig(appRoot: string) {
  return defineConfig({
    plugins: [react() as unknown as Plugin],

    test: {
      // happy-dom: jsdom보다 빠르고 최신 Web API 지원이 좋음
      environment: 'happy-dom',

      // 각 테스트 파일 실행 전 자동으로 실행되는 setup 파일
      // jest-dom의 toBeInTheDocument() 등 커스텀 매처를 vitest expect에 등록
      setupFiles: ['@dessert/config/test/setup'],

      // describe, it, expect 등을 import 없이 전역으로 사용
      globals: true,

      include: ['src/**/*.{test,spec}.{ts,tsx}'],

      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        include: ['src/**/*.{ts,tsx}'],
        exclude: [
          'src/**/*.stories.{ts,tsx}',
          'src/**/*.d.ts',
          'src/main.tsx',
          'src/vite-env.d.ts',
        ],
      },
    },

    // 앱 루트를 인자로 받아 각 앱의 src 디렉토리를 '@'로 매핑
    resolve: {
      alias: {
        '@': path.resolve(appRoot, 'src'),
      },
    },
  })
}
