import {
  DELIVERY_STATUS_OPTIONS,
  SEARCH_TYPE_OPTIONS,
} from '@/entity/order/order.constant'
import type {
  DeliveryStatus,
  OrderFilters,
  SearchType,
} from '@/entity/order/order.type'
import { DatePicker } from '@/shared/components/blocks/date-picker/date-picker'
import Select from '@/shared/components/ui/select/select'
import { format, parseISO } from 'date-fns'
import ResetIcon from '@/assets/icons/reset.svg?react'
import { cn } from '@/shared/lib/utils'
import InputField from '@/shared/components/blocks/input-field/input-field'

interface OrderFiltersProps {
  filters: OrderFilters // draftFilters (UI 표시용)
  onFiltersChange: (filters: OrderFilters) => void // draftFilters 업데이트 이벤트 핸들러
  onSearch: () => void // 조회 버튼 클릭 → apply() 호출 이벤트 핸들러
  onReset: () => void // draftFilters, appliedFilters 두 state 모두 reset 이벤트 핸들러
}

export function OrderFilters({
  filters,
  onFiltersChange,
  onSearch,
  onReset,
}: OrderFiltersProps) {
  return (
    <div
      className={cn(
        'flex flex-col',
        'mt-20 h-32.25 px-24 py-16',
        'justify-center rounded-10 border bg-white',
      )}
    >
      <div className={cn('order-2 flex h-full items-end gap-16')}>
        <div className="w-57 shrink-0">
          <DatePicker
            label="조회기간"
            value={
              filters.startDate
                ? {
                    from: parseISO(filters.startDate),
                    to: filters.endDate ? parseISO(filters.endDate) : undefined,
                  }
                : undefined
            }
            onChange={(range) =>
              onFiltersChange({
                ...filters,
                startDate: range?.from
                  ? format(range.from, 'yyyy-MM-dd')
                  : undefined,
                endDate: range?.to ? format(range.to, 'yyyy-MM-dd') : undefined,
              })
            }
          />
        </div>
        <div className="w-37.5 shrink-0">
          <Select
            label="배송상태"
            options={DELIVERY_STATUS_OPTIONS}
            value={filters.deliveryStatus}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                deliveryStatus: value as DeliveryStatus,
              })
            }
          />
        </div>
        <div className="w-37.5 shrink-0">
          <Select
            label="상세조건"
            options={SEARCH_TYPE_OPTIONS}
            value={filters.searchType}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, searchType: value as SearchType })
            }
          />
        </div>
        {/* min-w-0이 필요한 이유: Flexbox에서 flex-1만 쓰면 내용이 길 때 overflow가 발생할 수 있습니다. min-w-0이 이를 방지합니다. */}
        <div className="flex-1">
          <InputField
            placeholder="1~50자로 입력해주세요."
            onButtonClick={onSearch}
            buttonText="조회"
            value={filters.searchKeyword}
            onChange={(e) =>
              onFiltersChange({ ...filters, searchKeyword: e.target.value })
            }
          />
        </div>
      </div>

      <div className="order-1 flex justify-end">
        <ResetButton onClick={onReset} />
      </div>
    </div>
  )
}

interface ResetButtonProps {
  onClick: () => void
}

function ResetButton({ onClick }: ResetButtonProps) {
  return (
    <button
      type="button"
      className="flex cursor-pointer items-center"
      onClick={onClick}
    >
      <span className="typo-body-12-m text-gray-800">초기화</span>
      <ResetIcon className="text-gray-800" />
    </button>
  )
}
