import * as React from 'react'

import { XIcon } from '@dessert/icons'
import * as PopoverPrimitive from '@radix-ui/react-popover'

import { cn } from '@/shared/libs/utils'

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    title?: string
    showClose?: boolean
    width?: string
  }
>(
  (
    {
      className,
      align = 'center',
      sideOffset = 4,
      title,
      showClose = true,
      children,
      width = 'min-w-[375px]',
      ...props
    },
    ref,
  ) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-50 max-w-[900px] rounded-16 border border-gray-200 bg-white shadow-md outline-none',
          width,
          className,
        )}
        {...props}
      >
        <div className="flex flex-col">
          {(title || showClose) && (
            <div className="flex items-center justify-between px-20 py-10">
              {title && (
                <h3 className="typo-heading-24-m text-nowrap text-gray-800">
                  {title}
                </h3>
              )}
              {showClose && (
                <PopoverPrimitive.Close className="cursor-pointer rounded-sm border-none opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none">
                  <XIcon className="size-30 text-gray-800" />
                  <span className="sr-only">Close</span>
                </PopoverPrimitive.Close>
              )}
            </div>
          )}
          <div className="px-20 pb-20">{children}</div>
        </div>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  ),
)
PopoverContent.displayName = PopoverPrimitive.Content.displayName

/**
 * 전용 상세 내역 테이블들
 */

// 1. 공제/환금 상세 테이블 (일별 정산용)
export const DeductionDetailTable = ({
  total,
  shippingFeeChange,
  chargeOffset,
}: {
  total: number
  shippingFeeChange: number
  chargeOffset: number
}) => (
  <div className="border border-gray-200">
    <table className="w-full border-collapse">
      <thead>
        <tr className="h-[52px] border-b border-gray-400 bg-gray-200 typo-body-10-sb text-gray-800">
          <th className="w-[100px] border-r border-gray-200 px-10 align-middle font-semibold">
            공제/환금 합계
          </th>
          <th className="p-0 align-middle font-semibold">
            <div className="flex flex-col">
              <div className="flex h-[26px] items-center justify-center border-b border-gray-200 px-16">
                공제/환급 상세
              </div>
              <div className="flex h-[26px] items-center">
                <div className="flex h-full flex-1 items-center justify-center border-r border-gray-200 px-16">
                  배송비 금액 변동
                </div>
                <div className="flex h-full flex-1 items-center justify-center px-16">
                  충전금 상계
                </div>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="h-[35px] typo-body-10-r text-gray-900">
          <td className="border-r border-gray-200 px-10 text-center align-middle">
            {total.toLocaleString()}
          </td>
          <td className="p-0 align-middle">
            <div className="flex h-full items-center">
              <div className="flex h-[35px] flex-1 items-center justify-center border-r border-gray-200 px-10">
                {shippingFeeChange.toLocaleString()}
              </div>
              <div className="flex h-[35px] flex-1 items-center justify-center px-10">
                {chargeOffset.toLocaleString()}
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
)

// 2. 정산예정금액 상세 테이블 (건별 정산용)
export const TransactionDetailTable = ({
  orderNumber,
  productOrderNumber,
  paymentMethod,
  commissionRate,
  paymentAmount,
  expectedAmount,
}: {
  orderNumber: string
  productOrderNumber: string
  paymentMethod: string
  commissionRate: string
  paymentAmount: number
  expectedAmount: number
}) => (
  <div className="flex flex-col gap-8">
    <div className="flex items-center gap-8 typo-body-12-r text-gray-800">
      <span className="font-normal text-gray-600">주문번호</span>
      <span className="font-medium">{orderNumber}</span>
    </div>
    <div className="border border-gray-200">
      <table className="w-full border-collapse">
        <thead>
          <tr className="h-30 border-b border-gray-400 bg-gray-200 text-center typo-body-10-sb text-gray-800">
            <th className="border-r border-gray-200 px-10 align-middle font-semibold">
              상품주문번호
            </th>
            <th className="border-r border-gray-200 px-10 align-middle font-semibold">
              주결제 수단
            </th>
            <th className="border-r border-gray-200 px-10 align-middle font-semibold">
              수수료율
            </th>
            <th className="border-r border-gray-200 px-10 align-middle font-semibold">
              결제 금액
            </th>
            <th className="px-10 align-middle font-semibold">정산 예정금액</th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-[35px] text-center typo-body-10-r text-gray-900">
            <td className="border-r border-gray-200 px-10 align-middle">
              {productOrderNumber}
            </td>
            <td className="border-r border-gray-200 px-10 align-middle">
              {paymentMethod}
            </td>
            <td className="border-r border-gray-200 px-10 align-middle">
              {commissionRate}
            </td>
            <td className="border-r border-gray-200 px-10 align-middle text-gray-900">
              {paymentAmount.toLocaleString()}
            </td>
            <td className="px-10 align-middle text-gray-900">
              {expectedAmount.toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
