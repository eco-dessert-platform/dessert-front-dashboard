import { Button, Input, LogoHeader, toast } from '@dessert/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import {
  AuthLoginImage,
  LoginFooter,
  LoginFormValues,
  loginSchema,
  useAdminLoginMutation,
} from '@/features/auth'

const AuthPage = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  })

  const { mutate, isPending } = useAdminLoginMutation()
  const onSubmit = (data: LoginFormValues) => {
    mutate(data, {
      onSuccess: () => {
        toast.success('로그인 성공했어요')
        navigate('/', { replace: true })
      },
      onError: () => {
        toast.error('로그인 정보를 확인하세요', '아이디/비밀번호를 확인하세요')
      },
    })
  }
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-50">
      <LogoHeader />
      <main className="flex flex-1 flex-col items-center justify-center overflow-hidden p-6">
        <div className="w-full max-w-[1048px]">
          <div className="flex flex-1 items-center gap-4 self-stretch overflow-hidden rounded-20 border border-gray-200 bg-white p-2.5">
            <AuthLoginImage className="hidden max-h-[746px] max-w-[595px] lg:block" />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-1 flex-col justify-center gap-3.75 px-5 py-10 lg:py-0"
            >
              <div className="flex flex-col items-start gap-1">
                <h1 className="typo-heading-18-b text-gray-900">
                  🎉 환영합니다
                </h1>
                <p className="typo-title-16-m whitespace-pre-wrap text-gray-900">
                  빵그리의 오븐{' '}
                  <span className="text-primary-500">어드민 채널</span>
                  입니다.
                  <br />
                  로그인 또는 회원가입을 진행하시려면 아래 버튼을 눌러주세요.
                </p>
              </div>

              <div>
                <Input
                  label="아이디"
                  required
                  placeholder="아이디를 입력해주세요"
                  {...register('accountId')}
                />
                <Input
                  label="비밀번호"
                  type="password"
                  className="mt-5"
                  required
                  placeholder="비밀번호를 입력해주세요"
                  {...register('password')}
                />
              </div>

              <Button
                title="로그인"
                className="mt-10 ml-auto max-w-56"
                size="lg"
                disabled={!isValid || isPending}
              />
            </form>
          </div>
        </div>
      </main>

      <LoginFooter />
    </div>
  )
}

export default AuthPage
