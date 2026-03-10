import { format, parse } from 'date-fns'
import { DateRange } from 'react-day-picker'

import {
  SettlementDateType,
  SettlementFilters,
  SettlementSearchType,
} from '@/entity/settlement/types'
import { DatePicker } from '@/shared/block/date-picker/date-picker'
import Button from '@/shared/ui/button/button'
import Input from '@/shared/ui/input/input'
import Select from '@/shared/ui/select/select'

import { DATE_TYPE_OPTIONS, SEARCH_TYPE_OPTIONS } from './schema/contracts'

interface SettlementFilterProps {
  filters: SettlementFilters
  onChange: (filters: SettlementFilters) => void
  onSearch: () => void
}

export const SettlementFilter = ({
  filters,
  onChange,
  onSearch,
}: SettlementFilterProps) => {
  const dateValue: DateRange | undefined =
    filters.startDate && filters.endDate
      ? {
          from: parse(filters.startDate, 'yyyy-MM-dd', new Date()),
          to: parse(filters.endDate, 'yyyy-MM-dd', new Date()),
        }
      : undefined

  return (
    <div className="flex items-end gap-16 rounded-12 border border-gray-100 bg-white p-24">
      <div className="flex items-end gap-8">
        <div className="w-[150px]">
          <Select
            label="조회기간"
            options={DATE_TYPE_OPTIONS}
            value={filters.dateType}
            onValueChange={(val) =>
              onChange({ ...filters, dateType: val as SettlementDateType })
            }
            placeholder="기준일 선택"
          />
        </div>
        <div className="w-[228px]">
          <DatePicker
            label=""
            value={dateValue}
            onChange={(range) => {
              onChange({
                ...filters,
                startDate: range?.from
                  ? format(range.from, 'yyyy-MM-dd')
                  : null,
                endDate: range?.to ? format(range.to, 'yyyy-MM-dd') : null,
              })
            }}
          />
        </div>
      </div>

      <div className="flex items-end gap-8">
        <div className="w-[150px]">
          <Select
            label="검색구분"
            options={SEARCH_TYPE_OPTIONS}
            value={filters.searchType}
            onValueChange={(val) =>
              onChange({ ...filters, searchType: val as SettlementSearchType })
            }
            placeholder="검색조건 선택"
          />
        </div>
        <div className="flex-1">
          <Input
            placeholder="검색어를 입력해주세요"
            value={filters.keyword}
            onChange={(e) => onChange({ ...filters, keyword: e.target.value })}
          />
        </div>
        <Button
          title="조회"
          variant="primary-filled"
          size="md"
          className="h-[38px] min-w-[60px]"
          onClick={onSearch}
        />
      </div>
    </div>
  )
}
