import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createProductBoard, productQueries } from '@/entity/products'

export const useCreateProductBoardMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData: FormData) => createProductBoard(formData),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: productQueries.all(),
      })
    },
  })
}
