import { OrderFilters, OrderStatusTab } from '@/entity/order/order.type'
import { useState } from 'react'

const createInitialState = (initialTab: OrderStatusTab): OrderFilters => ({
  tab: initialTab,
  searchType: 'ORDER_NUMBER',
  sort: 'DESC',
  searchKeyword: '',
  deliveryStatus: 'PRODUCT_PREPARING',
  size: '10',
})

export function useOrderFilter(initialTab: OrderStatusTab) {
  const [filters, setFilters] = useState<OrderFilters>(
    createInitialState(initialTab),
  )

  const reset = () => setFilters(createInitialState(initialTab))

  return { filters, setFilters, reset }
}
