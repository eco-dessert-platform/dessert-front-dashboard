import { useState } from 'react'

import { Button } from '@dessert/ui'
import { format, subDays } from 'date-fns'
import { DateRange } from 'react-day-picker'

import { DatePicker } from '@/widgets/date-picker'

export interface ChargeFilterValue {
  startDate: string | null
  endDate: string | null
}

interface IChargeFilterProps {
  onSearch: (filters: ChargeFilterValue) => void
  children: React.ReactNode
}

const ChargeFilter = ({ onSearch, children }: IChargeFilterProps) => {
  const [selectedDateValue, setSelectedDateValue] = useState<
    DateRange | undefined
  >(() => {
    const today = new Date()

    return {
      from: subDays(today, 7),
      to: today,
    }
  })

  return (
    <div className="flex items-center justify-between rounded-12 border border-gray-100 bg-white py-16 px-24">
      <div className="flex items-end gap-8 w-[306px]">
        <DatePicker
          label="조회기간"
          value={selectedDateValue}
          onChange={setSelectedDateValue}
        />

        {/* h-[42px] w-[70px] 에 맞는 버튼 사이즈가 없어서 임시 처리
         * 디자인팀에게게 버튼 사이즈 추가 요청 or 버튼 사이즈 통일화 요청이 필요
         */}
        <Button
          title="조회"
          variant="primary-filled"
          size="lg"
          className="max-h-[42px] min-w-[70px]"
          onClick={() =>
            onSearch({
              startDate: selectedDateValue?.from
                ? format(selectedDateValue.from, 'yyyy-MM-dd')
                : null,
              endDate: selectedDateValue?.to
                ? format(selectedDateValue.to, 'yyyy-MM-dd')
                : null,
            })
          }
        />
      </div>
      {children}
    </div>
  )
}

export default ChargeFilter
