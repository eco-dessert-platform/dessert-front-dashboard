import { jwtDecode } from 'jwt-decode'

export const setCookie = (name: string, value: string, expires?: Date) => {
  const exp = expires ?? new Date(Date.now() + 3600 * 1000)
  const isProduction = import.meta.env.PROD

  document.cookie = [
    `${name}=${encodeURIComponent(value)}`,
    `expires=${exp.toUTCString()}`,
    `path=/`,
    `SameSite=Lax`,
    isProduction ? 'Secure' : '',
  ]
    .filter(Boolean)
    .join('; ')
}

export const getCookie = (name: string): string | null => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}()[\]/+^])/g, '\\$1') + '=([^;]*)',
    ),
  )
  if (!matches) return null

  try {
    return decodeURIComponent(matches[1])
  } catch {
    return null
  }
}

export const deleteCookie = (name: string) => {
  const isProduction = import.meta.env.PROD

  document.cookie = [
    `${name}=`,
    `expires=Thu, 01 Jan 1970 00:00:00 UTC`,
    `path=/`,
    `SameSite=Lax`,
    isProduction ? 'Secure' : '',
  ]
    .filter(Boolean)
    .join('; ')
}

export const getExpFromToken = (token: string): Date => {
  const { exp } = jwtDecode<{ exp: number }>(token)

  if (typeof exp !== 'number' || !isFinite(exp) || exp <= 0) {
    throw new Error('유효하지 않은 exp 값')
  }

  return new Date(exp * 1000)
}
