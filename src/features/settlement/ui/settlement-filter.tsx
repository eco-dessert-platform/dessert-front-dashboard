import { DatePicker } from '@/shared/components/blocks/date-picker/date-picker'
import Button from '@/shared/components/ui/button/button'
import Input from '@/shared/components/ui/input/input'
import Select from '@/shared/components/ui/select/select'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'

const DATE_TYPE_OPTIONS = [
  { label: '정산예정일', value: 'expectedDate' },
  { label: '정산기준일', value: 'baseDate' },
  { label: '정산완료일', value: 'completedDate' },
]

const SEARCH_TYPE_OPTIONS = [
  { label: '주문번호', value: 'orderNumber' },
  { label: '상품주문번호', value: 'productOrderNumber' },
]

export const SettlementFilter = () => {
  const [dateType, setDateType] = useState('expectedDate')
  const [dateValue, setDateValue] = useState<DateRange | undefined>(undefined)
  const [searchType, setSearchType] = useState('orderNumber')
  const [searchKeyword, setSearchKeyword] = useState('')

  return (
    <div className="flex items-end gap-16 rounded-12 border border-gray-100 bg-white p-24">
      <div className="flex items-end gap-8">
        <div className="w-[150px]">
          <Select
            label="조회기간"
            options={DATE_TYPE_OPTIONS}
            value={dateType}
            onValueChange={setDateType}
            placeholder="기준일 선택"
          />
        </div>
        <div className="w-[228px]">
          <DatePicker
            label=""
            value={dateValue}
            onChange={(range) => {
              setDateValue(range)
            }}
          />
        </div>
      </div>

      <div className="flex items-end gap-8">
        <div className="w-[150px]">
          <Select
            label="검색구분"
            options={SEARCH_TYPE_OPTIONS}
            value={searchType}
            onValueChange={setSearchType}
            placeholder="검색조건 선택"
          />
        </div>
        <div className="flex-1">
          <Input
            placeholder="검색어를 입력해주세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
        <Button
          title="조회"
          variant="primary-filled"
          size="md"
          className="h-[38px] min-w-[60px]"
        />
      </div>
    </div>
  )
}
