import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import {
  approveAdminSellerApplications,
  downloadAdminSellerDocuments,
  getAdminSellerApplications,
  rejectAdminSellerApplications,
} from './member-approval.api'

const BASE_URL = import.meta.env.VITE_PUBLIC_SERVER_URL
const SELLERS_URL = `${BASE_URL}/api/v1/admin/sellers`

const server = setupServer()

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const wrap = (result: unknown) => ({
  success: true,
  code: 200,
  message: 'OK',
  fieldErrors: [],
  result,
})

const failure = (message: string) => ({
  success: false,
  code: 400,
  message,
  fieldErrors: [],
  result: null,
})

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

const sellerDetail = {
  sellerId: 21,
  sellerName: '김판매',
  sellerStatus: 'APPROVED',
}

describe('회원가입 신청 목록 조회', () => {
  it('페이지 파라미터를 보내고 목록과 페이지 정보를 반환한다', async () => {
    let page: string | null = null
    server.use(
      http.get(SELLERS_URL, ({ request }) => {
        page = new URL(request.url).searchParams.get('page')
        return HttpResponse.json(
          wrap({
            adminSellerApplicationList: [application],
            totalElements: 1,
            totalPages: 1,
            hasPrevious: false,
            hasNext: false,
          }),
        )
      }),
    )

    const result = await getAdminSellerApplications({ page: 2 })

    expect(page).toBe('2')
    expect(result.totalElements).toBe(1)
    expect(result.adminSellerApplicationList[0].sellerDTO.sellerName).toBe(
      '김판매',
    )
  })

  it('실패 응답이면 서버 메시지로 에러를 던진다', async () => {
    server.use(
      http.get(SELLERS_URL, () =>
        HttpResponse.json(failure('조회 권한이 없습니다.')),
      ),
    )

    await expect(getAdminSellerApplications()).rejects.toThrow(
      '조회 권한이 없습니다.',
    )
  })

  it('응답 형태가 명세와 다르면 에러를 던진다', async () => {
    server.use(
      http.get(SELLERS_URL, () =>
        HttpResponse.json(wrap({ adminSellerApplicationList: 'invalid' })),
      ),
    )

    await expect(getAdminSellerApplications()).rejects.toThrow()
  })
})

describe('회원가입 승인', () => {
  it('신청 ID·셀러명·식별자 배열을 PUT 본문으로 보내고 성공·실패 내역을 반환한다', async () => {
    let body: unknown
    server.use(
      http.put(`${SELLERS_URL}/approve`, async ({ request }) => {
        body = await request.json()
        return HttpResponse.json(
          wrap({
            successDetails: [
              {
                storeApplicationId: 11,
                storeApplicationStatus: 'APPROVED',
                storeDTO: { storeId: 31, storeName: '빵그리 베이커리' },
                sellerDTO: sellerDetail,
              },
            ],
            failDetails: [{ storeApplicationId: 12, reason: '이미 처리됨' }],
          }),
        )
      }),
    )

    const result = await approveAdminSellerApplications([
      { applicationId: 11, sellerName: '김판매', identifier: 'bbanggree' },
    ])

    expect(body).toEqual([
      { applicationId: 11, sellerName: '김판매', identifier: 'bbanggree' },
    ])
    expect(result.successDetails).toHaveLength(1)
    expect(result.failDetails[0]).toEqual({
      storeApplicationId: 12,
      reason: '이미 처리됨',
    })
  })
})

describe('회원가입 거절', () => {
  it('신청 ID 목록을 PATCH 본문으로 보내고 성공 ID와 실패 내역을 반환한다', async () => {
    let body: unknown
    server.use(
      http.patch(`${SELLERS_URL}/reject`, async ({ request }) => {
        body = await request.json()
        return HttpResponse.json(wrap({ successIds: [11], failDetails: [] }))
      }),
    )

    const result = await rejectAdminSellerApplications({
      applicationIds: [11],
    })

    expect(body).toEqual({ applicationIds: [11] })
    expect(result.successIds).toEqual([11])
  })
})

describe('셀러 제출 서류 다운로드', () => {
  const DOWNLOAD_URL = `${SELLERS_URL}/documents/download`

  it('Content-Disposition의 UTF-8 파일명을 디코딩해 파일과 함께 반환한다', async () => {
    let body: unknown
    server.use(
      http.post(DOWNLOAD_URL, async ({ request }) => {
        body = await request.json()
        return new HttpResponse(new Blob(['zip-bytes']), {
          headers: {
            'Content-Type': 'application/zip',
            'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent('셀러서류.zip')}`,
          },
        })
      }),
    )

    const result = await downloadAdminSellerDocuments({ sellerIds: [21] })

    expect(body).toEqual({ sellerIds: [21] })
    expect(result.filename).toBe('셀러서류.zip')
    expect(await result.blob.text()).toBe('zip-bytes')
  })

  it('파일명 헤더가 없으면 기본 파일명을 쓴다', async () => {
    server.use(
      http.post(DOWNLOAD_URL, () => new HttpResponse(new Blob(['zip-bytes']))),
    )

    const result = await downloadAdminSellerDocuments({ sellerIds: [21] })

    expect(result.filename).toBe('documents.zip')
  })

  it('에러 응답 본문의 메시지로 에러를 던진다', async () => {
    server.use(
      http.post(DOWNLOAD_URL, () =>
        HttpResponse.json(failure('제출 서류가 없습니다.'), { status: 404 }),
      ),
    )

    await expect(
      downloadAdminSellerDocuments({ sellerIds: [21] }),
    ).rejects.toThrow('제출 서류가 없습니다.')
  })

  it('요청 전에 셀러 ID 개수 제한(최대 50개)을 검사한다', async () => {
    const sellerIds = Array.from({ length: 51 }, (_, index) => index + 1)

    await expect(downloadAdminSellerDocuments({ sellerIds })).rejects.toThrow()
  })
})
