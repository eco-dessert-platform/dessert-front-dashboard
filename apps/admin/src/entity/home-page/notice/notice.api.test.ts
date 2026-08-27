import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import {
  createNotice,
  deleteNotices,
  getNoticeDetail,
  getNotices,
  updateNotice,
} from './notice.api'

const BASE_URL = import.meta.env.VITE_PUBLIC_SERVER_URL
const NOTICE_URL = `${BASE_URL}/api/v1/admin/notifications`

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

describe('공지사항 목록 조회', () => {
  it('페이지 정보와 항목을 반환한다', async () => {
    server.use(
      http.get(NOTICE_URL, () =>
        HttpResponse.json(
          wrap({
            content: [
              {
                noticeId: 7,
                title: '서버 점검 안내',
                createAt: '2025-10-31T00:00:00',
                modifiedAt: '2025-10-31T00:00:00',
              },
            ],
            page: 0,
            size: 20,
            totalPages: 1,
            totalElements: 1,
          }),
        ),
      ),
    )

    const result = await getNotices({ page: 0, size: 20 })

    expect(result.totalElements).toBe(1)
    expect(result.content[0].noticeId).toBe(7)
  })

  it('success가 false면 메시지로 실패한다', async () => {
    server.use(
      http.get(NOTICE_URL, () =>
        HttpResponse.json({
          success: false,
          code: 400,
          message: '조회에 실패했습니다',
        }),
      ),
    )

    await expect(getNotices()).rejects.toThrow('조회에 실패했습니다')
  })
})

describe('공지사항 단건 조회', () => {
  it('본문과 이미지 목록을 반환한다', async () => {
    server.use(
      http.get(`${NOTICE_URL}/7`, () =>
        HttpResponse.json(
          wrap({
            noticeId: 7,
            title: '서버 점검 안내',
            content: '<p>내용</p>',
            imageLinks: ['https://cdn.example.com/a.png'],
            createAt: '2025-10-31T00:00:00',
            modifiedAt: '2025-10-31T00:00:00',
          }),
        ),
      ),
    )

    const result = await getNoticeDetail(7)

    expect(result.content).toBe('<p>내용</p>')
    expect(result.imageLinks).toHaveLength(1)
  })

  it('imageLinks가 없으면 빈 배열로 채운다', async () => {
    server.use(
      http.get(`${NOTICE_URL}/7`, () =>
        HttpResponse.json(
          wrap({
            noticeId: 7,
            title: '제목',
            content: '<p>내용</p>',
            createAt: '2025-10-31T00:00:00',
            modifiedAt: '2025-10-31T00:00:00',
          }),
        ),
      ),
    )

    const result = await getNoticeDetail(7)

    expect(result.imageLinks).toEqual([])
  })
})

describe('공지사항 등록', () => {
  it('request는 JSON 파트로, 이미지는 파일 파트로 보낸다', async () => {
    let sentRequest: string | null = null
    let sentImageNames: string[] = []
    let sentContentType: string | null = null

    server.use(
      http.post(`${NOTICE_URL}/3/register`, async ({ request }) => {
        sentContentType = request.headers.get('content-type')
        const formData = await request.formData()
        sentRequest = await new Response(formData.get('request') as Blob).text()
        sentImageNames = formData
          .getAll('profileImage')
          .map((entry) => (entry as File).name)

        return HttpResponse.json(
          wrap({
            id: 10,
            title: '제목',
            content: '<p>내용</p>',
            imageLinks: [],
            createAt: '2025-10-31T00:00:00',
            modifiedAt: '2025-10-31T00:00:00',
          }),
        )
      }),
    )

    await createNotice({
      adminId: 3,
      request: { title: '제목', content: '<p>내용</p>' },
      images: [new File(['x'], 'shot.png', { type: 'image/png' })],
    })

    expect(JSON.parse(sentRequest!)).toEqual({
      title: '제목',
      content: '<p>내용</p>',
    })
    expect(sentImageNames).toEqual(['shot.png'])
    expect(sentContentType).toMatch(/^multipart\/form-data/)
  })
})

describe('공지사항 수정', () => {
  it('noticeId 경로로 보낸다', async () => {
    let called = false

    server.use(
      http.put(`${NOTICE_URL}/7`, async () => {
        called = true
        return HttpResponse.json(
          wrap({
            id: 7,
            title: '수정',
            content: '<p>내용</p>',
            imageLinks: [],
            createAt: '2025-10-31T00:00:00',
            modifiedAt: '2025-10-31T00:00:00',
          }),
        )
      }),
    )

    await updateNotice({
      noticeId: 7,
      request: { title: '수정', content: '<p>내용</p>' },
    })

    expect(called).toBe(true)
  })
})

describe('공지사항 다중 삭제', () => {
  it('ID 배열을 본문으로 보내고 부분 실패 결과를 반환한다', async () => {
    let sentBody: unknown = null

    server.use(
      http.delete(NOTICE_URL, async ({ request }) => {
        sentBody = await request.json()
        return HttpResponse.json(
          wrap({
            successCount: 1,
            failureCount: 1,
            failedNotices: [{ id: 2, title: '삭제 실패 공지' }],
          }),
        )
      }),
    )

    const result = await deleteNotices([1, 2])

    expect(sentBody).toEqual([1, 2])
    expect(result.failureCount).toBe(1)
    expect(result.failedNotices[0].title).toBe('삭제 실패 공지')
  })
})
