import { expect, test } from './support/fixtures'

test.describe('셀러 라우트 가드', () => {
  test('로그인하지 않고 대시보드에 들어가면 로그인 화면으로 이동한다', async ({
    page,
  }) => {
    await page.goto('/products')

    await expect(page).toHaveURL(/\/auth$/)
    await expect(page.getByText('카카오로 로그인')).toBeVisible()
    await expect(page.getByText('구글로 로그인')).toBeVisible()
  })

  test('승인된 셀러는 상품 관리 화면에 머문다', async ({
    page,
    loginAsSeller,
  }) => {
    await loginAsSeller('APPROVED')

    await page.goto('/products')

    await expect(page).toHaveURL(/\/products$/)
    await expect(page.getByText('카카오로 로그인')).toHaveCount(0)
  })

  test('승인 대기 셀러는 대시보드 대신 가입 완료 화면으로 이동한다', async ({
    page,
    loginAsSeller,
  }) => {
    await loginAsSeller('PENDING')

    await page.goto('/products')

    await expect(page).toHaveURL(/\/register\/complete$/)
  })
})
