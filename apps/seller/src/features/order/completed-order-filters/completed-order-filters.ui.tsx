import { Button, Select } from '@dessert/ui'
import { format, parseISO } from 'date-fns'

import ResetIcon from '@/assets/icons/reset.svg?react'
import {
  COMPLETED_ORDER_STATUS_OPTIONS,
  SEARCH_TYPE_OPTIONS,
} from '@/entity/order/order.constant'
import type {
  CompletedOrderFilters,
  CompletedOrderStatus,
  SearchType,
} from '@/entity/order/order.type'
import { cn } from '@/shared/libs/utils'
import { DatePicker } from '@/widgets/date-picker'
import { InputField } from '@/widgets/input-field'

interface CompletedOrderFiltersProps {
  filters: CompletedOrderFilters
  onFiltersChange: (filters: CompletedOrderFilters) => void
  onSearch: () => void
  onReset: () => void
}

export function CompletedOrderFilters({
  filters,
  onFiltersChange,
  onSearch,
  onReset,
}: CompletedOrderFiltersProps) {
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
            label="주문상태"
            options={COMPLETED_ORDER_STATUS_OPTIONS}
            value={filters.orderStatus}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                orderStatus: value as CompletedOrderStatus,
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
    <Button
      title="초기화"
      variant="secondary-outlined"
      size="sm"
      rightIcon={<ResetIcon className="text-gray-800" />}
      onClick={onClick}
      className="h-auto min-w-0 gap-0 rounded-none border-0 bg-transparent p-0 text-gray-800 hover:border-transparent hover:bg-transparent focus-visible:border-transparent focus-visible:bg-transparent active:border-transparent active:bg-transparent"
    />
  )
}
