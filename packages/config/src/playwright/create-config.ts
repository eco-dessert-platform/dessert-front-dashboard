import { defineConfig, devices } from '@playwright/test'

import { E2E_API_URL } from './api-mock.js'

interface PlaywrightConfigOptions {
  /**
   * E2E 전용 개발 서버 포트. 평소 쓰는 dev 서버 포트와 다르게 잡아서,
   * 실서버를 바라보는 dev 서버를 테스트가 재사용하는 일이 없게 한다.
   */
  port: number
}

export function createPlaywrightConfig({ port }: PlaywrightConfigOptions) {
  const baseURL = `http://localhost:${port}`
  // CI=false처럼 문자열로 끄는 경우도 있어 값까지 비교한다
  const isCI = process.env.CI === 'true'

  return defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    forbidOnly: isCI,
    retries: isCI ? 2 : 0,
    workers: isCI ? 1 : undefined,
    // dev 서버는 모듈을 요청 시점에 변환해서 첫 화면까지 수 초가 걸린다 (셀러 약 3초, 병렬 실행 시 더 느림)
    expect: { timeout: 10_000 },
    reporter: isCI
      ? [['github'], ['html', { open: 'never' }]]
      : [['list'], ['html', { open: 'never' }]],

    use: {
      baseURL,
      trace: 'on-first-retry',
      screenshot: 'only-on-failure',
    },

    projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],

    webServer: {
      command: `yarn vite --port ${port} --strictPort`,
      url: baseURL,
      reuseExistingServer: false,
      timeout: 120_000,
      // Vite는 이미 설정된 환경변수를 .env보다 우선한다. 모든 API 주소를 모킹 전용 호스트로 돌린다.
      env: {
        VITE_PUBLIC_SERVER_URL: E2E_API_URL,
        VITE_API_HOST: E2E_API_URL,
        VITE_API_BASE_URL: E2E_API_URL,
      },
    },
  })
}
