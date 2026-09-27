import { apiSuccess, mockApi } from '@dessert/config/playwright/api-mock'

import { expect, test } from './support/fixtures'

test.describe('셀러 상품 관리', () => {
  test('상품 목록 API 응답이 표에 표시된다', async ({
    page,
    loginAsSeller,
  }) => {
    await loginAsSeller('APPROVED')
    await mockApi(page, 'GET', '/api/v1/seller/boards', {
      json: apiSuccess({
        tabCounts: {
          ON_SALE: 1,
          OUT_OF_STOCK: 0,
          STOPPED: 0,
          PENDING: 0,
          BANNED: 0,
        },
        boards: {
          content: [
            {
              boardId: 1,
              thumbnailUrl: '',
              title: 'E2E 글루텐프리 쌀식빵',
              inventoryStatus: 'IN_STOCK',
              price: 12000,
              discountPrice: 10000,
              discountValue: 2000,
              deliveryFee: 3000,
              freeShippingConditions: 30000,
              deliveryType: 'NORMAL',
              saleStatus: 'ON_SALE',
            },
          ],
          page: 0,
          size: 20,
          totalPages: 1,
          totalElements: 1,
        },
      }),
    })

    await page.goto('/products')

    await expect(page.getByText('E2E 글루텐프리 쌀식빵')).toBeVisible()
  })
})
