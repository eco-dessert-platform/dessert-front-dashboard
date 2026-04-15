import { useState } from 'react'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Select,
  Textarea,
  toast,
} from '@dessert/ui'

import { ImageUploadGrid } from './image-upload-grid.ui'
import {
  REASON_MODAL_TITLE,
  REASON_TOAST_MESSAGE,
  REASON_TYPE_OPTIONS,
  ReasonAction,
} from './reason-input-modal.constant'

const MIN_LENGTH = 10
const MAX_LENGTH = 2000

interface ReasonInputModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  action: ReasonAction
  onConfirm: (data: {
    reasonType: string
    reasonDetail: string
    images: File[]
  }) => void
}

export function ReasonInputModal({
  open,
  onOpenChange,
  action,
  onConfirm,
}: ReasonInputModalProps) {
  const [reasonType, setReasonType] = useState('')
  const [reasonDetail, setReasonDetail] = useState('')
  const [images, setImages] = useState<File[]>([])

  const title = REASON_MODAL_TITLE[action]
  const options = REASON_TYPE_OPTIONS[action]
  const toastMessage = REASON_TOAST_MESSAGE[action]

  const isValid =
    reasonType !== '' && reasonDetail.length >= MIN_LENGTH

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setReasonType('')
      setReasonDetail('')
      setImages([])
    }
    onOpenChange(nextOpen)
  }

  const handleConfirm = () => {
    if (!isValid) return
    onConfirm({ reasonType, reasonDetail, images })
    toast.success(toastMessage)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[668px] sm:max-w-[668px]">
        <DialogHeader>
          <DialogTitle showCloseButton>{title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-8">
          <Select
            options={options}
            value={reasonType}
            onValueChange={setReasonType}
            placeholder="구분"
            className="w-[186px]"
          />

          <Textarea
            placeholder="내용을 자세하게 입력해주세요."
            value={reasonDetail}
            onChange={(e) => setReasonDetail(e.target.value)}
            maxLength={MAX_LENGTH}
            showCount
            helperText="10자 이상 사유를 작성해주세요"
          />
        </div>

        <ImageUploadGrid images={images} onChange={setImages} />

        <DialogFooter>
          <DialogClose asChild>
            <Button title="취소" variant="secondary-outlined" />
          </DialogClose>
          <Button
            title="확인"
            variant="primary-filled"
            disabled={!isValid}
            onClick={handleConfirm}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
