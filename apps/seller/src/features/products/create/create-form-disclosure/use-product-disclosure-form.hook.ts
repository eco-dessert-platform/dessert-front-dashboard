import { useEffect } from 'react'

import { useFormContext, useWatch } from 'react-hook-form'

import { DISCLOSURE_FIELDS } from '@/entity/products'

import { CreateProductForm } from '../create-form/product-create.types'
import { useCreateHeaderSteps } from '../create-store'

type NoticeFieldKey = keyof CreateProductForm['productInfoNotice']

export const useProductDisclosureForm = () => {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateProductForm>()

  // Zustand 스토어 액션 가져오기
  const { setProductFields } = useCreateHeaderSteps()

  const noticeValues = useWatch({ control, name: 'productInfoNotice' })
  const noticeModes = useWatch({ control, name: 'productInfoNoticeMode' })

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name?.startsWith('productInfoNoticeMode.')) {
        const fieldKey = name.split('.')[1] as NoticeFieldKey
        const currentMode = value.productInfoNoticeMode?.[fieldKey]

        if (currentMode === 'default') {
          // 기획: 기본값 정보가 없을 경우 "해당항목 없음" 노출 (상품명 제외)
          const resetValue =
            fieldKey === 'productName'
              ? value.productName || ''
              : '해당항목 없음'

          setValue(`productInfoNotice.${fieldKey}`, resetValue, {
            shouldValidate: true,
          })
        }
      }

      if (
        name === 'productName' &&
        value.productInfoNoticeMode?.productName === 'default'
      ) {
        setValue('productInfoNotice.productName', value.productName || '', {
          shouldValidate: true,
        })
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, setValue])

  // 완료 상태 체크 및 Zustand 업데이트
  useEffect(() => {
    if (!noticeModes || !noticeValues) return

    const isComplete = DISCLOSURE_FIELDS.every((field) => {
      const mode = noticeModes[field.key]
      const value = noticeValues[field.key]

      if (mode === 'default') return true
      if (mode === 'manual') {
        const trimmed = (value ?? '').trim()
        return trimmed.length >= 3 && trimmed.length < 50
      }
      return false
    })

    // Zustand 액션 호출: 함수형 업데이트가 아닌 객체 전달 방식
    setProductFields({ productDisclosure: isComplete })
  }, [noticeModes, noticeValues, setProductFields])

  return {
    control,
    errors,
  }
}
