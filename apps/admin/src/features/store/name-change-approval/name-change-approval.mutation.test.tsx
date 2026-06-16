import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { HttpResponse, http } from 'msw'

import { nameChangeApprovalQueries } from '@/entity/store/name-change-approval'
import { server } from '@/shared/libs/test/msw/server'

import {
  useApproveUpdateStoreNameMutation,
  useRejectUpdateStoreNameMutation,
} from './name-change-approval.mutation'

import type { ReactNode } from 'react'

const { toast } = vi.hoisted(() => ({
  toast: { success: vi.fn(), error: vi.fn() },
}))

vi.mock('@dessert/ui', () => ({ toast }))

const BASE_URL = import.meta.env.VITE_PUBLIC_SERVER_URL

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => {
  server.resetHandlers()
  vi.clearAllMocks()
})
afterAll(() => server.close())

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false }, queries: { retry: false } },
  })
  const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries')
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
  return { wrapper, invalidateSpy }
}

describe('useApproveUpdateStoreNameMutation', () => {
  it('성공 시 성공 토스트를 띄우고 목록 쿼리를 무효화한다', async () => {
    server.use(
      http.patch(`${BASE_URL}/api/v1/admin/stores/:requestId/approve`, () =>
        HttpResponse.json({ code: 200, message: '성공', success: true }),
      ),
    )
    const { wrapper, invalidateSpy } = createWrapper()
    const { result } = renderHook(() => useApproveUpdateStoreNameMutation(), {
      wrapper,
    })

    result.current.mutate(7)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(toast.success).toHaveBeenCalledWith(
      '스토어명 변경 요청을 승인했습니다.',
    )
    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: nameChangeApprovalQueries.all(),
    })
  })

  it('실패 시 에러 토스트를 띄운다', async () => {
    server.use(
      http.patch(`${BASE_URL}/api/v1/admin/stores/:requestId/approve`, () =>
        HttpResponse.json({ code: 409, message: '승인 불가', success: false }),
      ),
    )
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useApproveUpdateStoreNameMutation(), {
      wrapper,
    })

    result.current.mutate(7)

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(toast.error).toHaveBeenCalledWith(
      '승인에 실패했습니다.',
      '다시 시도해주세요.',
    )
  })
})

describe('useRejectUpdateStoreNameMutation', () => {
  it('성공 시 거절 토스트를 띄우고 목록 쿼리를 무효화한다', async () => {
    server.use(
      http.patch(`${BASE_URL}/api/v1/admin/stores/:requestId/reject`, () =>
        HttpResponse.json({ code: 200, message: '성공', success: true }),
      ),
    )
    const { wrapper, invalidateSpy } = createWrapper()
    const { result } = renderHook(() => useRejectUpdateStoreNameMutation(), {
      wrapper,
    })

    result.current.mutate(3)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(toast.success).toHaveBeenCalledWith(
      '스토어명 변경 요청을 거절했습니다.',
    )
    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: nameChangeApprovalQueries.all(),
    })
  })

  it('실패 시 에러 토스트를 띄운다', async () => {
    server.use(
      http.patch(`${BASE_URL}/api/v1/admin/stores/:requestId/reject`, () =>
        HttpResponse.json({ code: 409, message: '거절 불가', success: false }),
      ),
    )
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useRejectUpdateStoreNameMutation(), {
      wrapper,
    })

    result.current.mutate(3)

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(toast.error).toHaveBeenCalledWith(
      '거절에 실패했습니다.',
      '다시 시도해주세요.',
    )
  })
})
