import { toast } from '@dessert/ui'
import { useFormContext } from 'react-hook-form'

import {
  clearCreateFormPersistence,
  CREATE_PRODUCT_DEFAULT_VALUES,
  CreateProductForm,
} from '../create-form'
import { CREATE_FORM_TOAST } from '../create-form/create-form-toast.constants'
import { useCreateDraftStore } from './create-draft-store'
import { useProductCreationStore } from '../create-form/product-creation.store'

export const useCreateDraft = () => {
  const form = useFormContext<CreateProductForm>()
  const { productDetail, setProductDetail } = useProductCreationStore()
  const { draft, saveDraft } = useCreateDraftStore()

  const handleSaveDraft = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { mainImage, extraImages, ...formData } = form.getValues()
    saveDraft({
      ...formData,
      productDetail,
    })
    toast.success(CREATE_FORM_TOAST.DRAFT_SUCCESS)
  }

  const handleRestoreDraft = () => {
    if (!draft) return
    const { productDetail: savedDetail, ...formValues } = draft
    form.reset(formValues as CreateProductForm)
    setProductDetail(savedDetail)
  }

  const handleClearDraft = () => {
    clearCreateFormPersistence()
    form.reset(CREATE_PRODUCT_DEFAULT_VALUES)
  }

  return {
    draft,
    handleSaveDraft,
    handleRestoreDraft,
    clearDraft: handleClearDraft,
  }
}
