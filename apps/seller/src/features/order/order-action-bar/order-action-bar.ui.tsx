import { Button, Pagination } from '@dessert/ui'

import { ORDER_ACTION_BAR_CONFIG } from '@/entity/order/order.constant'
import {
  ActionButton,
  OrderAction,
  OrderStatusTab,
} from '@/entity/order/order.type'

interface OrderActionBarProps {
  tab: OrderStatusTab
  onAction: (action: OrderAction) => void
  selectedCount: number // 선택된 주문 수
  totalCount: number // 전체 주문 수
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void // 페이지네이션 버튼 이벤트 핸드러
}

export function OrderActionBar({
  tab,
  onAction,
  selectedCount,
  totalCount,
  currentPage,
  totalPages,
  onPageChange,
}: OrderActionBarProps) {
  const buttons = ORDER_ACTION_BAR_CONFIG[tab]

  return (
    <div className="flex h-14.5 items-center justify-between px-24 py-16">
      <div className="flex items-center gap-16">
        <OrderActionButton buttons={buttons} onAction={onAction} />
        <div className="flex items-center gap-4">
          <span>
            <span className="typo-title-14-r text-gray-700">선택 </span>
            <span className="typo-title-14-m text-primary-500">
              {selectedCount}개
            </span>
          </span>
          <div className="inline-block h-12 w-2 bg-gray-400" />
          <span className="text-gray-700">
            <span className="typo-title-14-r">전체 </span>
            <span className="typo-title-14-m">{totalCount}개</span>
          </span>
        </div>
      </div>

      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  )
}

interface OrderActionButtonProps {
  buttons: ActionButton[]
  onAction: (action: OrderAction) => void
}

function OrderActionButton({ buttons, onAction }: OrderActionButtonProps) {
  return (
    <div className="flex items-center gap-10">
      {buttons.map((button, index) => {
        if (button.type === 'single') {
          return (
            <Button
              key={`${button.label}_${index}`}
              title={button.label}
              variant={button.variant}
              size="sm"
              onClick={() => onAction(button.action)}
            />
          )
        }

        return (
          <div
            key={index}
            className="flex overflow-clip rounded-6 border border-gray-200"
          >
            {button.items.map((item) => (
              <Button
                key={item.action}
                title={item.label}
                variant="secondary-outlined"
                size="sm"
                onClick={() => onAction(item.action)}
                className="h-auto min-w-0 rounded-none border-0 border-r border-gray-200 px-10 py-6 text-gray-800 last:border-r-0"
              />
            ))}
          </div>
        )
      })}
    </div>
  )
}
