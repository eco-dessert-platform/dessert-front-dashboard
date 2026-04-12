import { Button, Pagination } from '@dessert/ui'

interface TableTopAreaProps {
  totlaCount: number
  selectedCount: number
}

export const TableTopArea = ({
  totlaCount,
  selectedCount,
}: TableTopAreaProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex gap-16">
        {/* 버튼 */}
        <div className="flex gap-10">
          <Button title="승인" variant="primary-outlined" />
          <Button title="서류 다운로드" variant="secondary-outlined" />
        </div>
        {/* 선택갯수 */}
        <div className="flex items-center gap-4">
          <p className="typo-title-14-r text-gray-700">
            선택{' '}
            <span className="typo-title-14-m text-primary-500">
              {totlaCount}개
            </span>
          </p>
          <span className="h-12 w-2 bg-gray-400" />
          <p className="typo-title-14-r text-gray-700">
            전체{' '}
            <span className="typo-title-14-m text-gray-700">
              {selectedCount}개
            </span>
          </p>
        </div>
      </div>
      {/* 페이지네이션 */}
      <Pagination currentPage={1} totalPages={2} />
    </div>
  )
}
