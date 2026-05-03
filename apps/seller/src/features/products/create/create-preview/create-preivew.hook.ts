import { useFormContext, useWatch } from 'react-hook-form'

//import { CreateFormType } from '@/entity/products/create/create-form'
import { CreateProductForm } from '../create-form'
import { useProductCreationStore } from '../create-form/product-creation.store'
//import { useCreateHeaderSteps } from '../create-store'

export const useCreatePreviewPreviewHook = () => {
  const { watch } = useFormContext<CreateProductForm>()
  const { control: rootControl } = useFormContext()
  const rootProductPrice = useWatch({
    control: rootControl,
    name: 'price',
  })
  const formData = watch()
  //const { productPrice } = useCreateHeaderSteps()
  const productPrice = rootProductPrice
  const { productDetail } = useProductCreationStore()

  const rawPrice = formData.price
  const rawDiscount = formData.discountAmount
  const discountType = formData.discountType

  const price = rawPrice ?? 0
  const discountAmount = rawDiscount ?? 0

  const discountPercent =
    discountType === 'won'
      ? price > 0
        ? Math.round((discountAmount / price) * 100)
        : 0
      : discountAmount

  const totalPrice =
    discountType === 'won'
      ? price - discountAmount
      : Math.round(price * (1 - discountAmount / 100))

  const isPriceEntered = rawPrice !== null && rawPrice > 0

  const mainImageUrl = formData.mainImage
    ? URL.createObjectURL(formData.mainImage)
    : null
  const extraImageUrls = (formData.extraImages ?? []).map((f) =>
    URL.createObjectURL(f),
  )
  const allImageUrls = mainImageUrl ? [mainImageUrl, ...extraImageUrls] : []

  return {
    formData,
    productPrice,
    productDetail,
    discountPercent,
    totalPrice,
    isPriceEntered,
    allImageUrls,
    discountAmount,
  }
}
