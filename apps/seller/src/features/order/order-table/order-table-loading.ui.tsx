import { Button } from '@dessert/ui'

import type { OrderTableLoadingMode } from './order-table-loading.hook'

const COPY: Record<OrderTableLoadingMode, { title: string; subtitle: string }> =
  {
    list: {
      title: '주문 목록을 불러오고 있어요',
      subtitle: '잠시만 기다려주세요',
    },
    mutation: {
      title: '선택한 주문의 상태를 변경하고 있습니다',
      subtitle: '잠시만 기다려주세요',
    },
  }

interface OrderTableLoadingProps {
  mode: OrderTableLoadingMode
  onCancel?: () => void
}

export function OrderTableLoading({ mode, onCancel }: OrderTableLoadingProps) {
  const { title, subtitle } = COPY[mode]

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/80">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <span className="size-6 animate-bounce rounded-full bg-primary-500 [animation-delay:-0.3s]" />
          <span className="size-6 animate-bounce rounded-full bg-primary-500 [animation-delay:-0.15s]" />
          <span className="size-6 animate-bounce rounded-full bg-primary-500" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="typo-title-16-sb text-gray-900">{title}</p>
          <p className="typo-body-14-r text-gray-600">{subtitle}</p>
        </div>
        {mode === 'mutation' && onCancel && (
          <Button
            variant="secondary-outlined"
            size="sm"
            title="취소"
            onClick={onCancel}
          />
        )}
      </div>
    </div>
  )
}
