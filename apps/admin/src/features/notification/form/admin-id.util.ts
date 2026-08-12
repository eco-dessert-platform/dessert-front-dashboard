import { jwtDecode } from 'jwt-decode'

import { TOKEN_COOKIE_KEYS } from '@/shared/constant'
import { getCookie } from '@/shared/utils'

type AdminTokenPayload = {
  adminId?: number | string
  id?: number | string
  memberId?: number | string
  userId?: number | string
  sub?: number | string
}

const toPositiveNumber = (value: unknown) => {
  const parsed = Number(value)

  return Number.isInteger(parsed) && parsed > 0 ? parsed : null
}

export const getAdminIdFromAccessToken = () => {
  const accessToken = getCookie(TOKEN_COOKIE_KEYS.ACCESS)

  if (!accessToken) {
    throw new Error('로그인 정보가 없습니다.')
  }

  const payload = jwtDecode<AdminTokenPayload>(accessToken)
  const adminId =
    toPositiveNumber(payload.adminId) ??
    toPositiveNumber(payload.id) ??
    toPositiveNumber(payload.memberId) ??
    toPositiveNumber(payload.userId) ??
    toPositiveNumber(payload.sub)

  if (!adminId) {
    throw new Error('관리자 ID를 확인할 수 없습니다.')
  }

  return adminId
}
