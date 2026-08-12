import { Button, Pagination } from '@dessert/ui'

interface NoticeManagementTopAreaProps {
  currentPage: number
  isActionPending: boolean
  selectedCount: number
  totalPages: number
  onCreate: () => void
  onDelete: () => void
  onPageChange: (page: number) => void
}

export const NoticeManagementTopArea = ({
  currentPage,
  isActionPending,
  selectedCount,
  totalPages,
  onCreate,
  onDelete,
  onPageChange,
}: NoticeManagementTopAreaProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex gap-10">
        <Button
          title="등록"
          variant="primary-outlined"
          onClick={onCreate}
          disabled={isActionPending}
        />
        <Button
          title="삭제"
          variant="secondary-outlined"
          onClick={onDelete}
          disabled={isActionPending || selectedCount === 0}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.max(totalPages, 1)}
        onPageChange={onPageChange}
      />
    </div>
  )
}
