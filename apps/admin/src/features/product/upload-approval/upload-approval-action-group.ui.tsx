import { Pagination } from '@dessert/ui'

interface UploadApprovalActionGroupProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const UploadApprovalActionGroup = ({
  currentPage,
  totalPages,
  onPageChange,
}: UploadApprovalActionGroupProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
}
