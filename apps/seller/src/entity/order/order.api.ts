import { client } from '@/shared/utils/axios'

import { OrderFilters, OrderListResponse } from './order.type'

export async function getOrders(
  filters: OrderFilters,
): Promise<OrderListResponse> {
  const { tab, page, size, sort, searchKeyword, startDate, endDate, searchType, deliveryStatus, ...rest } = filters

  const today = new Date().toISOString().split('T')[0]

  const TAB_TO_STATUS: Record<string, string> = {
    all: 'NONE',
    paymentCompleted: 'PAYMENT_COMPLETED',
    orderConfirmed: 'ORDER_CONFIRMED',
    productShipped: 'PRODUCT_SHIPPED',
    deliveryCompleted: 'DELIVERY_COMPLETED',
    canceled: 'CANCELED',
    returned: 'RETURNED',
    exchanged: 'EXCHANGED',
  }

  const { data } = await client.post<OrderListResponse>(
    '/api/v1/seller/orders/list',
    {
      orderStatus: TAB_TO_STATUS[tab ?? 'all'] ?? 'NONE',
      searchType: searchType ?? 'BUYER_NAME',
      keywords: searchKeyword ? [searchKeyword] : [],
      isMultipleSearch: false,
      startDate: startDate ?? today,
      endDate: endDate ?? today,
    },
    {
      params: { page: page ?? 0, size: size ?? 100, sort: sort ?? 'orderDate,DESC' },
    },
  )
  console.log('orders response:', data)
  return data
}
