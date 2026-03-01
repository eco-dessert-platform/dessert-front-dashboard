import { ProductSaleStatusType } from '@/entity/products/product/product-sale-status.type'

export const ProductResultData: ProductSaleStatusType[] = [
  {
    id: '1',
    productName:
      '제품명은 2줄까지 노출됩니다. 그리고 제품명은  2줄 이후 말줄임 처리가 됩니다. 3줄 넘지 않게 적어주세요',
    stockStatus: '재고있음',
    originPrice: 2000,
    salePrice: 1000,
    shipping: { type: '무료', price: 0 },
    status: 'onSale',
  },
  {
    id: '2',
    productName:
      '제품명은 2줄까지 노출됩니다. 그리고 제품명은  2줄 이후 말줄임 처리가 됩니다. 3줄 넘지 않게 적어주세요',
    stockStatus: '재고없음',
    originPrice: 2000,
    salePrice: 1000,
    shipping: { type: '조건부 무료', price: 0, minimumPrice: 2500 },
    status: 'stopSale',
  },
  {
    id: '3',
    productName:
      '제품명은 2줄까지 노출됩니다. 그리고 제품명은  2줄 이후 말줄임 처리가 됩니다. 3줄 넘지 않게 적어주세요',
    stockStatus: '재고있음',
    originPrice: 2000,
    salePrice: 1000,
    shipping: { type: '유료', price: 1000 },
    status: 'soldOut',
  },
  {
    id: '4',
    productName:
      '제품명은 2줄까지 노출됩니다. 그리고 제품명은  2줄 이후 말줄임 처리가 됩니다. 3줄 넘지 않게 적어주세요',
    stockStatus: '재고있음',
    originPrice: 2000,
    salePrice: 1000,
    shipping: { type: '유료', price: 1000 },
    status: 'pending',
  },
]
