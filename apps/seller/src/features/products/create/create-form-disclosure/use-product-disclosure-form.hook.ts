import { useEffect } from 'react'

import { useFormContext, useWatch } from 'react-hook-form'

import { DISCLOSURE_FIELDS } from '@/entity/products'
import { CreateProductForm } from '@/pages/products/create/create-form'

import { useCreateFormSteps } from '../create-form/use-create-form-steps.hook'

type NoticeFieldKey = keyof CreateProductForm['productInfoNotice']

export const useProductDisclosureForm = () => {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateProductForm>()
  const { setProductFields } = useCreateFormSteps()

  // 1. 필요한 값만 콕 집어서 감시 (불필요한 리렌더링 방지)
  const sourceProductName = useWatch({ control, name: 'productName' })
  const noticeValues = useWatch({ control, name: 'productInfoNotice' })
  const noticeModes = useWatch({ control, name: 'productInfoNoticeMode' })

  // 2. 모드 전환 시 값 초기화 동기화 로직 및 원본 상품명 실시간 반영
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      // 2-1. 모드가 'default'로 바뀔 때 값 초기화
      if (name?.startsWith('productInfoNoticeMode.')) {
        const fieldKey = name.split('.')[1] as NoticeFieldKey
        const currentMode = value.productInfoNoticeMode?.[fieldKey]

        if (currentMode === 'default') {
          const resetValue =
            fieldKey === 'productName' ? (value.productName ?? '') : ''
          setValue(`productInfoNotice.${fieldKey}`, resetValue, {
            shouldValidate: true,
          })
        }
      }

      // 2-2. 원본 상품명이 바뀔 때, 고시상품명 모드가 'default'이면 자동 동기화 (CodeRabbit 피드백 반영: 클로저 안전 보장)
      if (
        name === 'productName' &&
        value.productInfoNoticeMode?.productName === 'default'
      ) {
        setValue('productInfoNotice.productName', value.productName ?? '', {
          shouldValidate: true,
        })
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, setValue])

  // 3. 완료 상태 체크 로직 최적화
  useEffect(() => {
    if (!noticeModes || !noticeValues) return

    const isComplete = DISCLOSURE_FIELDS.every((field) => {
      const mode = noticeModes[field.key]
      const value = noticeValues[field.key]
      return mode === 'default' || (mode === 'manual' && value?.length >= 3)
    })

    setProductFields((prev) => ({ ...prev, productDisclosure: isComplete }))
  }, [noticeModes, noticeValues, setProductFields])

  return {
    control,
    errors,
  }
}
