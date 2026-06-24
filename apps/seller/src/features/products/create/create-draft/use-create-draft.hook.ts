import { toast } from '@dessert/ui'
import { useFormContext } from 'react-hook-form'

import { CreateProductForm } from '../create-form'
import { useCreateDraftStore } from './create-draft-store'
import { useProductCreationStore } from '../create-form/product-creation.store'

export const useCreateDraft = () => {
  const form = useFormContext<CreateProductForm>()
  const { productDetail, setProductDetail } = useProductCreationStore()
  const { draft, saveDraft, clearDraft } = useCreateDraftStore()

  const handleSaveDraft = () => {
    // 이미지(File)는 직렬화 불가하므로 rest 구조분해로 저장에서 제외합니다
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { mainImage, extraImages, ...formData } = form.getValues()
    saveDraft({
      ...formData,
      productDetail,
    })
    toast.success('임시저장을 완료했어요')
  }

  // 폼에 임시저장 데이터 복원
  const handleRestoreDraft = () => {
    if (!draft) return
    const { productDetail: savedDetail, ...formValues } = draft
    form.reset(formValues as CreateProductForm)
    setProductDetail(savedDetail)
  }

  return {
    draft,
    handleSaveDraft,
    handleRestoreDraft,
    clearDraft,
  }
}
