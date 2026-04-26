import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@dessert/ui'

import { useDecideUploadApprovalMutation } from './upload-approval.mutation'

interface UploadApprovalConfirmDialogProps {
  boardId: number | null
  onClose: () => void
}

export const UploadApprovalConfirmDialog = ({
  boardId,
  onClose,
}: UploadApprovalConfirmDialogProps) => {
  const { mutate, isPending } = useDecideUploadApprovalMutation()

  const handleClose = () => {
    if (isPending) return
    onClose()
  }

  const handleConfirm = () => {
    if (!boardId) return
    mutate(
      { boardId, body: { decisionType: 'APPROVE' } },
      { onSuccess: handleClose },
    )
  }

  return (
    <Dialog open={boardId !== null} onOpenChange={handleClose}>
      <DialogContent
        className="w-83.5 gap-0 sm:max-w-83.5"
        showCloseButton={false}
      >
        <DialogHeader className="gap-0 px-5 pb-0">
          <DialogTitle className="typo-heading-24-m text-gray-800">
            상품을 승인할까요?
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="px-5 pt-12 pb-24 typo-title-16-r text-gray-700">
          승인 후에는 취소가 불가능합니다. 신중하게 검토 후 승인해 주세요.
        </DialogDescription>
        <DialogFooter>
          <Button
            title="취소"
            size="md"
            variant="secondary-outlined"
            onClick={handleClose}
            disabled={isPending}
          />
          <Button
            title="확인"
            size="md"
            variant="secondary-filled"
            onClick={handleConfirm}
            disabled={isPending}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
