import {
  blockUnmockedApi,
  createFakeJwt,
} from '@dessert/config/playwright/api-mock'
import { test as base, expect } from '@playwright/test'

import type { SellerStatus } from '../../src/entity/auth/types'

export const SELLER_ID = 1

export const createSellerToken = () =>
  createFakeJwt({ id: SELLER_ID, role: 'ROLE_SELLER' })

type SellerFixtures = {
  /**
   * 토큰 쿠키와 auth-storage(로그인 여부·셀러 상태)를 심어 로그인된 상태로 만든다.
   * 라우트 가드는 셀러 상태로 접근 가능한 화면을 가르므로 상태를 지정할 수 있다.
   */
  loginAsSeller: (status?: SellerStatus) => Promise<void>
}

export const test = base.extend<SellerFixtures>({
  page: async ({ page }, use, testInfo) => {
    await blockUnmockedApi(page, (request) => {
      testInfo.annotations.push({ type: 'unmocked-api', description: request })
    })
    await use(page)
  },

  loginAsSeller: async ({ context, baseURL }, use) => {
    await use(async (status = 'APPROVED') => {
      await context.addCookies([
        { name: 'accessToken', value: createSellerToken(), url: baseURL },
        { name: 'refreshToken', value: createSellerToken(), url: baseURL },
      ])
      // 앱이 로그아웃으로 값을 바꾼 뒤에는 덮어쓰지 않도록 비어 있을 때만 심는다
      await context.addInitScript(
        ({ sellerId, sellerStatus }) => {
          if (localStorage.getItem('auth-storage')) return
          localStorage.setItem(
            'auth-storage',
            JSON.stringify({
              state: { isLoggedIn: true, sellerId, sellerStatus },
              version: 0,
            }),
          )
        },
        { sellerId: SELLER_ID, sellerStatus: status },
      )
    })
  },
})

export { expect }
