import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import {
  deleteAdminProductOptions,
  deleteAdminProducts,
  editAdminProductOptionStock,
  getAdminProducts,
} from './management-all.api'

const BASE_URL = import.meta.env.VITE_PUBLIC_SERVER_URL
const PRODUCTS_URL = `${BASE_URL}/api/v1/admin/products`

const server = setupServer()

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const ok = { success: true, code: 200, message: 'OK' }

describe('전체 상품 목록 조회', () => {
  it('페이지·크기·정렬 파라미터를 보내고 상품과 옵션 목록을 반환한다', async () => {
    let query = new URLSearchParams()
    server.use(
      http.get(PRODUCTS_URL, ({ request }) => {
        query = new URL(request.url).searchParams
        return HttpResponse.json({
          ...ok,
          fieldErrors: [],
          result: {
            content: [
              {
                productId: 1,
                storeId: 31,
                storeName: '빵그리 베이커리',
                productName: '쌀식빵',
                productPrice: 12000,
                productOptions: [
                  {
                    optionId: 101,
                    optionName: '기본',
                    price: 12000,
                    stock: 5,
                    tags: ['GLUTEN_FREE'],
                  },
                ],
              },
            ],
            page: 1,
            size: 5,
            totalPages: 1,
            totalElements: 1,
          },
        })
      }),
    )

    const result = await getAdminProducts({
      page: 1,
      size: 5,
      sort: ['productId,desc'],
    })

    expect(query.get('page')).toBe('1')
    expect(query.getAll('sort')).toEqual(['productId,desc'])
    expect(result.content[0].productOptions[0].stock).toBe(5)
  })

  it('실패 응답이면 서버 메시지로 에러를 던진다', async () => {
    server.use(
      http.get(PRODUCTS_URL, () =>
        HttpResponse.json({
          success: false,
          code: 500,
          message: '상품 조회에 실패했습니다.',
          result: null,
        }),
      ),
    )

    await expect(getAdminProducts()).rejects.toThrow(
      '상품 조회에 실패했습니다.',
    )
  })
})

describe('상품 다중 삭제', () => {
  it('상품 ID 목록을 같은 이름의 쿼리 파라미터로 반복해 보낸다', async () => {
    let productIds: string[] = []
    server.use(
      http.delete(PRODUCTS_URL, ({ request }) => {
        productIds = new URL(request.url).searchParams.getAll('productIds')
        return HttpResponse.json(ok)
      }),
    )

    await deleteAdminProducts({ productIds: [1, 2] })

    expect(productIds).toEqual(['1', '2'])
  })
})

describe('상품 옵션 삭제', () => {
  it('전체 삭제는 removeAll만 본문으로 보낸다', async () => {
    let body: unknown
    server.use(
      http.delete(`${PRODUCTS_URL}/1/options`, async ({ request }) => {
        body = await request.json()
        return HttpResponse.json(ok)
      }),
    )

    await deleteAdminProductOptions({ productId: 1, body: { removeAll: true } })

    expect(body).toEqual({ removeAll: true })
  })

  it('일부 삭제는 옵션 ID 목록을 함께 보낸다', async () => {
    let body: unknown
    server.use(
      http.delete(`${PRODUCTS_URL}/1/options`, async ({ request }) => {
        body = await request.json()
        return HttpResponse.json(ok)
      }),
    )

    await deleteAdminProductOptions({
      productId: 1,
      body: { removeAll: false, optionIds: [101, 102] },
    })

    expect(body).toEqual({ removeAll: false, optionIds: [101, 102] })
  })

  it('실패 응답이면 서버 메시지로 에러를 던진다', async () => {
    server.use(
      http.delete(`${PRODUCTS_URL}/1/options`, () =>
        HttpResponse.json({
          success: false,
          code: 400,
          message: '삭제할 옵션이 없습니다.',
        }),
      ),
    )

    await expect(
      deleteAdminProductOptions({ productId: 1, body: { removeAll: true } }),
    ).rejects.toThrow('삭제할 옵션이 없습니다.')
  })
})

describe('옵션 재고 변경', () => {
  it('증감은 변경 유형과 수량을 옵션 경로로 보낸다', async () => {
    let body: unknown
    server.use(
      http.patch(
        `${BASE_URL}/api/v1/admin/options/101/stock`,
        async ({ request }) => {
          body = await request.json()
          return HttpResponse.json(ok)
        },
      ),
    )

    await editAdminProductOptionStock({
      optionId: 101,
      body: { editStockFlag: 'DECREASE', amount: 2 },
    })

    expect(body).toEqual({ editStockFlag: 'DECREASE', amount: 2 })
  })

  it('품절 처리는 수량 없이 변경 유형만 보낸다', async () => {
    let body: unknown
    server.use(
      http.patch(
        `${BASE_URL}/api/v1/admin/options/101/stock`,
        async ({ request }) => {
          body = await request.json()
          return HttpResponse.json(ok)
        },
      ),
    )

    await editAdminProductOptionStock({
      optionId: 101,
      body: { editStockFlag: 'SOLDOUT' },
    })

    expect(body).toEqual({ editStockFlag: 'SOLDOUT' })
  })
})
