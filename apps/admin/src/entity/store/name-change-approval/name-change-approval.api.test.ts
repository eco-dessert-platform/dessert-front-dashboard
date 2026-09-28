import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import {
  approveUpdateStoreNameRequest,
  getUpdateStoreNameRequests,
  rejectUpdateStoreNameRequest,
} from './name-change-approval.api'

const BASE_URL = import.meta.env.VITE_PUBLIC_SERVER_URL
const STORES_URL = `${BASE_URL}/api/v1/admin/stores`

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

describe('스토어명 변경 요청 목록 조회', () => {
  it('페이지 파라미터를 보내고 요청 목록을 반환한다', async () => {
    let page: string | null = null
    server.use(
      http.get(STORES_URL, ({ request }) => {
        page = new URL(request.url).searchParams.get('page')
        return HttpResponse.json(
          wrap({
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
        )
      }),
    )

    const result = await getUpdateStoreNameRequests({ page: 3 })

    expect(page).toBe('3')
    expect(result.updateStoreNames[0].newName).toBe('빵그리 오븐')
  })

  it('실패 응답이면 서버 메시지로 에러를 던진다', async () => {
    server.use(
      http.get(STORES_URL, () =>
        HttpResponse.json({
          success: false,
          code: 403,
          message: '권한이 없습니다.',
          result: null,
        }),
      ),
    )

    await expect(getUpdateStoreNameRequests()).rejects.toThrow(
      '권한이 없습니다.',
    )
  })
})

describe('스토어명 변경 승인', () => {
  it('요청 ID를 경로에 담아 본문 없이 PATCH한다', async () => {
    let hasBody = true
    server.use(
      http.patch(`${STORES_URL}/5/approve`, async ({ request }) => {
        hasBody = (await request.text()).length > 0
        return HttpResponse.json(
          wrap({
            storeId: 31,
            prevName: '빵그리 베이커리',
            updateName: '빵그리 오븐',
            status: 'APPROVE',
            modifiedAt: '2026-09-02T10:00:00',
          }),
        )
      }),
    )

    const result = await approveUpdateStoreNameRequest(5)

    expect(hasBody).toBe(false)
    expect(result.status).toBe('APPROVE')
    expect(result.updateName).toBe('빵그리 오븐')
  })
})

describe('스토어명 변경 거절', () => {
  it('거절 사유 카테고리와 상세 사유를 PATCH 본문으로 보낸다', async () => {
    let body: unknown
    server.use(
      http.patch(`${STORES_URL}/5/reject`, async ({ request }) => {
        body = await request.json()
        return HttpResponse.json(
          wrap({
            requestId: 5,
            storeId: 31,
            currentName: '빵그리 베이커리',
            newName: '빵그리 오븐',
            status: 'REJECT',
            category: 'ETC',
            rejectDetail: '스토어 성격과 맞지 않는 이름입니다.',
          }),
        )
      }),
    )

    const result = await rejectUpdateStoreNameRequest(5, {
      category: 'ETC',
      rejectDetail: '스토어 성격과 맞지 않는 이름입니다.',
    })

    expect(body).toEqual({
      category: 'ETC',
      rejectDetail: '스토어 성격과 맞지 않는 이름입니다.',
    })
    expect(result.status).toBe('REJECT')
  })

  it('정해진 카테고리가 아닌 거절 사유가 오면 에러를 던진다', async () => {
    server.use(
      http.patch(`${STORES_URL}/5/reject`, () =>
        HttpResponse.json(
          wrap({
            requestId: 5,
            storeId: 31,
            currentName: '빵그리 베이커리',
            newName: '빵그리 오븐',
            status: 'REJECT',
            category: 'UNKNOWN_CATEGORY',
            rejectDetail: '',
          }),
        ),
      ),
    )

    await expect(
      rejectUpdateStoreNameRequest(5, {
        category: 'BRAND_NAME_MISUSE',
        rejectDetail: null,
      }),
    ).rejects.toThrow()
  })
})
