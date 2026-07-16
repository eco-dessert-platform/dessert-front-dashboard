import { Button, Pagination } from '@dessert/ui'

interface StoreRegistrationActionGroupProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onCreate: () => void
  onDelete: () => void
}

export const StoreRegistrationActionGroup = ({
  currentPage,
  totalPages,
  onPageChange,
  onCreate,
  onDelete,
}: StoreRegistrationActionGroupProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-12">
        <Button
          title="등록"
          size="sm"
          variant="primary-outlined"
          onClick={onCreate}
        />
        <Button
          title="삭제"
          size="sm"
          variant="secondary-outlined"
          onClick={onDelete}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
}
