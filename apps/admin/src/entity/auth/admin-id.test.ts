import { afterEach, describe, expect, it } from 'vitest'

import { TOKEN_COOKIE_KEYS } from '@/shared/constant'

import { getAdminIdFromToken } from './admin-id'

const base64Url = (value: object) =>
  btoa(JSON.stringify(value))
    .replace(/=+$/, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')

const makeToken = (payload: object) =>
  `${base64Url({ typ: 'JWT', alg: 'HS256' })}.${base64Url(payload)}.signature`

const setAccessToken = (token: string) => {
  document.cookie = `${TOKEN_COOKIE_KEYS.ACCESS}=${encodeURIComponent(token)}; path=/`
}

afterEach(() => {
  document.cookie = `${TOKEN_COOKIE_KEYS.ACCESS}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
})

describe('getAdminIdFromToken', () => {
  it('백엔드 토큰의 id 클레임에서 관리자 ID를 꺼낸다', () => {
    setAccessToken(
      makeToken({
        iss: 'bbangle',
        iat: 1_700_000_000,
        exp: 1_700_010_800,
        id: 3,
        role: 'ROLE_ADMIN',
      }),
    )

    expect(getAdminIdFromToken()).toBe(3)
  })

  it('id 클레임이 없으면 null을 반환한다', () => {
    setAccessToken(makeToken({ sub: '3', role: 'ROLE_ADMIN' }))

    expect(getAdminIdFromToken()).toBeNull()
  })

  it('토큰이 없거나 JWT 형식이 아니면 null을 반환한다', () => {
    expect(getAdminIdFromToken()).toBeNull()

    setAccessToken('not-a-jwt')
    expect(getAdminIdFromToken()).toBeNull()
  })
})
