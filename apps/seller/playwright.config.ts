import { createPlaywrightConfig } from '@dessert/config/playwright/create-config'

// dev 서버(3000)와 겹치지 않는 E2E 전용 포트
export default createPlaywrightConfig({ port: 3100 })
