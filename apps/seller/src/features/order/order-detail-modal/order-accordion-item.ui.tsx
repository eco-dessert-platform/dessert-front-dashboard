import { useState } from 'react'

import { ChevronDownIcon } from '@dessert/icons'
import { Badge } from '@dessert/ui'

import { ORDER_STATUS_BADGE_COLOR } from '@/entity/order/order.constant'
import { OrderDetail, OrderStatus } from '@/entity/order/order.type'

import { DetailRow } from './detail-row.ui'

const LABEL_TO_STATUS: Record<string, OrderStatus> = {
  결제완료: 'PAYMENT_COMPLETED',
  발주확인: 'ORDER_CONFIRMED',
  상품발송: 'PRODUCT_SHIPPED',
  배송완료: 'DELIVERY_COMPLETED',
  취소: 'CANCELED',
  반품: 'RETURNED',
  교환: 'EXCHANGED',
}

interface OrderAccordionItemProps {
  orderNumber: string
  details: OrderDetail[]
  defaultOpen?: boolean
}

export function OrderAccordionItem({
  orderNumber,
  details,
  defaultOpen = false,
}: OrderAccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const { orderInfo, buyer, shipping } = details[0]
  const statusKey = LABEL_TO_STATUS[orderInfo.orderStatusLabel]
  const totalAmount = details.reduce(
    (sum, d) => sum + d.orderItem.totalPrice,
    0,
  )

  return (
    <div className="overflow-hidden rounded-10 border border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between bg-gray-050 px-16 py-20"
      >
        <div className="flex items-center gap-30">
          <div className="flex items-center gap-10">
            <span className="rounded-4 border border-gray-300 bg-white px-8 py-2 typo-title-14-m text-gray-800">
              주문일
            </span>
            <span className="typo-title-16-r text-gray-800">
              {orderInfo.orderDate}
            </span>
          </div>
          <div className="flex items-center gap-10">
            <span className="rounded-4 border border-gray-300 bg-white px-8 py-2 typo-title-14-m text-gray-800">
              주문번호
            </span>
            <div className="flex items-center gap-6">
              <span className="typo-title-16-r text-gray-800">
                {orderNumber}
              </span>
              {statusKey && (
                <Badge
                  content={orderInfo.orderStatusLabel}
                  variant="outline"
                  color={ORDER_STATUS_BADGE_COLOR[statusKey]}
                />
              )}
            </div>
          </div>
        </div>

        <ChevronDownIcon
          className={`size-24 shrink-0 text-gray-800 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="flex flex-col gap-12 bg-gray-100 p-12">
          {/* 주문 정보 */}
          <div className="rounded-10 border border-gray-200 bg-white px-20 pb-24 pt-20">
            <h3 className="mb-24 typo-heading-18-b text-gray-900">주문 정보</h3>
            <div className="flex flex-col gap-4">
              {details.map((detail, idx) => (
                <div
                  key={idx}
                  className="flex h-22 items-center gap-10"
                >
                  <div className="flex flex-1 items-center gap-10">
                    <span className="max-w-[400px] truncate typo-title-14-r text-gray-900">
                      {detail.orderItem.boardTitle}
                    </span>
                    <span className="typo-body-12-r text-gray-500">
                      {detail.orderItem.itemName} / {detail.orderItem.quantity}개
                    </span>
                  </div>
                  <span className="w-80 text-right typo-body-12-b text-gray-800">
                    {detail.orderItem.totalPrice.toLocaleString()}원
                  </span>
                </div>
              ))}
            </div>

            <div className="my-12 border-t border-gray-200" />

            <div className="flex items-center gap-8">
              <span className="w-90 typo-title-14-sb text-gray-600">
                총 구매금액
              </span>
              <span className="flex-1 text-right typo-title-16-sb text-primary-500">
                {totalAmount.toLocaleString()}원
              </span>
            </div>
          </div>

          {/* 구매자 정보 + 배송 정보 */}
          <div className="flex min-w-0 items-start gap-12">
            {/* 구매자 정보 */}
            <div className="min-w-0 flex-1 rounded-10 border border-gray-200 bg-white px-20 pb-24 pt-20">
              <h3 className="mb-24 typo-heading-18-b text-gray-900">
                구매자 정보
              </h3>
              <div className="flex flex-col gap-12">
                <DetailRow
                  label="수취인명"
                  value={buyer.recipientName}
                  labelWidth="w-60"
                />
                <div className="flex items-start gap-8 typo-title-14-r">
                  <span className="w-60 shrink-0 typo-title-14-m text-gray-600">
                    연락처
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-4 text-right text-gray-800">
                    <span>{buyer.buyerPhone1}</span>
                    {buyer.buyerPhone2 && <span>{buyer.buyerPhone2}</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* 배송 정보 */}
            <div className="w-[400px] shrink-0 rounded-10 border border-gray-200 bg-white px-20 pb-24 pt-20">
              <h3 className="mb-24 typo-heading-18-b text-gray-900">
                배송 정보
              </h3>
              <div className="flex flex-col gap-12">
                <DetailRow
                  label="배송상태"
                  value={shipping.statusLabel}
                  labelWidth="w-[110px]"
                />
                <DetailRow
                  label="택배사/운송장 번호"
                  value={
                    shipping.courierCompany && shipping.trackingNumber
                      ? `${shipping.courierCompany} / ${shipping.trackingNumber}`
                      : '-'
                  }
                  labelWidth="w-[110px]"
                />
                <DetailRow
                  label="배송비"
                  value={`${shipping.shippingFee.toLocaleString()}원`}
                  labelWidth="w-[110px]"
                />
                <DetailRow
                  label="배송주소"
                  value={shipping.address}
                  labelWidth="w-[110px]"
                />
                <DetailRow
                  label="배송요청사항"
                  value={shipping.memo ?? '-'}
                  labelWidth="w-[110px]"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
