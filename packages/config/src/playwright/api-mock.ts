import type { Page, Route } from '@playwright/test'

/**
 * E2E 실행 시 앱의 API 서버 주소. 실제로 존재하지 않는 호스트라서
 * 모킹하지 않은 요청이 실서버로 새어 나갈 수 없다.
 */
export const E2E_API_URL = 'http://api.e2e.test'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface MockResponse {
  status?: number
  json: unknown
}

// 셀러 axios는 withCredentials를 쓰므로 와일드카드 대신 요청 origin을 그대로 허용해야 한다
const corsHeaders = (route: Route) => ({
  'access-control-allow-origin': route.request().headers()['origin'] ?? '*',
  'access-control-allow-credentials': 'true',
  'access-control-allow-methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  'access-control-allow-headers': '*',
})

/** 백엔드 공통 성공 응답 형태로 감싼다. */
export const apiSuccess = <T>(result: T) => ({
  success: true,
  code: 200,
  message: 'OK',
  fieldErrors: [],
  result,
})

/**
 * 모킹하지 않은 API 요청을 501로 막는다. 테스트마다 가장 먼저 등록하고,
 * 이후 mockApi로 등록한 라우트가 우선 적용된다. CORS preflight도 여기서 응답한다.
 */
export async function blockUnmockedApi(
  page: Page,
  onUnmocked?: (request: string) => void,
) {
  await page.route(`${E2E_API_URL}/**`, (route) => {
    const request = route.request()
    if (request.method() === 'OPTIONS') {
      return route.fulfill({ status: 204, headers: corsHeaders(route) })
    }

    onUnmocked?.(`${request.method()} ${request.url()}`)
    return route.fulfill({
      status: 501,
      headers: corsHeaders(route),
      json: {
        success: false,
        code: 501,
        message: 'E2E: 모킹되지 않은 API 요청입니다.',
        fieldErrors: [],
        result: null,
      },
    })
  })
}

/** 경로(쿼리 제외)와 메서드가 일치하는 API 요청에 고정 응답을 돌려준다. */
export async function mockApi(
  page: Page,
  method: HttpMethod,
  path: string,
  { status = 200, json }: MockResponse,
) {
  await page.route(
    (url) => url.origin === E2E_API_URL && url.pathname === path,
    (route) => {
      if (route.request().method() !== method) return route.fallback()
      return route.fulfill({ status, headers: corsHeaders(route), json })
    },
  )
}

const toBase64Url = (value: object) =>
  Buffer.from(JSON.stringify(value)).toString('base64url')

/**
 * 서명 검증 없이 디코딩만 하는 프론트용 가짜 JWT.
 * 백엔드 TokenProvider와 같이 `id`, `role` 클레임과 만료(`exp`)를 담는다.
 */
export function createFakeJwt(
  claims: Record<string, unknown>,
  expiresInSeconds = 60 * 60,
) {
  const now = Math.floor(Date.now() / 1000)
  const payload = {
    iss: 'e2e',
    iat: now,
    exp: now + expiresInSeconds,
    ...claims,
  }
  return `${toBase64Url({ typ: 'JWT', alg: 'HS256' })}.${toBase64Url(payload)}.e2e-signature`
}
