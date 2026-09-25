import {
  blockUnmockedApi,
  createFakeJwt,
} from '@dessert/config/playwright/api-mock'
import { test as base, expect } from '@playwright/test'

export const ADMIN_ID = 1

export const createAdminToken = () =>
  createFakeJwt({ id: ADMIN_ID, role: 'ROLE_ADMIN' })

type AdminFixtures = {
  /** 액세스·리프레시 토큰 쿠키를 심어 로그인된 상태로 만든다. */
  loginAsAdmin: () => Promise<void>
}

export const test = base.extend<AdminFixtures>({
  page: async ({ page }, use, testInfo) => {
    await blockUnmockedApi(page, (request) => {
      testInfo.annotations.push({ type: 'unmocked-api', description: request })
    })
    await use(page)
  },

  loginAsAdmin: async ({ context, baseURL }, use) => {
    await use(async () => {
      await context.addCookies([
        { name: 'accessToken', value: createAdminToken(), url: baseURL },
        { name: 'refreshToken', value: createAdminToken(), url: baseURL },
      ])
    })
  },
})

export { expect }
