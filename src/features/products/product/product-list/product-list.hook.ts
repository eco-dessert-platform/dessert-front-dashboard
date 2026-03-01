import { useState, useEffect } from 'react'
import { ProductType } from '@/entity/products/product/product.type'

export const useProductList = ({ data }: { data: ProductType[] }) => {
  const [tableData, setTableData] = useState<ProductType[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  useEffect(() => {
    setTableData(data)
    setSelectedIds((prev) => {
      const newIds = new Set(data.map((v) => v.id))
      return prev.filter((id) => newIds.has(id))
    })
  }, [data])

  const allSelected: boolean | 'indeterminate' =
    tableData.length === 0
      ? false
      : selectedIds.length === tableData.length
        ? true
        : selectedIds.length > 0
          ? 'indeterminate'
          : false

  const toggleAll = (checked: boolean | 'indeterminate') => {
    setSelectedIds(checked === true ? tableData.map((v) => v.id) : [])
  }

  const toggleRow = (id: string, checked: boolean | 'indeterminate') => {
    setSelectedIds((prev) =>
      checked === true
        ? [...new Set([...prev, id])]
        : prev.filter((v) => v !== id),
    )
  }

  const handleCopyRow = (row: ProductType) => {
    setTableData((prev) => [
      {
        ...row,
        id: crypto.randomUUID(),
      },
      ...prev,
    ])
  }

  const handleDelete = () => {
    const selectedSet = new Set(selectedIds)
    setTableData((prev) => prev.filter((row) => !selectedSet.has(row.id)))
    setSelectedIds([])
  }

  return {
    tableData,
    setTableData,
    selectedIds,
    setSelectedIds,
    allSelected,
    toggleAll,
    toggleRow,
    handleCopyRow,
    handleDelete,
  }
}
