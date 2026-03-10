import ExcelIcon from '@/assets/icons/icon-excel.svg?react'
import Button from '@/shared/ui/button/button'
import { Pagination } from '@/shared/ui/pagination/pagination'
import { toast } from '@/shared/ui/toast/toast-helper'

interface SettlementTableTopAreaProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const SettlementTableTopArea = ({
  currentPage,
  totalPages,
  onPageChange,
}: SettlementTableTopAreaProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <Button
        variant="secondary-outlined"
        size="sm"
        className="h-30 gap-4 px-10 py-6 text-gray-800"
        leftIcon={<ExcelIcon width={16} height={16} />}
        title="엑셀 다운로드"
        onClick={() =>
          toast.info('정산목록 엑셀 파일이 다운로드 되었어요.', undefined, {
            position: 'bottom-right',
          })
        }
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
}
