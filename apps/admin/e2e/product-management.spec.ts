import {
  E2E_API_URL,
  apiSuccess,
  mockApi,
} from '@dessert/config/playwright/api-mock'

import { expect, test } from './support/fixtures'

import type { Page } from '@playwright/test'

const DECISION_PATH = '/api/v1/admin/products/7/decision'

const waitForDecision = (page: Page) =>
  page.waitForRequest(
    (request) =>
      request.method() === 'POST' &&
      request.url() === `${E2E_API_URL}${DECISION_PATH}`,
  )

test.describe('업로드 상품 승인', () => {
  test.beforeEach(async ({ page, loginAsAdmin }) => {
    await loginAsAdmin()
    await mockApi(page, 'GET', '/api/v1/admin/products/upload-approvals', {
      json: apiSuccess({
        content: [
          { boardId: 7, storeName: '빵그리 베이커리', boardTitle: '쌀식빵' },
        ],
        page: 0,
        size: 10,
        totalPages: 1,
        totalElements: 1,
      }),
    })
    await mockApi(page, 'POST', DECISION_PATH, {
      json: { success: true, code: 200, message: 'OK' },
    })
  })

  test('승인 대기 상품을 표에 보여주고 상품명은 고객 상품 페이지로 연결한다', async ({
    page,
  }) => {
    await page.goto('/products/upload-approval')

    const row = page.getByRole('row').filter({ hasText: '쌀식빵' })
    await expect(row).toContainText('빵그리 베이커리')
    await expect(row.getByRole('link', { name: '쌀식빵' })).toHaveAttribute(
      'href',
      'http://customer.e2e.test/main/products/7/info',
    )
  })

  test('확인 창을 거쳐 상품을 승인한다', async ({ page }) => {
    await page.goto('/products/upload-approval')

    await page
      .getByRole('row')
      .filter({ hasText: '쌀식빵' })
      .getByRole('button', { name: '승인' })
      .click()
    const dialog = page.getByRole('dialog', { name: '상품을 승인할까요?' })
    await expect(dialog).toContainText('승인 후에는 취소가 불가능합니다.')

    const decision = waitForDecision(page)
    await dialog.getByRole('button', { name: '확인' }).click()

    expect((await decision).postDataJSON()).toEqual({ decisionType: 'APPROVE' })
    await expect(dialog).toBeHidden()
    await expect(page.getByText('업로드 상품을 승인했습니다.')).toBeVisible()
  })

  test('확인 창에서 취소하면 승인 요청을 보내지 않는다', async ({ page }) => {
    await page.goto('/products/upload-approval')

    await page
      .getByRole('row')
      .filter({ hasText: '쌀식빵' })
      .getByRole('button', { name: '승인' })
      .click()
    const dialog = page.getByRole('dialog', { name: '상품을 승인할까요?' })
    let decided = false
    page.on('request', (request) => {
      if (request.url() === `${E2E_API_URL}${DECISION_PATH}`) decided = true
    })
    await dialog.getByRole('button', { name: '취소' }).click()

    await expect(dialog).toBeHidden()
    expect(decided).toBe(false)
  })

  test('거절 카테고리와 사유를 입력해 거절한다', async ({ page }) => {
    await page.goto('/products/upload-approval')

    await page
      .getByRole('row')
      .filter({ hasText: '쌀식빵' })
      .getByRole('button', { name: '거절' })
      .click()
    const dialog = page.getByRole('dialog', { name: '거절 사유' })
    await dialog
      .getByRole('button', { name: '거절 카테고리를 선택하세요' })
      .click()
    await dialog.getByRole('button', { name: '광고성 문구 포함' }).click()
    await dialog.getByPlaceholder('사유').fill('상품명에 광고 문구가 있습니다.')

    const decision = waitForDecision(page)
    await dialog.getByRole('button', { name: '전송' }).click()

    expect((await decision).postDataJSON()).toEqual({
      decisionType: 'REJECT',
      rejectCategory: 'CONTAINS_ADVERTISING',
      rejectReason: '상품명에 광고 문구가 있습니다.',
    })
    await expect(dialog).toBeHidden()
    await expect(page.getByText('업로드 상품을 거절했습니다.')).toBeVisible()
  })

  test('거절 카테고리를 고르지 않으면 안내하고 요청을 보내지 않는다', async ({
    page,
  }) => {
    await page.goto('/products/upload-approval')

    await page
      .getByRole('row')
      .filter({ hasText: '쌀식빵' })
      .getByRole('button', { name: '거절' })
      .click()
    const dialog = page.getByRole('dialog', { name: '거절 사유' })
    await dialog.getByPlaceholder('사유').fill('사유만 입력')
    let decided = false
    page.on('request', (request) => {
      if (request.url() === `${E2E_API_URL}${DECISION_PATH}`) decided = true
    })
    await dialog.getByRole('button', { name: '전송' }).click()

    await expect(
      dialog.getByText('거절 카테고리를 선택해주세요.'),
    ).toBeVisible()
    expect(decided).toBe(false)
  })
})
