import { Pagination } from '@dessert/ui'

interface IVatReportTableTopProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const VatReportTableTop = ({
  currentPage,
  totalPages,
  onPageChange,
}: IVatReportTableTopProps) => {
  return (
    <div className="flex w-full justify-end">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default VatReportTableTop
