import { useState } from 'react'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Select,
} from '@dessert/ui'

import { CourierName } from '@/entity/order/order.type'

const COURIER_OPTIONS: Array<{ label: string; value: string }> = [
  { label: 'CJ대한통운', value: 'CJ대한통운' },
  { label: '롯데택배', value: '롯데택배' },
  { label: '한진택배', value: '한진택배' },
  { label: '로젠택배', value: '로젠택배' },
  { label: '우체국택배', value: '우체국택배' },
  { label: 'CJ대한통운(국제택배)', value: 'CJ대한통운(국제택배)' },
  { label: 'CU편의점택배', value: 'CU편의점택배' },
  { label: 'GOP당일택배', value: 'GOP당일택배' },
  { label: 'GOS당일택배', value: 'GOS당일택배' },
  { label: 'GPSLOGIX', value: 'GPSLOGIX' },
  { label: 'GSFresh', value: 'GSFresh' },
  { label: 'GSI익스프레스', value: 'GSI익스프레스' },
  { label: 'GSMNTON', value: 'GSMNTON' },
  { label: 'GSPostbox퀵', value: 'GSPostbox퀵' },
  { label: 'GSPostbox택배', value: 'GSPostbox택배' },
  { label: '기타', value: '기타' },
]

interface TrackingNumberModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  defaultCourier?: CourierName | null
  defaultTrackingNumber?: string | null
  onConfirm: (courier: CourierName, trackingNumber: string) => void
}

export function TrackingNumberModal({
  open,
  onOpenChange,
  mode,
  defaultCourier = null,
  defaultTrackingNumber = null,
  onConfirm,
}: TrackingNumberModalProps) {
  const [courier, setCourier] = useState<string>(defaultCourier ?? '')
  const [trackingNumber, setTrackingNumber] = useState(
    defaultTrackingNumber ?? '',
  )

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setCourier(defaultCourier ?? '')
      setTrackingNumber(defaultTrackingNumber ?? '')
    }
    onOpenChange(nextOpen)
  }

  const isValid = courier !== '' && trackingNumber.length > 0

  const hasChanged =
    mode === 'edit'
      ? courier !== (defaultCourier ?? '') ||
        trackingNumber !== (defaultTrackingNumber ?? '')
      : true

  const canConfirm = isValid && hasChanged

  const handleTrackingNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setTrackingNumber(value)
  }

  const handleConfirm = () => {
    if (!canConfirm) return
    onConfirm(courier as CourierName, trackingNumber)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[562px] sm:max-w-[562px]">
        <DialogHeader>
          <DialogTitle showCloseButton>
            {mode === 'create' ? '운송장 입력' : '운송장 수정'}
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-8">
          <Select
            label="택배사"
            options={COURIER_OPTIONS}
            value={courier}
            onValueChange={setCourier}
            placeholder="전체"
            className="w-[186px] shrink-0"
          />
          <Input
            label="운송장 번호"
            placeholder="운송장 번호를 입력해주세요."
            value={trackingNumber}
            onChange={handleTrackingNumberChange}
            maxLength={20}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button title="취소" variant="secondary-outlined" />
          </DialogClose>
          <Button
            title="확인"
            variant="primary-filled"
            disabled={!canConfirm}
            onClick={handleConfirm}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
