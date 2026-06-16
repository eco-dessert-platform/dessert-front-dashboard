import { HttpResponse, http } from 'msw'

import { server } from '@/shared/libs/test/msw/server'

import {
  approveUpdateStoreName,
  getUpdateStoreNames,
  rejectUpdateStoreName,
} from './name-change-approval.api'

const BASE_URL = import.meta.env.VITE_PUBLIC_SERVER_URL

const listResult = {
  updateStoreNames: [
    {
      requestId: 1,
      storeId: 10,
      currentName: '기존 스토어',
      newName: '변경된 스토어',
      createdAt: '2026-06-16T09:00:00',
    },
  ],
  totalElements: 1,
  totalPages: 1,
  hasPrevious: false,
  hasNext: false,
}

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('getUpdateStoreNames', () => {
  it('스토어명 변경 요청 목록을 파싱해 result를 반환한다', async () => {
    server.use(
      http.get(`${BASE_URL}/api/v1/admin/stores`, () =>
        HttpResponse.json({
          code: 200,
          message: '성공',
          success: true,
          result: listResult,
        }),
      ),
    )

    const result = await getUpdateStoreNames({ page: 1 })

    expect(result.updateStoreNames).toHaveLength(1)
    expect(result.updateStoreNames[0]).toMatchObject({
      requestId: 1,
      currentName: '기존 스토어',
      newName: '변경된 스토어',
    })
  })

  it('success가 false면 message로 에러를 던진다', async () => {
    server.use(
      http.get(`${BASE_URL}/api/v1/admin/stores`, () =>
        HttpResponse.json({
          code: 400,
          message: '조회 실패',
          success: false,
          result: null,
        }),
      ),
    )

    await expect(getUpdateStoreNames()).rejects.toThrow('조회 실패')
  })
})

describe('approveUpdateStoreName', () => {
  it('requestId 경로로 PATCH approve를 호출한다', async () => {
    let requestedUrl = ''
    let method = ''
    server.use(
      http.patch(
        `${BASE_URL}/api/v1/admin/stores/:requestId/approve`,
        ({ request }) => {
          requestedUrl = request.url
          method = request.method
          return HttpResponse.json({
            code: 200,
            message: '성공',
            success: true,
          })
        },
      ),
    )

    await expect(approveUpdateStoreName(7)).resolves.toBeUndefined()
    expect(method).toBe('PATCH')
    expect(requestedUrl).toContain('/api/v1/admin/stores/7/approve')
  })

  it('success가 false면 에러를 던진다', async () => {
    server.use(
      http.patch(`${BASE_URL}/api/v1/admin/stores/:requestId/approve`, () =>
        HttpResponse.json({ code: 409, message: '승인 불가', success: false }),
      ),
    )

    await expect(approveUpdateStoreName(7)).rejects.toThrow('승인 불가')
  })
})

describe('rejectUpdateStoreName', () => {
  it('requestId 경로로 PATCH reject를 호출한다', async () => {
    let requestedUrl = ''
    server.use(
      http.patch(
        `${BASE_URL}/api/v1/admin/stores/:requestId/reject`,
        ({ request }) => {
          requestedUrl = request.url
          return HttpResponse.json({
            code: 200,
            message: '성공',
            success: true,
          })
        },
      ),
    )

    await expect(rejectUpdateStoreName(3)).resolves.toBeUndefined()
    expect(requestedUrl).toContain('/api/v1/admin/stores/3/reject')
  })

  it('success가 false면 에러를 던진다', async () => {
    server.use(
      http.patch(`${BASE_URL}/api/v1/admin/stores/:requestId/reject`, () =>
        HttpResponse.json({ code: 409, message: '거절 불가', success: false }),
      ),
    )

    await expect(rejectUpdateStoreName(3)).rejects.toThrow('거절 불가')
  })
})
