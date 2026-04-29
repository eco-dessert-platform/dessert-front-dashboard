import { badgeVariants } from '@dessert/ui'
import { VariantProps } from 'class-variance-authority'

import {
  ActionButton,
  CompletedOrderStatus,
  CompletedOrderTab,
  DeliveryStatus,
  ExchangeStatus,
  OrderDeliveryStatusSpec,
  OrderStatus,
  OrderStatusTab,
  ReturnStatus,
  SearchType,
} from './order.type'

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
  VariantProps<typeof badgeVariants>['color']
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

export const RETURN_STATUS_LABELS: Record<ReturnStatus, string> = {
  RETURN_REQUESTED: '반품요청',
  RETURN_APPROVED: '반품승인',
  RETURN_REJECTED: '반품거절',
  PRODUCT_COLLECTING: '상품회수',
  PRODUCT_CHECKING: '상품확인',
  RETURN_IN_PROGRESS: '반품진행',
  RETURN_ON_HOLD: '반품보류',
  RETURN_TURNED_DOWN: '반품반려',
  RETURN_COMPLETED: '반품완료',
}

export const RETURN_STATUS_BADGE_COLOR: Record<
  ReturnStatus,
  VariantProps<typeof badgeVariants>['color']
> = {
  RETURN_REQUESTED: 'gray',
  RETURN_APPROVED: 'green',
  RETURN_REJECTED: 'red',
  PRODUCT_COLLECTING: 'green',
  PRODUCT_CHECKING: 'green',
  RETURN_IN_PROGRESS: 'yellow',
  RETURN_ON_HOLD: 'yellow',
  RETURN_TURNED_DOWN: 'red',
  RETURN_COMPLETED: 'green',
}

export const EXCHANGE_STATUS_LABELS: Record<ExchangeStatus, string> = {
  EXCHANGE_REQUESTED: '교환요청',
  EXCHANGE_APPROVED: '교환승인',
  EXCHANGE_REJECTED: '교환거절',
  PRODUCT_COLLECTING: '상품회수',
  PRODUCT_CHECKING: '상품확인',
  EXCHANGE_IN_PROGRESS: '교환진행',
  EXCHANGE_SHIPPING: '교환배송',
  EXCHANGE_ON_HOLD: '교환보류',
  EXCHANGE_TURNED_DOWN: '교환반려',
  EXCHANGE_COMPLETED: '교환완료',
}

export const EXCHANGE_STATUS_BADGE_COLOR: Record<
  ExchangeStatus,
  VariantProps<typeof badgeVariants>['color']
> = {
  EXCHANGE_REQUESTED: 'gray',
  EXCHANGE_APPROVED: 'green',
  EXCHANGE_REJECTED: 'red',
  PRODUCT_COLLECTING: 'green',
  PRODUCT_CHECKING: 'green',
  EXCHANGE_IN_PROGRESS: 'yellow',
  EXCHANGE_SHIPPING: 'green',
  EXCHANGE_ON_HOLD: 'yellow',
  EXCHANGE_TURNED_DOWN: 'red',
  EXCHANGE_COMPLETED: 'green',
}

export const ORDER_ACTION_BAR_CONFIG: Record<OrderStatusTab, ActionButton[]> = {
  all: [
    {
      type: 'single',
      label: '상세보기',
      variant: 'primary-outlined',
      action: 'detailView',
    },
  ],
  paymentCompleted: [
    {
      type: 'single',
      label: '상세보기',
      variant: 'primary-outlined',
      action: 'detailView',
    },
    {
      type: 'single',
      label: '발주확인',
      variant: 'secondary-outlined',
      action: 'confirmOrder',
    },
    {
      type: 'single',
      label: '주문취소',
      variant: 'secondary-outlined',
      action: 'cancelOrder',
    },
  ],
  orderConfirmed: [
    {
      type: 'single',
      label: '상세보기',
      variant: 'primary-outlined',
      action: 'detailView',
    },
    {
      type: 'single',
      label: '주문취소',
      variant: 'secondary-outlined',
      action: 'cancelOrder',
    },
    {
      type: 'single',
      label: '반품',
      variant: 'secondary-outlined',
      action: 'requestReturn',
    },
    {
      type: 'single',
      label: '교환',
      variant: 'secondary-outlined',
      action: 'requestExchange',
    },
  ],
  productShipped: [
    {
      type: 'single',
      label: '상세보기',
      variant: 'primary-outlined',
      action: 'detailView',
    },
    {
      type: 'single',
      label: '반품',
      variant: 'secondary-outlined',
      action: 'requestReturn',
    },
    {
      type: 'single',
      label: '교환',
      variant: 'secondary-outlined',
      action: 'requestExchange',
    },
  ],
  deliveryCompleted: [
    {
      type: 'single',
      label: '상세보기',
      variant: 'primary-outlined',
      action: 'detailView',
    },
    {
      type: 'single',
      label: '반품',
      variant: 'secondary-outlined',
      action: 'requestReturn',
    },
    {
      type: 'single',
      label: '교환',
      variant: 'secondary-outlined',
      action: 'requestExchange',
    },
  ],
  canceled: [
    {
      type: 'single',
      label: '상세보기',
      variant: 'primary-outlined',
      action: 'detailView',
    },
    {
      type: 'group',
      items: [
        { label: '취소승인', action: 'approveCancellation' },
        { label: '취소거절', action: 'rejectCancellation' },
      ],
    },
  ],
  returned: [
    {
      type: 'single',
      label: '상세보기',
      variant: 'primary-outlined',
      action: 'detailView',
    },
    {
      type: 'group',
      items: [
        { label: '반품승인', action: 'approveReturn' },
        { label: '반품거절', action: 'rejectReturn' },
      ],
    },
    {
      type: 'group',
      items: [
        { label: '반품완료', action: 'completeReturn' },
        { label: '반품반려', action: 'turnDownReturn' },
        { label: '반품보류', action: 'holdReturn' },
      ],
    },
  ],
  exchanged: [
    {
      type: 'single',
      label: '상세보기',
      variant: 'primary-outlined',
      action: 'detailView',
    },
    {
      type: 'group',
      items: [
        { label: '교환승인', action: 'approveExchange' },
        { label: '교환거절', action: 'rejectExchange' },
      ],
    },
    {
      type: 'group',
      items: [
        { label: '교환완료', action: 'completeExchange' },
        { label: '교환반려', action: 'turnDownExchange' },
        { label: '교환보류', action: 'holdExchange' },
      ],
    },
  ],
}

// ─── 완료 주문 내역 ───────────────────────────────────────

export const COMPLETED_ORDER_TABS: Array<{
  value: CompletedOrderTab
  label: string
}> = [
  { value: 'completed', label: '완료' },
  { value: 'canceled', label: '취소' },
  { value: 'returned', label: '반품' },
  { value: 'exchanged', label: '교환' },
]

export const COMPLETED_ORDER_STATUS_OPTIONS: Array<{
  value: CompletedOrderStatus
  label: string
}> = [
  { value: 'ALL', label: '전체' },
  { value: 'PURCHASE_CONFIRMED', label: '구매확정' },
  { value: 'DELIVERY_COMPLETED', label: '배송완료' },
]

export const COMPLETED_ORDER_ACTION_BAR_CONFIG: Record<
  CompletedOrderTab,
  ActionButton[]
> = {
  completed: [
    {
      type: 'single',
      label: '상세보기',
      variant: 'primary-outlined',
      action: 'detailView',
    },
  ],
  canceled: [
    {
      type: 'single',
      label: '상세보기',
      variant: 'primary-outlined',
      action: 'detailView',
    },
  ],
  returned: [
    {
      type: 'single',
      label: '상세보기',
      variant: 'primary-outlined',
      action: 'detailView',
    },
  ],
  exchanged: [
    {
      type: 'single',
      label: '상세보기',
      variant: 'primary-outlined',
      action: 'detailView',
    },
  ],
}

export const DELIVERY_STATUS_MAP: Record<OrderDeliveryStatusSpec, DeliveryStatus> = {
  PREPARING: 'PRODUCT_PREPARING',
  COLLECTING: 'COLLECTING',
  COLLECT_COMPLETED: 'COLLECT_COMPLETED',
  DELIVERING: 'DELIVERING',
  DELIVERY_COMPLETED: 'DELIVERY_COMPLETED',
}

// 다건 mutation을 chunk 단위로 끊어 호출하기 위한 동시성 상한.
export const MUTATION_BATCH_SIZE = 10

export const TAB_TO_STATUS: Partial<Record<OrderStatusTab, OrderStatus>> = {
  paymentCompleted: 'PAYMENT_COMPLETED',
  orderConfirmed: 'ORDER_CONFIRMED',
  productShipped: 'PRODUCT_SHIPPED',
  deliveryCompleted: 'DELIVERY_COMPLETED',
  canceled: 'CANCELED',
  returned: 'RETURNED',
  exchanged: 'EXCHANGED',
}