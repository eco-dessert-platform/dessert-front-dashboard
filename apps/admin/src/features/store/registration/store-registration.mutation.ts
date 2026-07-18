import { toast } from '@dessert/ui'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  createAdminStore,
  storeRegistrationQueries,
} from '@/entity/store/registration'

export const useCreateAdminStoreMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAdminStore,
    onSuccess: ({ name }) => {
      queryClient.invalidateQueries({
        queryKey: storeRegistrationQueries.registrations(),
      })
      toast.success('스토어를 생성했습니다.', name)
    },
    onError: (error) => {
      toast.error(
        '스토어 생성에 실패했습니다.',
        error.message || '다시 시도해주세요.',
      )
    },
  })
}
