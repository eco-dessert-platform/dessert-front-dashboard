import { useRef } from 'react'

import { toast } from '@dessert/ui'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'

import {
  CreateFormType,
  createProduct,
  productQueries,
} from '@/entity/products/create/create-form'

import { buildProductFormData } from './create-form-mapper'
import { useProductCreationStore } from '../create-store/product-creation.store'

export const useSubmitCreateForm = () => {
  const form = useFormContext<CreateFormType>()
  const { productDetail } = useProductCreationStore()

  const editorImageFiles = useRef<Map<string, File>>(new Map())

  //   const { data: store } = useQuery(productQueries.myStore())

  const { data: store } = useQuery({
    ...productQueries.myStore(),
    enabled: false, // ← 쿼리 비활성화
  })

  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success('상품 등록을 완료했어요')
    },
    onError: () => {
      toast.error('저장이 완료되지 않았어요', '다시 한 번 시도해주세요')
    },
  })

  const handleSubmit = form.handleSubmit(
    (data) => {
      const storeId = store?.storeId ?? 1
      console.log('mainImage:', data.mainImage)
      //   if (!store?.storeId) {
      //     toast.error(
      //       '스토어 정보를 불러오지 못했어요',
      //       '다시 한 번 시도해주세요',
      //     )
      //     return
      //   }
      const formData = buildProductFormData(
        data,
        productDetail,
        editorImageFiles.current,
        storeId,
      )
      mutate(formData)
    },
    () => {
      toast.error('필수 입력사항을 확인해 주세요')
    },
  )

  return { handleSubmit, isPending, editorImageFiles }
}
