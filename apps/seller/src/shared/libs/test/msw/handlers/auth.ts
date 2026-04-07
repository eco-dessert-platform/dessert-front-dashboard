import { HttpResponse, http } from 'msw'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

// todos: 임의로 생성한 handler입니다. 추후 테스트가 필요한 handler로 변경 예정입니다.
export const authHandlers = [
  http.post(`${BASE_URL}/api/v1/sellers/login`, () => {
    return HttpResponse.json({
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
    })
  }),

  http.post(`${BASE_URL}/api/v1/sellers/logout`, () => {
    return new HttpResponse(null, { status: 204 })
  }),
]
