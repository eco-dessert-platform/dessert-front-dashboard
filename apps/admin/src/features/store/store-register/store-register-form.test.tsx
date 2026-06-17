import { HttpResponse, http } from 'msw'

import { server } from '@/shared/libs/test/msw/server'
import { fireEvent, render, screen, waitFor } from '@/shared/libs/test/render'

import { StoreRegisterForm } from './store-register-form.ui'

const { toast } = vi.hoisted(() => ({
  toast: { success: vi.fn(), error: vi.fn() },
}))

vi.mock('@dessert/ui', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@dessert/ui')>()
  return { ...actual, toast }
})

const BASE_URL = import.meta.env.VITE_PUBLIC_SERVER_URL

const createdStore = {
  storeId: 1,
  name: '빵그리의 오븐',
  identifier: '1234567890',
  introduce: '건강한 디저트',
  profile: '',
  phoneNumber: '01012345678',
  subPhoneNumber: '',
  email: 'user@example.com',
  originAddress: '성남시 금광동 222-31',
  originAddressDetail: '',
}

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => {
  server.resetHandlers()
  vi.clearAllMocks()
})
afterAll(() => server.close())

function fillRequiredFields() {
  fireEvent.change(screen.getByPlaceholderText('스토어명을 입력하세요'), {
    target: { value: '빵그리의 오븐' },
  })
  fireEvent.change(screen.getByPlaceholderText('사업자등록번호를 입력하세요'), {
    target: { value: '1234567890' },
  })
  fireEvent.change(screen.getByPlaceholderText('스토어 소개를 입력하세요'), {
    target: { value: '건강한 디저트' },
  })
  fireEvent.change(screen.getByPlaceholderText('연락처를 입력하세요'), {
    target: { value: '01012345678' },
  })
  fireEvent.change(screen.getByPlaceholderText('이메일을 입력하세요'), {
    target: { value: 'user@example.com' },
  })
  fireEvent.change(screen.getByPlaceholderText('출고지 주소를 입력하세요'), {
    target: { value: '성남시 금광동 222-31' },
  })
}

describe('StoreRegisterForm', () => {
  it('필수값이 비어 있으면 에러 메시지를 보여주고 제출하지 않는다', async () => {
    let posted = false
    server.use(
      http.post(`${BASE_URL}/api/v1/admin/stores`, () => {
        posted = true
        return HttpResponse.json({
          success: true,
          code: 200,
          message: '성공',
          result: createdStore,
        })
      }),
    )
    render(<StoreRegisterForm />)

    fireEvent.click(screen.getByRole('button', { name: '스토어 등록' }))

    expect(
      await screen.findByText('스토어명을 입력하세요.'),
    ).toBeInTheDocument()
    expect(screen.getByText('사업자등록번호를 입력하세요.')).toBeInTheDocument()
    expect(
      screen.getByText('올바른 이메일 형식이 아닙니다.'),
    ).toBeInTheDocument()
    expect(posted).toBe(false)
    expect(toast.success).not.toHaveBeenCalled()
  })

  it('잘못된 이메일 형식이면 에러 메시지를 보여준다', async () => {
    render(<StoreRegisterForm />)
    fillRequiredFields()
    fireEvent.change(screen.getByPlaceholderText('이메일을 입력하세요'), {
      target: { value: 'not-an-email' },
    })

    fireEvent.click(screen.getByRole('button', { name: '스토어 등록' }))

    expect(
      await screen.findByText('올바른 이메일 형식이 아닙니다.'),
    ).toBeInTheDocument()
  })

  it('필수값을 채우면 스토어 생성 API를 호출하고 성공 토스트를 띄운다', async () => {
    let posted = false
    server.use(
      http.post(`${BASE_URL}/api/v1/admin/stores`, () => {
        posted = true
        return HttpResponse.json({
          success: true,
          code: 200,
          message: '성공',
          result: createdStore,
        })
      }),
    )
    render(<StoreRegisterForm />)
    fillRequiredFields()

    fireEvent.click(screen.getByRole('button', { name: '스토어 등록' }))

    await waitFor(() =>
      expect(toast.success).toHaveBeenCalledWith('스토어를 등록했습니다.'),
    )
    expect(posted).toBe(true)
  })

  it('서버가 실패를 반환하면 에러 토스트를 띄운다', async () => {
    server.use(
      http.post(`${BASE_URL}/api/v1/admin/stores`, () =>
        HttpResponse.json({
          success: false,
          code: 400,
          message: '등록 실패',
        }),
      ),
    )
    render(<StoreRegisterForm />)
    fillRequiredFields()

    fireEvent.click(screen.getByRole('button', { name: '스토어 등록' }))

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        '스토어 등록에 실패했습니다.',
        '다시 시도해주세요.',
      ),
    )
  })
})
