import { VariantProps } from 'class-variance-authority'
import {
  DeliveryStatus,
  OrderStatus,
  OrderStatusTab,
  SearchType,
} from './order.type'
import { BadgeVariants } from '@/shared/components/ui/badge/badge'

export const ORDER_STATUS_TABS: Array<{
  value: OrderStatusTab
  label: string
}> = [
  { value: 'all', label: '전체' },
  { value: 'paymentCompleted', label: '결제완료' },
  { value: 'orderConfirmed', label: '발주확인' },
  { value: 'productShipped', label: '상품발송' },
  { value: 'deliveryCompleted', label: '배송완료' },
  { value: 'canceled', label: '취소' },
  { value: 'returned', label: '반품' },
  { value: 'exchanged', label: '교환' },
]

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PAYMENT_COMPLETED: '결제완료',
  ORDER_CONFIRMED: '발주확인',
  PRODUCT_SHIPPED: '상품발송',
  DELIVERY_COMPLETED: '배송완료',
  CANCELED: '취소',
  RETURNED: '반품',
  EXCHANGED: '교환',
}

export const ORDER_STATUS_BADGE_COLOR: Record<
  OrderStatus,
  VariantProps<typeof BadgeVariants>['color']
> = {
  PAYMENT_COMPLETED: 'gray',
  ORDER_CONFIRMED: 'yellow',
  PRODUCT_SHIPPED: 'green',
  DELIVERY_COMPLETED: 'green',
  CANCELED: 'red',
  RETURNED: 'grayDark',
  EXCHANGED: 'grayDark',
}

export const SEARCH_TYPE_OPTIONS: Array<{
  value: SearchType
  label: string
}> = [
  { value: 'ORDER_NUMBER', label: '주문번호' },
  { value: 'RECIPIENT_NAME', label: '수취인명' },
  { value: 'PRODUCT_NAME', label: '상품명' },
  { value: 'TRACKING_NUMBER', label: '송장번호' },
]

export const DELIVERY_STATUS_OPTIONS: Array<{
  value: DeliveryStatus
  label: string
}> = [
  { value: 'PRODUCT_PREPARING', label: '상품준비' },
  { value: 'COLLECTING', label: '수거중' },
  { value: 'COLLECT_COMPLETED', label: '수거완료' },
  { value: 'DELIVERING', label: '배송중' },
  { value: 'DELIVERY_COMPLETED', label: '배송완료' },
]

export const DELIVERY_STATUS_LABELS: Record<DeliveryStatus, string> = {
  PRODUCT_PREPARING: '상품준비',
  COLLECTING: '수거중',
  COLLECT_COMPLETED: '수거완료',
  DELIVERING: '배송중',
  DELIVERY_COMPLETED: '배송완료',
}
