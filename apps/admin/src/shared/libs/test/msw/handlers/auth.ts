import { HttpResponse, http } from 'msw'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

export const authHandlers = [
  http.post(`${BASE_URL}/api/v1/admins/login`, () => {
    return HttpResponse.json({
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
    })
  }),

  http.post(`${BASE_URL}/api/v1/admins/logout`, () => {
    return new HttpResponse(null, { status: 204 })
  }),
]
