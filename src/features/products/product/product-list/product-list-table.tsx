import Table from '@/shared/components/ui/table/table'
import { Pagination } from '@/shared/components/ui/pagination/pagination'

import ProductTopAreaSort from './product-top-area/product-top-area-sort'
import ProductTopAreaCounter from './product-top-area/product-top-area-counter'
import ProductTopAreaBulkDelete from './product-top-area/product-top-area-bulk-delete'
import { ProductResultData } from '@/entity/products/product/product-data.mock'
import { getResultColumns } from './product-list-columns'
import { useProductList } from './product-list.hook'

export const ResultTable = () => {
  const {
    tableData,
    selectedIds,
    toggleAll,
    toggleRow,
    allSelected,
    selectedIdSet,
    handleCopyRow,
    handleDelete,
  } = useProductList({ data: ProductResultData })

  const columns = getResultColumns({
    selectedIds,
    allSelected,
    selectedIdSet,
    onToggleAll: toggleAll,
    onToggleRow: toggleRow,
    onCopyRow: handleCopyRow,
  })

  return (
    <Table
      data={tableData}
      columns={columns}
      topArea={
        <div className="flex w-full justify-between px-[19px] py-16 pb-12">
          <div className="flex items-center gap-10">
            <ProductTopAreaSort />
            <ProductTopAreaCounter
              selectedIds={selectedIds}
              tableData={tableData.length}
            />
            <ProductTopAreaBulkDelete
              onDelete={handleDelete}
              disabled={selectedIds.length === 0}
            />
          </div>
          <Pagination currentPage={1} totalPages={2} />
        </div>
      }
    />
  )
}
