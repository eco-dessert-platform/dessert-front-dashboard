import { useRef } from 'react'

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

  // blob URL → File 매핑 (에디터 이미지)
  // ProductEditorModal에서 이미지 삽입 시 여기에 저장
  const editorImageFiles = useRef<Map<string, File>>(new Map())

  const { data: store } = useQuery(productQueries.myStore())

  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      alert('상품이 등록되었습니다.') // 토스트로 교체 예정
    },
    onError: (error) => {
      console.error(error)
      alert('상품 등록에 실패했습니다.')
    },
  })

  const handleSubmit = form.handleSubmit((data) => {
    if (!store?.storeId) {
      alert('스토어 정보를 불러오지 못했습니다.')
      return
    }
    const formData = buildProductFormData(
      data,
      productDetail,
      editorImageFiles.current,
      store.storeId,
    )
    mutate(formData)
  })

  return { handleSubmit, isPending, editorImageFiles }
}
