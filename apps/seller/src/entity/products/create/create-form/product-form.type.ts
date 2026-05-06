import { ProductInfoNoticeKey } from '../../../../features/products/create/create-form-disclosure/product-disclosure.constant'

export type ProductDisclosureFormInput = {
  productInfoNotice: Record<ProductInfoNoticeKey, string>
  productInfoNoticeMode: Record<ProductInfoNoticeKey, 'default' | 'manual'>
}
