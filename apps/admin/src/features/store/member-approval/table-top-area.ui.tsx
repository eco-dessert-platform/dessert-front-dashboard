import { Button, Pagination } from '@dessert/ui'

interface TableTopAreaProps {
  totalCount: number
  selectedCount: number
  currentPage: number
  totalPages: number
  isApproving: boolean
  onPageChange: (page: number) => void
  onSubmitApproval: () => void
  handleDownloadFile: () => void
}

export const TableTopArea = ({
  totalCount,
  selectedCount,
  currentPage,
  totalPages,
  isApproving,
  onPageChange,
  onSubmitApproval,
  handleDownloadFile,
}: TableTopAreaProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex gap-16">
        {/* 버튼 */}
        <div className="flex gap-10">
          <Button
            title="승인"
            variant="primary-outlined"
            disabled={isApproving}
            onClick={onSubmitApproval}
          />
          <Button
            title="서류 다운로드"
            variant="secondary-outlined"
            onClick={handleDownloadFile}
          />
        </div>
        {/* 선택갯수 */}
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
            <span className="typo-title-14-m text-gray-700">
              {totalCount}개
            </span>
          </p>
        </div>
      </div>
      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
}
