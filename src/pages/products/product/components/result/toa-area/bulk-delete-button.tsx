import React from 'react'

interface BulkDeleteButtonProps {
  onDelete: () => void
  disabled?: boolean
}

const BulkDeleteButton = ({ onDelete, disabled }: BulkDeleteButtonProps) => {
  return (
    <button
      type="button"
      onClick={onDelete}
      disabled={disabled}
      className="typo-title-14-m text-gray-700 underline disabled:opacity-40"
    >
      선택 상품 삭제
    </button>
  )
}

export default BulkDeleteButton
