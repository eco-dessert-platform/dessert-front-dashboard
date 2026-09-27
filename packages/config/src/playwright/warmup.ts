import { chromium } from '@playwright/test'

import type { FullConfig } from '@playwright/test'

/**
 * 테스트 전에 앱을 한 번 열어 dev 서버의 모듈 변환 캐시를 채운다.
 * 서버를 새로 띄운 직후에는 여러 워커가 동시에 수백 개 모듈 변환을 기다리느라
 * 첫 화면이 기대 대기 시간(10초)을 넘겨 간헐적으로 실패했다.
 */
export default async function warmup(config: FullConfig) {
  const baseURL = config.projects[0]?.use.baseURL
  if (!baseURL) return

  const browser = await chromium.launch()
  try {
    const page = await browser.newPage()
    await page.goto(baseURL, { waitUntil: 'networkidle', timeout: 120_000 })
  } finally {
    await browser.close()
  }
}
