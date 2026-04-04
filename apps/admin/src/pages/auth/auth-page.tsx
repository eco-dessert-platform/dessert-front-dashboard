import { Button, Input, LogoHeader, toast } from '@dessert/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import {
  AuthLoginImage,
  LoginFooter,
  LoginForm,
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
            <LoginForm />
          </div>
        </div>
      </main>

      <LoginFooter />
    </div>
  )
}

export default AuthPage
