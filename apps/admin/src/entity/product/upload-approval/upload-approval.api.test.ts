import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import { decideUploadApproval, getUploadApprovals } from './upload-approval.api'
import {
  DecideUploadApprovalRequestSchema,
  RejectBodySchema,
} from './upload-approval.contract'

const BASE_URL = import.meta.env.VITE_PUBLIC_SERVER_URL
const PRODUCTS_URL = `${BASE_URL}/api/v1/admin/products`

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

describe('업로드 승인 대기 목록 조회', () => {
  it('페이지·크기 파라미터를 보내고 목록을 반환한다', async () => {
    let query = new URLSearchParams()
    server.use(
      http.get(`${PRODUCTS_URL}/upload-approvals`, ({ request }) => {
        query = new URL(request.url).searchParams
        return HttpResponse.json(
          wrap({
            content: [
              {
                boardId: 7,
                storeName: '빵그리 베이커리',
                boardTitle: '쌀식빵',
              },
            ],
            page: 0,
            size: 10,
            totalPages: 1,
            totalElements: 1,
          }),
        )
      }),
    )

    const result = await getUploadApprovals({ page: 0, size: 10 })

    expect(query.get('page')).toBe('0')
    expect(query.get('size')).toBe('10')
    expect(result.content[0]).toEqual({
      boardId: 7,
      storeName: '빵그리 베이커리',
      boardTitle: '쌀식빵',
    })
  })

  it('실패 응답이면 서버 메시지로 에러를 던진다', async () => {
    server.use(
      http.get(`${PRODUCTS_URL}/upload-approvals`, () =>
        HttpResponse.json({
          success: false,
          code: 403,
          message: '권한이 없습니다.',
          result: null,
        }),
      ),
    )

    await expect(getUploadApprovals()).rejects.toThrow('권한이 없습니다.')
  })
})

describe('업로드 상품 승인·거절 결정', () => {
  it('승인은 결정 유형만 게시글 경로로 보낸다', async () => {
    let body: unknown
    server.use(
      http.post(`${PRODUCTS_URL}/7/decision`, async ({ request }) => {
        body = await request.json()
        return HttpResponse.json({ success: true, code: 200, message: 'OK' })
      }),
    )

    await decideUploadApproval(7, { decisionType: 'APPROVE' })

    expect(body).toEqual({ decisionType: 'APPROVE' })
  })

  it('거절은 거절 카테고리와 사유를 함께 보낸다', async () => {
    let body: unknown
    server.use(
      http.post(`${PRODUCTS_URL}/7/decision`, async ({ request }) => {
        body = await request.json()
        return HttpResponse.json({ success: true, code: 200, message: 'OK' })
      }),
    )

    await decideUploadApproval(7, {
      decisionType: 'REJECT',
      rejectCategory: 'CONTAINS_ADVERTISING',
      rejectReason: '상품명에 광고 문구가 있습니다.',
    })

    expect(body).toEqual({
      decisionType: 'REJECT',
      rejectCategory: 'CONTAINS_ADVERTISING',
      rejectReason: '상품명에 광고 문구가 있습니다.',
    })
  })

  it('실패 응답이면 서버 메시지로 에러를 던진다', async () => {
    server.use(
      http.post(`${PRODUCTS_URL}/7/decision`, () =>
        HttpResponse.json({
          success: false,
          code: 409,
          message: '이미 처리된 게시글입니다.',
        }),
      ),
    )

    await expect(
      decideUploadApproval(7, { decisionType: 'APPROVE' }),
    ).rejects.toThrow('이미 처리된 게시글입니다.')
  })
})

describe('거절 사유 검증', () => {
  it('카테고리를 고르지 않으면 안내 문구로 거부한다', () => {
    const result = RejectBodySchema.safeParse({ rejectReason: '사유' })

    expect(result.error?.issues[0].message).toBe(
      '거절 카테고리를 선택해주세요.',
    )
  })

  it('공백뿐인 사유와 500자를 넘는 사유를 거부한다', () => {
    const blank = RejectBodySchema.safeParse({
      rejectCategory: 'DIRECT_INPUT',
      rejectReason: '   ',
    })
    const tooLong = RejectBodySchema.safeParse({
      rejectCategory: 'DIRECT_INPUT',
      rejectReason: '가'.repeat(501),
    })

    expect(blank.error?.issues[0].message).toBe('거절 사유를 입력해주세요.')
    expect(tooLong.error?.issues[0].message).toBe(
      '거절 사유는 500자 이하로 입력해주세요.',
    )
  })

  it('거절 결정에는 카테고리와 사유가 모두 있어야 한다', () => {
    expect(
      DecideUploadApprovalRequestSchema.safeParse({ decisionType: 'REJECT' })
        .success,
    ).toBe(false)
    expect(
      DecideUploadApprovalRequestSchema.safeParse({ decisionType: 'APPROVE' })
        .success,
    ).toBe(true)
  })
})
