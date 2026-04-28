import { useState } from 'react'

import { toast } from '@dessert/ui'

import type { CourierName, OrderItem } from '@/entity/order/order.type'

import { useCreateShipmentMutation } from './create-shipment.mutation'
import { useUpdateShipmentMutation } from './update-shipment.mutation'

type TrackingMode = 'create' | 'edit'

interface TrackingTarget {
  orderId: number
  orderItemIds: number[]
  orderNumber: string
  courier?: CourierName | null
  trackingNumber?: string | null
}

export function useTrackingFlow(orders: OrderItem[]) {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<TrackingMode>('create')
  const [target, setTarget] = useState<TrackingTarget | null>(null)

  const createShipmentMutation = useCreateShipmentMutation()
  const updateShipmentMutation = useUpdateShipmentMutation()

  const isPending =
    createShipmentMutation.isPending || updateShipmentMutation.isPending

  const open = (
    nextMode: TrackingMode,
    orderId: number,
    courier?: CourierName | null,
    trackingNumber?: string | null,
  ) => {
    const order = orders.find((o) => o.orderId === orderId)
    if (!order) {
      toast.error('주문 정보를 찾을 수 없습니다.')
      return
    }

    setMode(nextMode)
    setTarget({
      orderId,
      orderItemIds: order.products.map((p) => p.orderItemId),
      orderNumber: order.orderNumber,
      courier,
      trackingNumber,
    })
    setIsOpen(true)
  }

  const handleConfirm = (courier: CourierName, trackingNumber: string) => {
    if (!target) return

    const payload = {
      orderId: target.orderId,
      orderItemIds: target.orderItemIds,
      courierName: courier,
      trackingNumber,
    }

    if (mode === 'edit') {
      updateShipmentMutation.mutate(payload, {
        onSuccess: () => {
          toast.success('운송장 정보가 수정되었습니다.')
          setIsOpen(false)
        },
        onError: () => toast.error('운송장 수정에 실패했습니다.'),
      })
      return
    }

    createShipmentMutation.mutate(payload, {
      onSuccess: (result) => {
        const { successCount, failCount } = result.summary
        if (failCount === 0) {
          toast.success('운송장 정보가 저장되었습니다.')
          setIsOpen(false)
        } else if (successCount > 0) {
          toast.success(`${successCount}건 등록 성공, ${failCount}건 실패`)
        } else {
          toast.error('운송장 저장에 실패했습니다.')
        }
      },
      onError: () => toast.error('운송장 저장에 실패했습니다.'),
    })
  }

  return {
    isOpen,
    setIsOpen,
    mode,
    target,
    open,
    handleConfirm,
    isPending,
  }
}
