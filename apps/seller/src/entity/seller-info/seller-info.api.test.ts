import { HttpResponse, http } from 'msw'

import { server } from '@/shared/libs/test/msw/server'

import {
  checkStoreName,
  getAccountVerification,
  requestStoreNameChange,
} from './seller-info.api'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'
const ACCOUNT_VERIFICATIONS_URL = `${BASE_URL}/api/v1/seller/sellers/account-verifications`
const STORES_CHECK_NAME_URL = `${BASE_URL}/api/v1/seller/stores/check-name`
const STORE_NAMES_URL = `${BASE_URL}/api/v1/seller/stores/store-names`

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('getAccountVerification', () => {
  it('200 응답이면 result를 언랩해 AccountVerificationDetail로 반환한다', async () => {
    const detail = {
      id: 1,
      sellerId: 1,
      bankCode: '92',
      accountNumber: '123412341234',
      accountHolder: '홍길동',
      verified: true,
      createdAt: '2025-12-10T14:32:10',
    }
    server.use(
      http.get(ACCOUNT_VERIFICATIONS_URL, () =>
        HttpResponse.json({
          success: true,
          code: 0,
          message: 'SUCCESS',
          result: detail,
        }),
      ),
    )

    await expect(getAccountVerification()).resolves.toEqual(detail)
  })

  it('400 응답(계좌 인증 이력 없음)이면 null을 반환한다', async () => {
    server.use(
      http.get(ACCOUNT_VERIFICATIONS_URL, () =>
        HttpResponse.json({ message: '계좌 인증 이력이 없습니다.' }, { status: 400 }),
      ),
    )

    await expect(getAccountVerification()).resolves.toBeNull()
  })

  it('400 외 에러(예: 500)는 그대로 throw한다', async () => {
    server.use(
      http.get(ACCOUNT_VERIFICATIONS_URL, () =>
        HttpResponse.json({ message: '서버 에러' }, { status: 500 }),
      ),
    )

    await expect(getAccountVerification()).rejects.toThrow()
  })
})

describe('checkStoreName', () => {
  it('사용 가능한 이름이면 available: true, store: null을 언랩해 반환한다', async () => {
    server.use(
      http.get(STORES_CHECK_NAME_URL, () =>
        HttpResponse.json({
          success: true,
          code: 0,
          message: 'SUCCESS',
          result: { available: true, store: null },
        }),
      ),
    )

    await expect(checkStoreName('빵그리의 오븐 2호점')).resolves.toEqual({
      available: true,
      store: null,
    })
  })

  it('이미 사용 중인 이름이면 available: false와 store 정보를 그대로 반환한다', async () => {
    const store = {
      storeId: 1,
      name: '빵그리의 오븐',
      introduce: '건강한 디저트를 만드는 베이커리',
      profile: 'https://cdn.example.com/store/logo.png',
      phoneNumber: '01012345678',
      subPhoneNumber: '01012345678',
      email: 'user@example.com',
      originAddress: '(12345) 성남시 금광동 222-31',
      originAddressDetail: '나동 202호',
    }
    server.use(
      http.get(STORES_CHECK_NAME_URL, () =>
        HttpResponse.json({
          success: true,
          code: 0,
          message: 'SUCCESS',
          result: { available: false, store },
        }),
      ),
    )

    await expect(checkStoreName('빵그리의 오븐')).resolves.toEqual({
      available: false,
      store,
    })
  })

  it('result가 비어 있으면 에러를 throw한다', async () => {
    server.use(
      http.get(STORES_CHECK_NAME_URL, () =>
        HttpResponse.json({ success: false, code: 1, message: '스토어 조회 실패' }),
      ),
    )

    await expect(checkStoreName('빵그리의 오븐')).rejects.toThrow(
      '스토어 조회 실패',
    )
  })

  it('앞뒤 공백을 제거한 스토어명으로 요청한다', async () => {
    let requestedStoreName: string | null = null
    server.use(
      http.get(STORES_CHECK_NAME_URL, ({ request }) => {
        requestedStoreName = new URL(request.url).searchParams.get('storeName')
        return HttpResponse.json({
          success: true,
          code: 0,
          message: 'SUCCESS',
          result: { available: true, store: null },
        })
      }),
    )

    await checkStoreName('  빵그리의 오븐  ')

    expect(requestedStoreName).toBe('빵그리의 오븐')
  })
})

describe('requestStoreNameChange', () => {
  const result = {
    sellerId: 1,
    storeId: 1,
    storeNameRequestId: 1,
    currentName: '빵그리의 오븐',
    newName: '빵그리의 오븐 2호점',
    status: 'PENDING',
    rejectCategory: null,
    rejectDetail: null,
  }

  it('200 응답이면 result를 언랩해 UpdateStoreNameResult로 반환한다', async () => {
    server.use(
      http.post(STORE_NAMES_URL, () =>
        HttpResponse.json({
          success: true,
          code: 0,
          message: 'SUCCESS',
          result,
        }),
      ),
    )

    await expect(
      requestStoreNameChange({ newName: '빵그리의 오븐 2호점' }),
    ).resolves.toEqual(result)
  })

  it('앞뒤 공백을 제거한 newName을 body에 담아 POST한다', async () => {
    let requestedBody: unknown = null
    server.use(
      http.post(STORE_NAMES_URL, async ({ request }) => {
        requestedBody = await request.json()
        return HttpResponse.json({
          success: true,
          code: 0,
          message: 'SUCCESS',
          result,
        })
      }),
    )

    await requestStoreNameChange({ newName: '  빵그리의 오븐 2호점  ' })

    expect(requestedBody).toEqual({ newName: '빵그리의 오븐 2호점' })
  })

  it('result가 비어 있으면 에러를 throw한다', async () => {
    server.use(
      http.post(STORE_NAMES_URL, () =>
        HttpResponse.json({
          success: false,
          code: 1,
          message: '이미 변경 신청 중인 스토어명이에요',
        }),
      ),
    )

    await expect(
      requestStoreNameChange({ newName: '빵그리의 오븐 2호점' }),
    ).rejects.toThrow('이미 변경 신청 중인 스토어명이에요')
  })
})
