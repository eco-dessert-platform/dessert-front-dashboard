import { toast } from '@dessert/ui'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { getMyStore } from '@/entity/products'
import { ROUTES } from '@/shared/constant/routes'

import { buildProductBoardFormData } from './build-product-board-form-data.utils'
import { clearCreateFormPersistence } from './clear-create-form-persistence.utils'
import { CREATE_FORM_TOAST } from './create-form-toast.constants'
import { useCreateProductBoardMutation } from './use-create-product-board.mutation'
import { CREATE_PRODUCT_DEFAULT_VALUES } from './use-create-product-form.hook'
import { CreateProductForm } from './product-create.types'
import { useProductCreationStore } from './product-creation.store'

export function useSubmitCreateForm() {
  const form = useFormContext<CreateProductForm>()
  const navigate = useNavigate()
  const { productDetail, editorImageFiles } = useProductCreationStore()
  const { mutateAsync, isPending } = useCreateProductBoardMutation()

  const showSaveErrorToast = (errorMessage?: string) => {
    toast.error(
      CREATE_FORM_TOAST.SAVE_ERROR.title,
      errorMessage || CREATE_FORM_TOAST.SAVE_ERROR.description,
    )
  }

  const handleSubmit = form.handleSubmit(
    async (data) => {
      try {
        const store = await getMyStore()
        const boardDetailImages = Array.from(editorImageFiles.values())
        const formData = buildProductBoardFormData({
          data,
          productDetail,
          storeId: store.storeId,
          boardDetailImages,
        })

        await mutateAsync(formData)

        toast.success(CREATE_FORM_TOAST.SAVE_SUCCESS)
        clearCreateFormPersistence()
        form.reset(CREATE_PRODUCT_DEFAULT_VALUES)
        navigate(ROUTES.PRODUCTS.ALL)
      } catch (error) {
        const errorMessage =
          error instanceof Error && error.message ? error.message : undefined
        showSaveErrorToast(errorMessage)
      }
    },
    () => {
      showSaveErrorToast()
    },
  )

  return { handleSubmit, isPending }
}
