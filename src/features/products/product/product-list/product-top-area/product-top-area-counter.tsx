const ProductTopAreaCounter = ({
  selectedIds,
  tableData,
}: {
  selectedIds: string[]
  tableData: number
}) => {
  return (
    <p className="typo-title-14-m text-gray-700">
      선택 <span className="text-primary-500">{selectedIds.length}개</span> |
      전체 {tableData}개
    </p>
  )
}

export default ProductTopAreaCounter
