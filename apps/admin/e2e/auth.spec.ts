import { apiSuccess, mockApi } from '@dessert/config/playwright/api-mock'

import { createAdminToken, expect, test } from './support/fixtures'

import type { Page } from '@playwright/test'

// 앱은 accessToken 쿠키로 로그인 여부를 판단해 auth-storage에 저장한다
const readIsLoggedIn = (page: Page) =>
  page.evaluate(
    () =>
      JSON.parse(localStorage.getItem('auth-storage') ?? '{}').state
        ?.isLoggedIn,
  )

test.describe('어드민 로그인', () => {
  test('아이디와 비밀번호로 로그인하면 회원가입 승인 화면으로 이동한다', async ({
    page,
    context,
  }) => {
    await mockApi(page, 'POST', '/api/v1/admin/login', {
      json: apiSuccess({
        accessToken: createAdminToken(),
        refreshToken: createAdminToken(),
      }),
    })

    await page.goto('/login')
    await page.getByPlaceholder('아이디를 입력해주세요').fill('admin')
    await page.getByPlaceholder('비밀번호를 입력해주세요').fill('password1!')
    await page.getByRole('button', { name: '로그인' }).click()

    await expect(page).toHaveURL(/\/store\/member-approval$/)
    const cookies = await context.cookies()
    expect(cookies.some((cookie) => cookie.name === 'accessToken')).toBe(true)
  })

  test('로그인에 실패하면 로그인 화면에 머문다', async ({ page }) => {
    await mockApi(page, 'POST', '/api/v1/admin/login', {
      status: 401,
      json: {
        success: false,
        code: 401,
        message: '아이디 또는 비밀번호가 올바르지 않습니다.',
        fieldErrors: [],
        result: null,
      },
    })

    await page.goto('/login')
    await page.getByPlaceholder('아이디를 입력해주세요').fill('admin')
    await page.getByPlaceholder('비밀번호를 입력해주세요').fill('wrong1!')
    await page.getByRole('button', { name: '로그인' }).click()

    await expect(page.getByText('로그인 정보를 확인하세요')).toBeVisible()
    await expect(page).toHaveURL(/\/login$/)
  })

  test('loginAsAdmin으로 들어가면 앱이 로그인 상태로 인식한다', async ({
    page,
    loginAsAdmin,
  }) => {
    await loginAsAdmin()

    await page.goto('/')

    await expect(page).toHaveURL(/\/store\/member-approval$/)
    await expect.poll(() => readIsLoggedIn(page)).toBe(true)
  })

  test('로그인하지 않으면 앱이 로그아웃 상태로 인식한다', async ({ page }) => {
    await page.goto('/')

    await expect.poll(() => readIsLoggedIn(page)).toBe(false)
  })
})
