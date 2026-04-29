import { useState } from 'react'

import { toast } from '@dessert/ui'

import type { CourierName, OrderItem } from '@/entity/order/order.type'

import { useCreateShipmentMutation } from './create-shipment.mutation'
import { useUpdateShipmentMutation } from './update-shipment.mutation'

type TrackingMode = 'create' | 'edit'

// 표시용(orderNumber)과 API 식별자(orderId/orderItemIds)를 분리해 보관한다.
// 호출부에서 두 값을 명시적으로 전달하므로, 향후 백엔드가 목록 응답에 ID를 노출하면
// hook 내부 변경 없이 호출부 한 곳만 수정하면 됨.
export interface TrackingTarget {
  orderNumber: string
  orderId: number
  orderItemIds: number[]
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

  const open = (nextMode: TrackingMode, next: TrackingTarget) => {
    setMode(nextMode)
    setTarget(next)
    setIsOpen(true)
  }

  const handleConfirm = (courier: CourierName, trackingNumber: string) => {
    if (!target) return

    if (!Number.isFinite(target.orderId) || target.orderItemIds.length === 0) {
      toast.error('유효하지 않은 주문 정보입니다.')
      return
    }

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
          // 부분 성공: 모달을 닫아 재시도 시 성공 건이 중복 전송되는 것을 막는다.
          toast.success(`${successCount}건 등록 성공, ${failCount}건 실패`)
          setIsOpen(false)
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
