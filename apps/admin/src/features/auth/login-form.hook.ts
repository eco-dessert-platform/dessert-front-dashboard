import { toast } from '@dessert/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAdminLoginMutation } from './login.mutation'
import { LoginFormValues, loginSchema } from './login.schema'

export const useLoginForm = () => {
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

  return { register, handleSubmit, onSubmit, isValid, isPending }
}
