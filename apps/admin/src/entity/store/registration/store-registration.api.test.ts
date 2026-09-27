import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import {
  createAdminStore,
  deleteAdminStores,
  getRegisteredStores,
  updateAdminStore,
} from './store-registration.api'

import type { CreateAdminStoreRequest } from './store-registration.type'

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

const request: CreateAdminStoreRequest = {
  storeName: '빵그리 베이커리',
  identifier: '1234567891',
  introduce: '건강한 디저트를 만듭니다',
  phoneNumber: '01012345678',
  subPhoneNumber: null,
  email: 'store@example.com',
  originAddress: '(04790) 서울시 성동구',
  originAddressDetail: '1층',
}

const storeDetail = {
  storeId: 31,
  name: '빵그리 베이커리',
  identifier: '1234567891',
  introduce: '건강한 디저트를 만듭니다',
  profile: 'https://cdn.example.com/store/31.png',
  phoneNumber: '01012345678',
  subPhoneNumber: '',
  email: 'store@example.com',
  originAddress: '(04790) 서울시 성동구',
  originAddressDetail: '1층',
}

describe('등록된 스토어 목록 조회', () => {
  it('페이지·크기·정렬 파라미터를 보내고 목록을 반환한다', async () => {
    let query = ''
    server.use(
      http.get(`${STORES_URL}/registered`, ({ request }) => {
        query = new URL(request.url).search
        return HttpResponse.json(
          wrap({
            content: [
              {
                storeId: 31,
                storeName: '빵그리 베이커리',
                businessNumber: '1234567891',
                introduce: '건강한 디저트를 만듭니다',
                phoneNumber: '01012345678',
                subPhoneNumber: '',
                email: 'store@example.com',
                originAddressLine: '(04790) 서울시 성동구',
                originAddressDetail: '1층',
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

    const result = await getRegisteredStores({
      page: 0,
      size: 10,
      sort: ['storeId,desc'],
    })

    expect(new URLSearchParams(query).get('size')).toBe('10')
    expect(new URLSearchParams(query).getAll('sort')).toEqual(['storeId,desc'])
    expect(result.content[0].storeName).toBe('빵그리 베이커리')
  })
})

describe('스토어 등록', () => {
  it('요청 정보는 JSON 파트, 프로필 이미지는 파일 파트로 보낸다', async () => {
    let requestPart: unknown
    let profilePart: FormDataEntryValue | null = null
    server.use(
      http.post(STORES_URL, async ({ request: httpRequest }) => {
        const formData = await httpRequest.formData()
        const requestBlob = formData.get('request') as Blob
        requestPart = JSON.parse(await requestBlob.text())
        profilePart = formData.get('profileImage')
        return HttpResponse.json(wrap(storeDetail))
      }),
    )

    const profileImage = new File(['png-bytes'], 'profile.png', {
      type: 'image/png',
    })
    const result = await createAdminStore({ request, profileImage })

    expect(requestPart).toEqual(request)
    expect(profilePart).toBeInstanceOf(File)
    expect((profilePart as unknown as File).name).toBe('profile.png')
    expect(result.storeId).toBe(31)
  })

  it('실패 응답이면 서버 메시지로 에러를 던진다', async () => {
    server.use(
      http.post(STORES_URL, () =>
        HttpResponse.json({
          success: false,
          code: 409,
          message: '이미 등록된 사업자등록번호입니다.',
          result: null,
        }),
      ),
    )

    await expect(
      createAdminStore({
        request,
        profileImage: new File(['png'], 'profile.png', { type: 'image/png' }),
      }),
    ).rejects.toThrow('이미 등록된 사업자등록번호입니다.')
  })
})

describe('스토어 수정', () => {
  it('스토어 ID를 경로에 담아 수정 정보를 PATCH 본문으로 보낸다', async () => {
    let body: unknown
    server.use(
      http.patch(`${STORES_URL}/31`, async ({ request: httpRequest }) => {
        body = await httpRequest.json()
        return HttpResponse.json(wrap(storeDetail))
      }),
    )

    const result = await updateAdminStore({ storeId: 31, body: request })

    expect(body).toEqual(request)
    expect(result.name).toBe('빵그리 베이커리')
  })
})

describe('스토어 다중 삭제', () => {
  it('스토어 ID 목록을 같은 이름의 쿼리 파라미터로 반복해 보낸다', async () => {
    let storeIds: string[] = []
    server.use(
      http.delete(STORES_URL, ({ request: httpRequest }) => {
        storeIds = new URL(httpRequest.url).searchParams.getAll('storeIds')
        return HttpResponse.json({ success: true, code: 200, message: 'OK' })
      }),
    )

    await deleteAdminStores({ storeIds: [31, 32] })

    expect(storeIds).toEqual(['31', '32'])
  })

  it('실패 응답이면 서버 메시지로 에러를 던진다', async () => {
    server.use(
      http.delete(STORES_URL, () =>
        HttpResponse.json({
          success: false,
          code: 400,
          message: '삭제할 수 없는 스토어가 있습니다.',
        }),
      ),
    )

    await expect(deleteAdminStores({ storeIds: [31] })).rejects.toThrow(
      '삭제할 수 없는 스토어가 있습니다.',
    )
  })
})
