import { useQuery } from '@tanstack/react-query'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@dessert/ui'

import { orderQueries } from '@/entity/order/order.query'
import { OrderDetail } from '@/entity/order/order.type'

import { OrderAccordionItem } from './order-accordion-item.ui'

interface OrderDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  orderNumbers: string[]
}

function groupByOrderNumber(details: OrderDetail[]) {
  const map = new Map<string, OrderDetail[]>()
  for (const detail of details) {
    const group = map.get(detail.orderNumber) ?? []
    group.push(detail)
    map.set(detail.orderNumber, group)
  }
  return Array.from(map.entries())
}

export function OrderDetailModal({
  open,
  onOpenChange,
  orderNumbers,
}: OrderDetailModalProps) {
  const { data } = useQuery({
    ...orderQueries.detail(orderNumbers),
    enabled: open && orderNumbers.length > 0,
  })

  const grouped = groupByOrderNumber(data ?? [])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!grid-rows-[auto_1fr] h-[756px] max-h-[90vh] w-[900px] max-w-[900px] gap-0 p-0 sm:max-w-[900px]">
        <DialogHeader className="px-20 pb-12 pt-16">
          <DialogTitle showCloseButton>주문 상세</DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto rounded-b-16 bg-white px-20 py-12">
          <div className="space-y-12">
            {grouped.map(([orderNumber, details], index) => (
              <OrderAccordionItem
                key={orderNumber}
                orderNumber={orderNumber}
                details={details}
                defaultOpen={index === 0}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
