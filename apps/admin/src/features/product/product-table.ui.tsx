import { useEffect, useMemo, useState } from 'react'

import { Table } from '@dessert/ui'

import { getProductMockData } from '@/entity/product/product.mock'
import { Product } from '@/entity/product/product.type'

import {
  OptionActionType,
  ProductActionGroup,
  ProductActionType,
} from './product-action-group.ui'
import { useProductSelection } from './product-selection.hook'
import {
  FlatAdminProduct,
  getProductTableColumns,
} from './product-table-columns'

const PAGE_SIZE = 10

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

  const { data: mockData, totalCount } = useMemo(
    () => getProductMockData(currentPage, PAGE_SIZE),
    [currentPage],
  )
  const flatData = useMemo(() => flattenData(mockData), [mockData])

  const {
    selectedProductIds,
    selectedOptionIds,
    handleProductToggle,
    handleOptionToggle,
    resetSelection,
  } = useProductSelection(mockData)

  // 페이지 변경 시 선택 상태 초기화
  useEffect(() => {
    resetSelection()
  }, [currentPage, resetSelection])

  const handleProductAction = (action: ProductActionType) => {
    if (selectedProductIds.length === 0) {
      alert('선택된 상품이 없습니다.')
      return
    }
    alert(`상품 액션 [${action}] 실행: ${selectedProductIds.join(', ')}`)
  }

  const handleOptionAction = (action: OptionActionType) => {
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

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

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
