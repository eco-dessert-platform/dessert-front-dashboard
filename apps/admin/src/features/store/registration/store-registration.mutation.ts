import { toast } from '@dessert/ui'
import { useQueryClient } from '@tanstack/react-query'
import { createMutation } from 'react-query-kit'

import {
  CreateAdminStoreInput,
  DeleteAdminStoresRequestParams,
  StoreDetailResponse,
  UpdateAdminStoreParams,
  createAdminStore,
  deleteAdminStores,
  storeRegistrationQueries,
  updateAdminStore,
} from '@/entity/store/registration'

const useCreateAdminStoreMutationBase = createMutation<
  StoreDetailResponse,
  CreateAdminStoreInput
>({
  mutationKey: [...storeRegistrationQueries._def, 'create'],
  mutationFn: createAdminStore,
})

const useUpdateAdminStoreMutationBase = createMutation<
  StoreDetailResponse,
  UpdateAdminStoreParams
>({
  mutationKey: [...storeRegistrationQueries._def, 'update'],
  mutationFn: updateAdminStore,
})

const useDeleteAdminStoresMutationBase = createMutation<
  void,
  DeleteAdminStoresRequestParams
>({
  mutationKey: [...storeRegistrationQueries._def, 'delete'],
  mutationFn: deleteAdminStores,
})

export const useCreateAdminStoreMutation = () => {
  const queryClient = useQueryClient()

  return useCreateAdminStoreMutationBase({
    onSuccess: ({ name }) => {
      queryClient.invalidateQueries({
        queryKey: storeRegistrationQueries.registeredStoreList.queryKey,
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

export const useUpdateAdminStoreMutation = () => {
  const queryClient = useQueryClient()

  return useUpdateAdminStoreMutationBase({
    onSuccess: ({ name }) => {
      queryClient.invalidateQueries({
        queryKey: storeRegistrationQueries.registeredStoreList.queryKey,
      })
      toast.success('스토어를 수정했습니다.', name)
    },
    onError: (error) => {
      toast.error(
        '스토어 수정에 실패했습니다.',
        error.message || '다시 시도해주세요.',
      )
    },
  })
}

export const useDeleteAdminStoresMutation = () => {
  const queryClient = useQueryClient()

  return useDeleteAdminStoresMutationBase({
    onSuccess: (_, { storeIds }) => {
      queryClient.invalidateQueries({
        queryKey: storeRegistrationQueries.registeredStoreList.queryKey,
      })
      toast.success(`${storeIds.length}개의 스토어를 삭제했습니다.`)
    },
    onError: (error) => {
      toast.error(
        '스토어 삭제에 실패했습니다.',
        error.message || '다시 시도해주세요.',
      )
    },
  })
}
