import { useEffect, useMemo, useState } from 'react'

import { Table } from '@dessert/ui'

import {
  AdminProduct,
  getAdminProductMockData,
} from '@/entity/product/management-all'

import {
  ManagementAllActionGroup,
  OptionActionType,
  ProductActionType,
} from './management-all-action-group.ui'
import { useManagementAllSelection } from './management-all-selection.hook'
import {
  FlatAdminProduct,
  getManagementAllTableColumns,
} from './management-all-table-columns'

const PAGE_SIZE = 10

const flattenData = (data: AdminProduct[]): FlatAdminProduct[] => {
  return data.flatMap((product) =>
    product.productOptions.map((option, index) => ({
      ...product,
      option,
      optionIndex: index,
      totalOptions: product.productOptions.length,
    })),
  )
}

export const ManagementAllTable = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const mockData = useMemo(
    () => getAdminProductMockData(currentPage, PAGE_SIZE),
    [currentPage],
  )
  const flatData = useMemo(
    () => flattenData(mockData.content),
    [mockData.content],
  )

  const {
    selectedProductIds,
    selectedOptionIds,
    handleProductToggle,
    handleOptionToggle,
    resetSelection,
  } = useManagementAllSelection(mockData.content)

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
      getManagementAllTableColumns(
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

  return (
    <div>
      <Table
        data={flatData}
        columns={columns}
        topArea={
          <ManagementAllActionGroup
            currentPage={currentPage}
            totalPages={mockData.totalPages}
            onPageChange={setCurrentPage}
            onProductAction={handleProductAction}
            onOptionAction={handleOptionAction}
          />
        }
      />
    </div>
  )
}
