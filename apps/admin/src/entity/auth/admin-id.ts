import { jwtDecode } from 'jwt-decode'

import { TOKEN_COOKIE_KEYS } from '@/shared/constant'
import { getCookie } from '@/shared/utils/cookieUtils'

/**
 * 공지사항 등록 API가 경로에 관리자 ID를 요구하는데 로그인 응답에는 없다.
 * 백엔드는 액세스 토큰의 `id` 클레임에 관리자 ID를 담는다 (TokenProvider USER_KEY).
 */
type AdminTokenPayload = { id?: unknown }

export const getAdminIdFromToken = (): number | null => {
  const token = getCookie(TOKEN_COOKIE_KEYS.ACCESS)
  if (!token) return null

  let payload: AdminTokenPayload | null
  try {
    payload = jwtDecode<AdminTokenPayload>(token)
  } catch {
    return null
  }

  if (typeof payload !== 'object' || payload === null) return null

  const { id } = payload
  return typeof id === 'number' && Number.isInteger(id) ? id : null
}
