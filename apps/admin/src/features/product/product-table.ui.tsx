import { useMemo, useState } from 'react'

import { Table } from '@dessert/ui'

import { getProductMockData } from '@/entity/product/product.mock'
import { Product } from '@/entity/product/product.type'

import { useProductSelection } from './product-selection.hook'
import {
  FlatAdminProduct,
  getProductTableColumns,
} from './product-table-columns'
import { ProductActionGroup } from './product-action-group.ui'

const flattenData = (data: Product[]): FlatAdminProduct[] => {
  return data.flatMap((product) =>
    product.productOptions.map((option, index) => ({
      ...product,
      option,
      optionIndex: index,
      totalOptions: product.productOptions.length,
    })),
  )
}

export const ProductTable = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const { data: mockData, totalCount } = useMemo(
    () => getProductMockData(currentPage, pageSize),
    [currentPage, pageSize],
  )
  const flatData = useMemo(() => flattenData(mockData), [mockData])

  const {
    selectedProductIds,
    selectedOptionIds,
    handleProductToggle,
    handleOptionToggle,
  } = useProductSelection(mockData)

  const handleProductAction = (action: string) => {
    if (selectedProductIds.length === 0) {
      alert('선택된 상품이 없습니다.')
      return
    }
    alert(`상품 액션 [${action}] 실행: ${selectedProductIds.join(', ')}`)
  }

  const handleOptionAction = (action: string) => {
    if (selectedOptionIds.length === 0) {
      alert('선택된 상품 옵션이 없습니다.')
      return
    }
    alert(`옵션 액션 [${action}] 실행: ${selectedOptionIds.join(', ')}`)
  }

  const columns = useMemo(
    () =>
      getProductTableColumns(
        selectedProductIds,
        selectedOptionIds,
        handleProductToggle,
        handleOptionToggle,
      ),
    [
      selectedProductIds,
      selectedOptionIds,
      handleProductToggle,
      handleOptionToggle,
    ],
  )

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))

  return (
    <div>
      <Table
        data={flatData}
        columns={columns}
        topArea={
          <ProductActionGroup
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onProductAction={handleProductAction}
            onOptionAction={handleOptionAction}
          />
        }
      />
    </div>
  )
}
