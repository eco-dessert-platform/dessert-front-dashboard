import {
  E2E_API_URL,
  apiSuccess,
  mockApi,
} from '@dessert/config/playwright/api-mock'

import { expect, test } from './support/fixtures'

import type { Page } from '@playwright/test'

const waitForApiRequest = (page: Page, method: string, path: string) =>
  page.waitForRequest(
    (request) =>
      request.method() === method && request.url() === `${E2E_API_URL}${path}`,
  )

test.beforeEach(async ({ loginAsAdmin }) => {
  await loginAsAdmin()
})

test.describe('회원가입 승인', () => {
  const application = {
    storeApplicationId: 11,
    sellerStoreDTO: {
      storeName: '빵그리 베이커리',
      phone: '01012345678',
      subPhone: null,
      email: 'seller@example.com',
      originAddressLine: '서울시 성동구',
      originAddressDetail: '1층',
    },
    sellerDTO: {
      sellerId: 21,
      sellerName: '김판매',
      sellerStatus: 'PENDING',
      bankCode: '004',
      accountHolder: '김판매',
      accountNumber: '123456789',
      createdAt: '2026-09-01T10:00:00',
    },
  }

  test.beforeEach(async ({ page }) => {
    await mockApi(page, 'GET', '/api/v1/admin/sellers', {
      json: apiSuccess({
        adminSellerApplicationList: [application],
        totalElements: 1,
        totalPages: 1,
        hasPrevious: false,
        hasNext: false,
      }),
    })
  })

  test('신청 목록을 표에 보여준다', async ({ page }) => {
    await page.goto('/store/member-approval')

    const row = page.getByRole('row').filter({ hasText: '빵그리 베이커리' })
    await expect(row).toContainText('seller@example.com')
    await expect(row).toContainText('2026.09.01')
  })

  test('선택한 신청에 대표자명과 사업자 번호를 입력해 승인한다', async ({
    page,
  }) => {
    await mockApi(page, 'PUT', '/api/v1/admin/sellers/approve', {
      json: apiSuccess({
        successDetails: [
          {
            storeApplicationId: 11,
            storeApplicationStatus: 'APPROVED',
            storeDTO: { storeId: 31, storeName: '빵그리 베이커리' },
            sellerDTO: { sellerId: 21, sellerName: '김판매' },
          },
        ],
        failDetails: [],
      }),
    })
    await page.goto('/store/member-approval')

    await page
      .getByRole('row')
      .filter({ hasText: '빵그리 베이커리' })
      .getByRole('checkbox')
      .click()
    // 선택하면 행 아래에 대표자명·사업자 번호 입력 행이 열린다
    const inputs = page.locator('tr.bg-gray-50').getByRole('textbox')
    await inputs.nth(0).fill('김판매')
    await inputs.nth(1).fill('1234567891')

    const approveRequest = waitForApiRequest(
      page,
      'PUT',
      '/api/v1/admin/sellers/approve',
    )
    await page.getByRole('button', { name: '승인' }).click()

    expect((await approveRequest).postDataJSON()).toEqual([
      { applicationId: 11, sellerName: '김판매', identifier: '1234567891' },
    ])
    await expect(page.getByText('1건의 회원가입을 승인했습니다.')).toBeVisible()
  })

  test('대표자명·사업자 번호를 비우면 승인 요청을 보내지 않는다', async ({
    page,
  }) => {
    await page.goto('/store/member-approval')

    await page
      .getByRole('row')
      .filter({ hasText: '빵그리 베이커리' })
      .getByRole('checkbox')
      .click()
    await page.getByRole('button', { name: '승인' }).click()

    await expect(page.getByText('항목을 입력하세요')).toBeVisible()
    expect(test.info().annotations).not.toContainEqual(
      expect.objectContaining({ type: 'unmocked-api' }),
    )
  })
})

test.describe('스토어명 변경 승인', () => {
  test.beforeEach(async ({ page }) => {
    await mockApi(page, 'GET', '/api/v1/admin/stores', {
      json: apiSuccess({
        updateStoreNames: [
          {
            requestId: 5,
            storeId: 31,
            currentName: '빵그리 베이커리',
            newName: '빵그리 오븐',
            createdAt: '2026-09-01T10:00:00',
          },
        ],
        totalElements: 1,
        totalPages: 1,
        hasPrevious: false,
        hasNext: false,
      }),
    })
  })

  test('변경 요청을 승인한다', async ({ page }) => {
    await mockApi(page, 'PATCH', '/api/v1/admin/stores/5/approve', {
      json: apiSuccess({
        storeId: 31,
        prevName: '빵그리 베이커리',
        updateName: '빵그리 오븐',
        status: 'APPROVE',
        modifiedAt: '2026-09-02T10:00:00',
      }),
    })
    await page.goto('/store/name-change-approval')

    const row = page.getByRole('row').filter({ hasText: '빵그리 오븐' })
    await expect(row).toContainText('빵그리 베이커리')
    const approveRequest = waitForApiRequest(
      page,
      'PATCH',
      '/api/v1/admin/stores/5/approve',
    )
    await row.getByRole('button', { name: '승인' }).click()

    await approveRequest
    await expect(
      page.getByText('스토어명 변경 요청을 승인했습니다.'),
    ).toBeVisible()
  })

  test('거절 사유를 입력해 변경 요청을 거절한다', async ({ page }) => {
    await mockApi(page, 'PATCH', '/api/v1/admin/stores/5/reject', {
      json: apiSuccess({
        requestId: 5,
        storeId: 31,
        currentName: '빵그리 베이커리',
        newName: '빵그리 오븐',
        status: 'REJECT',
        category: 'ADMIN_INAPPROPRIATE',
        rejectDetail: '스토어 성격과 맞지 않는 이름입니다.',
      }),
    })
    await page.goto('/store/name-change-approval')

    await page
      .getByRole('row')
      .filter({ hasText: '빵그리 오븐' })
      .getByRole('button', { name: '거절' })
      .click()
    const dialog = page.getByRole('dialog', { name: '거절 사유' })
    await dialog
      .getByPlaceholder('사유')
      .fill('스토어 성격과 맞지 않는 이름입니다.')

    const rejectRequest = waitForApiRequest(
      page,
      'PATCH',
      '/api/v1/admin/stores/5/reject',
    )
    await dialog.getByRole('button', { name: '전송' }).click()

    expect((await rejectRequest).postDataJSON()).toEqual({
      category: 'ADMIN_INAPPROPRIATE',
      rejectDetail: '스토어 성격과 맞지 않는 이름입니다.',
    })
    await expect(dialog).toBeHidden()
    await expect(
      page.getByText('스토어명 변경 요청을 거절했습니다.'),
    ).toBeVisible()
  })
})

test.describe('스토어 등록 관리', () => {
  const registeredStore = {
    storeId: 31,
    storeName: '빵그리 베이커리',
    businessNumber: '1234567891',
    introduce: '건강한 디저트를 만듭니다',
    phoneNumber: '01012345678',
    subPhoneNumber: '',
    email: 'store@example.com',
    originAddressLine: '(04790) 서울시 성동구',
    originAddressDetail: '1층',
  }

  const storeDetail = {
    storeId: 32,
    name: '새 디저트 가게',
    identifier: '2208162517',
    introduce: '새로 문을 연 디저트 가게',
    profile: 'https://cdn.example.com/store/32.png',
    phoneNumber: '0212345678',
    subPhoneNumber: '',
    email: 'new@gmail.com',
    originAddress: '(06236) 서울시 강남구 테헤란로',
    originAddressDetail: '2층',
  }

  test.beforeEach(async ({ page }) => {
    await mockApi(page, 'GET', '/api/v1/admin/stores/registered', {
      json: apiSuccess({
        content: [registeredStore],
        page: 0,
        size: 10,
        totalPages: 1,
        totalElements: 1,
      }),
    })
  })

  test('등록된 스토어 목록을 표에 보여준다', async ({ page }) => {
    await page.goto('/store/registration')

    const row = page.getByRole('row').filter({ hasText: '빵그리 베이커리' })
    await expect(row).toContainText('store@example.com')
    await expect(row).toContainText('건강한 디저트를 만듭니다')
  })

  test('스토어 정보를 입력해 새 스토어를 등록한다', async ({ page }) => {
    await mockApi(page, 'POST', '/api/v1/admin/stores', {
      json: apiSuccess(storeDetail),
    })
    await page.goto('/store/registration')

    await page.getByRole('button', { name: '등록', exact: true }).click()
    const dialog = page.getByRole('dialog')
    await dialog.locator('input[type="file"]').setInputFiles({
      name: 'profile.png',
      mimeType: 'image/png',
      buffer: Buffer.from('png-bytes'),
    })
    await dialog
      .getByPlaceholder('빵그리입니다!')
      .fill('새로 문을 연 디저트 가게')
    await dialog
      .getByPlaceholder('스토어명을 입력하세요')
      .fill('새 디저트 가게')
    await dialog
      .getByPlaceholder('사업자번호를 입력하세요')
      .fill('220-81-62517')
    await dialog
      .getByPlaceholder("'-' 특수문자 제외 연락처를 입력하세요")
      .first()
      .fill('0212345678')
    await dialog.getByPlaceholder('aaa123').fill('new')
    await dialog.getByRole('combobox').click()
    await page.getByRole('option', { name: 'gmail.com' }).click()
    // 다음 우편번호 팝업(외부 스크립트) 대신 직접 입력한다
    await dialog.getByPlaceholder('12345').fill('06236')
    await dialog
      .getByPlaceholder('서울특별시 강남구 선릉로')
      .fill('서울시 강남구 테헤란로')
    await dialog.getByPlaceholder('1동 101호').fill('2층')

    const createRequest = waitForApiRequest(
      page,
      'POST',
      '/api/v1/admin/stores',
    )
    await dialog.getByRole('button', { name: '등록하기' }).click()

    const request = await createRequest
    const body = request.postDataBuffer()?.toString() ?? ''
    expect(request.headers()['content-type']).toContain('multipart/form-data')
    expect(body).toContain('"storeName":"새 디저트 가게"')
    expect(body).toContain('"identifier":"2208162517"')
    expect(body).toContain('"subPhoneNumber":null')
    expect(body).toContain('"email":"new@gmail.com"')
    expect(body).toContain('"originAddress":"(06236) 서울시 강남구 테헤란로"')
    expect(body).toContain('filename="profile.png"')
    await expect(page.getByText('스토어를 생성했습니다.')).toBeVisible()
  })

  test('기존 정보가 채워진 수정 창에서 스토어를 수정한다', async ({ page }) => {
    await mockApi(page, 'PATCH', '/api/v1/admin/stores/31', {
      json: apiSuccess({ ...storeDetail, storeId: 31, name: '빵그리 오븐' }),
    })
    await page.goto('/store/registration')

    await page
      .getByRole('row')
      .filter({ hasText: '빵그리 베이커리' })
      .getByRole('button', { name: '수정' })
      .click()
    const dialog = page.getByRole('dialog', { name: '스토어 수정' })
    const storeNameInput = dialog.getByPlaceholder('스토어명을 입력하세요')
    await expect(storeNameInput).toHaveValue('빵그리 베이커리')
    await expect(dialog.getByPlaceholder('12345')).toHaveValue('04790')
    await storeNameInput.fill('빵그리 오븐')

    const updateRequest = waitForApiRequest(
      page,
      'PATCH',
      '/api/v1/admin/stores/31',
    )
    await dialog.getByRole('button', { name: '수정', exact: true }).click()

    expect((await updateRequest).postDataJSON()).toMatchObject({
      storeName: '빵그리 오븐',
      identifier: '1234567891',
      email: 'store@example.com',
      originAddress: '(04790) 서울시 성동구',
      originAddressDetail: '1층',
    })
    await expect(page.getByText('스토어를 수정했습니다.')).toBeVisible()
  })

  test('선택한 스토어를 확인 후 삭제한다', async ({ page }) => {
    await mockApi(page, 'DELETE', '/api/v1/admin/stores', {
      json: { success: true, code: 200, message: 'OK', fieldErrors: [] },
    })
    await page.goto('/store/registration')

    await page
      .getByRole('row')
      .filter({ hasText: '빵그리 베이커리' })
      .getByRole('checkbox')
      .click()
    await page.getByRole('button', { name: '삭제', exact: true }).click()
    const dialog = page.getByRole('dialog', { name: '경고' })
    await expect(dialog).toContainText('정말 스토어를 삭제하시나요?')

    const deleteRequest = page.waitForRequest(
      (request) =>
        request.method() === 'DELETE' &&
        request.url().startsWith(`${E2E_API_URL}/api/v1/admin/stores?`),
    )
    await dialog.getByRole('button', { name: '삭제' }).click()

    expect(
      new URL((await deleteRequest).url()).searchParams.getAll('storeIds'),
    ).toEqual(['31'])
    await expect(page.getByText('1개의 스토어를 삭제했습니다.')).toBeVisible()
  })
})
