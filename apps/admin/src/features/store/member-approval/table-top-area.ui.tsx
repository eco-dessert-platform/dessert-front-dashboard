import { Button, Pagination } from '@dessert/ui'

interface TableTopAreaProps {
  totalCount: number
  selectedCount: number
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onSubmitApproval: () => void
  handleDownloadFile: () => void
  isApproving?: boolean
}

export const TableTopArea = ({
  totalCount,
  selectedCount,
  currentPage,
  totalPages,
  onPageChange,
  onSubmitApproval,
  handleDownloadFile,
  isApproving = false,
}: TableTopAreaProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex gap-16">
        <div className="flex gap-10">
          <Button
            title="승인"
            variant="primary-outlined"
            onClick={onSubmitApproval}
            disabled={isApproving || selectedCount === 0}
          />
          <Button
            title="서류 다운로드"
            variant="secondary-outlined"
            onClick={handleDownloadFile}
          />
        </div>
        <div className="flex items-center gap-4">
          <p className="typo-title-14-r text-gray-700">
            선택{' '}
            <span className="typo-title-14-m text-primary-500">
              {selectedCount}개
            </span>
          </p>
          <span className="h-12 w-2 bg-gray-400" />
          <p className="typo-title-14-r text-gray-700">
            전체{' '}
            <span className="typo-title-14-m text-gray-700">{totalCount}개</span>
          </p>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.max(totalPages, 1)}
        onPageChange={onPageChange}
      />
    </div>
  )
}
