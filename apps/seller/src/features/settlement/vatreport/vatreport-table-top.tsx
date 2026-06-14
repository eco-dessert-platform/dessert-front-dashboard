import { Pagination } from '@dessert/ui'

import type { TVatExcelDownloadType } from '@/entity/settlement/vatreport/entities'

import VatReportExcelDownload from './vatreport-excel-download'

interface IVatReportTableTopProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onExcelDownload: (type: TVatExcelDownloadType) => void
}

const VatReportTableTop = ({
  currentPage,
  totalPages,
  onPageChange,
  onExcelDownload,
}: IVatReportTableTopProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <VatReportExcelDownload onDownload={onExcelDownload} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default VatReportTableTop
