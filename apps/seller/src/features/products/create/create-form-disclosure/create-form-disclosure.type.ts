import { ProductInfoNoticeKey } from './product-disclosure.constant'

export type ProductDisclosureType = {
  productInfoNotice: Record<ProductInfoNoticeKey, string>
  productInfoNoticeMode: Record<ProductInfoNoticeKey, 'default' | 'manual'>
}
