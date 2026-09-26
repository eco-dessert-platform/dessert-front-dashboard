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

// 셀러 axios는 withCredentials를 쓴다. 자격 증명이 있는 요청에는 와일드카드(*)가 적용되지 않고
// Authorization은 원래 와일드카드로 허용되지 않으므로, 요청 origin과 요청 헤더를 그대로 돌려준다
const corsHeaders = (route: Route) => {
  const headers = route.request().headers()
  return {
    'access-control-allow-origin': headers['origin'] ?? '*',
    'access-control-allow-credentials': 'true',
    'access-control-allow-methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    'access-control-allow-headers':
      headers['access-control-request-headers'] ?? 'authorization,content-type',
  }
}

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
 * 이후 mockApi로 등록한 라우트가 우선 적용된다.
 * Chromium은 가로챈 요청의 CORS preflight를 Playwright가 직접 처리하지만,
 * 다른 브라우저 엔진에 대비해 preflight가 넘어오면 여기서 응답한다.
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
