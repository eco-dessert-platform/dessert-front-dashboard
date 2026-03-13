import { useState } from 'react'

import { Button } from '@dessert/ui'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'

import { DatePicker } from '@/shared/block/date-picker/date-picker'

export const SettlementOverview = () => {
  const [dateValue, setDateValue] = useState<DateRange | undefined>(undefined)

  return (
    <div className="rounded-12 border border-gray-100 bg-white p-24">
      <div className="mb-12 flex items-end gap-8">
        <div className="w-[228px]">
          <DatePicker
            label="조회기간"
            value={dateValue}
            onChange={(range) => {
              setDateValue(range)
            }}
          />
        </div>
        <Button
          title="조회"
          variant="primary-filled"
          size="md"
          className="h-[38px] min-w-[60px]"
        />
      </div>

      <div
        className={
          'flex items-center gap-40 rounded-10 bg-primary-50 px-16 py-4'
        }
      >
        <div className="flex items-center gap-16 py-4">
          <span className="typo-title-16-m text-gray-800">정산예정일</span>
          <span className="typo-title-16-m text-primary-500">
            {dateValue?.from && dateValue?.to
              ? `${format(dateValue.from, 'yyyy-MM-dd')} ~ ${format(dateValue.to, 'yyyy-MM-dd')}`
              : '-'}
          </span>
        </div>
        <div className="flex items-center gap-16 py-4">
          <span className="typo-title-16-m text-gray-800">총 정산 금액</span>
          <div className="flex items-baseline gap-2">
            <span className="typo-heading-20-sb text-primary-500">
              2,000,000
            </span>
            <span className="typo-title-16-r text-primary-500">원</span>
          </div>
        </div>
      </div>
    </div>
  )
}
