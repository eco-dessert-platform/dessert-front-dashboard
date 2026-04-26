import { toast } from '@dessert/ui'
import { useFormContext } from 'react-hook-form'

import { CreateFormType } from '@/entity/products/create/create-form'

import { useCreateDraftStore } from './create-draft.store'
import { useProductCreationStore } from '../create-store/product-creation.store'
export const useCreateDraft = () => {
  const form = useFormContext<CreateFormType>()
  const { productDetail } = useProductCreationStore()
  const { draft, saveDraft, clearDraft } = useCreateDraftStore()

  const handleSaveDraft = () => {
    const formData = form.getValues()
    saveDraft({
      ...formData,
      productDetail,
    })
    toast.success('임시저장을 완료했어요 ')
  }

  // 폼에 임시저장 데이터 복원
  const handleRestoreDraft = () => {
    if (!draft) return
    const { productDetail: savedDetail, ...formValues } = draft
    form.reset(formValues as CreateFormType)
    useProductCreationStore.getState().setProductDetail(savedDetail)
    clearDraft()
  }

  return {
    draft,
    handleSaveDraft,
    handleRestoreDraft,
    clearDraft,
  }
}
