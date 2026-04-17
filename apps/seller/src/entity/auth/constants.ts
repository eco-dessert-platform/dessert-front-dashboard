const baseURL = import.meta.env.VITE_PUBLIC_SERVER_URL

if (!baseURL) {
  throw new Error('VITE_PUBLIC_SERVER_URL 환경변수가 설정되지 않았습니다.')
}

const profile = import.meta.env.DEV ? 'local' : 'prod'

export const OAUTH_URLS = {
  google: `${baseURL}/api/v1/oauth/authorization/google?user=seller&profile=${profile}`,
  kakao: `${baseURL}/api/v1/oauth/authorization/kakao?user=seller&profile=${profile}`,
} as const
