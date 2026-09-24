import { Pagination } from '@dessert/ui'

interface NameChangeApprovalActionGroupProps {
  totalCount: number
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const NameChangeApprovalActionGroup = ({
  totalCount,
  currentPage,
  totalPages,
  onPageChange,
}: NameChangeApprovalActionGroupProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <p className="typo-title-14-r text-gray-700">
        전체{' '}
        <span className="typo-title-14-m text-gray-700">{totalCount}개</span>
      </p>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
}
