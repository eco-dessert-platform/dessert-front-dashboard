import { useState } from 'react'

import { ProductType } from '@/entity/products/product/product.type'
import Badge from '@/shared/ui/badge/badge'

import ProductListCellToggleSale from './product-list-cell-toggle-sale'

type Props = {
  status: ProductType['status']
}
const badgeMap = {
  onSale: { color: 'green', label: '판매중' },
  stopSale: { color: 'grayDark', label: '판매중지' },
  soldOut: { color: 'red', label: '품절' },
  pending: { color: 'yellow', label: '판매대기' },
  banned: { color: 'gray', label: '판매금지' },
} as const

const ProductListCellStatus = ({ status }: Props) => {
  const [realState, setRealState] = useState(status)

  const badge = badgeMap[realState]

  const handleTest = () => {
    if (realState === 'stopSale') {
      setRealState('onSale')
    } else {
      setRealState('stopSale')
    }
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <Badge color={badge.color} variant="outline" content={badge.label} />
      <ProductListCellToggleSale
        checked={realState === 'stopSale'}
        onChange={handleTest}
      />
    </div>
  )
}

export default ProductListCellStatus
