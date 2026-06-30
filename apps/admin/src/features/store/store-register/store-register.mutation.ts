import { toast } from '@dessert/ui'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  createStore,
  deleteStores,
  updateStore,
} from '@/entity/store/store-register'

// 목록 조회 GET 엔드포인트 미정 — 확정되면 query key 추가 후 무효화 연결
export const STORE_REGISTER_QUERY_KEY = ['admin-stores'] as const

export const useCreateStoreMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createStore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: STORE_REGISTER_QUERY_KEY })
      toast.success('스토어를 등록했습니다.')
    },
    onError: () => {
      toast.error('스토어 등록에 실패했습니다.', '다시 시도해주세요.')
    },
  })
}

export const useUpdateStoreMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateStore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: STORE_REGISTER_QUERY_KEY })
      toast.success('스토어 정보를 수정했습니다.')
    },
    onError: () => {
      toast.error('스토어 수정에 실패했습니다.', '다시 시도해주세요.')
    },
  })
}

export const useDeleteStoresMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (storeIds: number[]) => deleteStores(storeIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: STORE_REGISTER_QUERY_KEY })
      toast.success('선택한 스토어를 삭제했습니다.')
    },
    onError: () => {
      toast.error('스토어 삭제에 실패했습니다.', '다시 시도해주세요.')
    },
  })
}
