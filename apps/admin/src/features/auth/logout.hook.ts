import { toast } from '@dessert/ui'
import { useNavigate } from 'react-router-dom'

import { useAdminLogoutMutation } from './logout.mutation'

export const useLogout = () => {
  const navigate = useNavigate()
  const { mutate, isPending } = useAdminLogoutMutation()

  const onLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        toast.success('로그아웃 되었어요')
        navigate('/login', { replace: true })
      },
      onError: () => {
        toast.error('로그아웃 실패', '다시 시도해주세요')
      },
    })
  }

  return { onLogout, isPending }
}
