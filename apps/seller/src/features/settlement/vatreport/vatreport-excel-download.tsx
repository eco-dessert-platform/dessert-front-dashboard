import { useState } from 'react'

import { Button } from '@dessert/ui'

import ExcelIcon from '@/assets/icons/icon-excel.svg?react'
import { VAT_EXCEL_DOWNLOAD_OPTIONS } from '@/entity/settlement/vatreport/constants'
import type { TVatExcelDownloadType } from '@/entity/settlement/vatreport/entities'

interface IVatReportExcelDownloadProps {
  onDownload: (type: TVatExcelDownloadType) => void
}

const VatReportExcelDownload = ({ onDownload }: IVatReportExcelDownloadProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Button
        variant="secondary-outlined"
        size="sm"
        className="h-30 gap-4 px-10 py-6 text-gray-800"
        leftIcon={<ExcelIcon width={16} height={16} />}
        title="엑셀 다운로드"
      />

      {isOpen && (
        <div className="absolute top-0 left-full z-dropdown pl-8">
          <ul className="min-w-[168px] rounded-10 border border-gray-200 bg-white p-4 shadow-md">
            {VAT_EXCEL_DOWNLOAD_OPTIONS.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  className="typo-title-14-r flex h-[34px] w-full cursor-pointer items-center rounded-4 px-10 py-6 text-left text-gray-800 transition-colors hover:bg-gray-50"
                  onClick={() => onDownload(option.value)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default VatReportExcelDownload
