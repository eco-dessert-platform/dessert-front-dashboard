import { createPlaywrightConfig } from '@dessert/config/playwright/create-config'

// dev 서버(6078)와 겹치지 않는 E2E 전용 포트
export default createPlaywrightConfig({
  port: 6178,
  env: {
    // 업로드 상품 승인 화면은 이 값이 없으면 모듈 로드 시점에 예외를 던진다
    VITE_PUBLIC_CUSTOMER_URL: 'http://customer.e2e.test',
  },
})
