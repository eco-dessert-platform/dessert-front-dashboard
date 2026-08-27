import { jwtDecode } from 'jwt-decode'

import { TOKEN_COOKIE_KEYS } from '@/shared/constant'
import { getCookie } from '@/shared/utils/cookieUtils'

/**
 * 공지사항 등록 API가 경로에 관리자 ID를 요구하는데 로그인 응답에는 없다.
 * 액세스 토큰에서 꺼내 쓰며, 페이로드의 실제 키를 확인하면 이 목록을 정리한다.
 */
const ADMIN_ID_CLAIMS = ['adminId', 'memberId', 'userId', 'sub'] as const

type AdminTokenPayload = Partial<
  Record<(typeof ADMIN_ID_CLAIMS)[number], unknown>
>

export const getAdminIdFromToken = (): number | null => {
  const token = getCookie(TOKEN_COOKIE_KEYS.ACCESS)
  if (!token) return null

  let payload: AdminTokenPayload
  try {
    payload = jwtDecode<AdminTokenPayload>(token)
  } catch {
    return null
  }

  for (const claim of ADMIN_ID_CLAIMS) {
    const value = payload[claim]
    const parsed = Number(value)
    if (value != null && value !== '' && Number.isInteger(parsed)) {
      return parsed
    }
  }

  return null
}
