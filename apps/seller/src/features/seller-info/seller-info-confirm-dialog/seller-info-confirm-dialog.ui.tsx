import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@dessert/ui'

interface SellerInfoConfirmDialogProps {
  open: boolean
  title: string
  description: string
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
}

export function SellerInfoConfirmDialog({
  open,
  title,
  description,
  onOpenChange,
  onConfirm,
  onCancel,
  confirmText = '확인',
  cancelText = '취소',
}: SellerInfoConfirmDialogProps) {
  const handleCancel = () => {
    onCancel?.()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="h-[174px] w-[334px] min-w-0 gap-0 rounded-16 border-none p-24"
      >
        <DialogHeader className="gap-8">
          <DialogTitle className="typo-heading-24-m">{title}</DialogTitle>
          <DialogDescription className="typo-title-16-r text-gray-700">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-auto flex-row justify-end gap-8">
          <Button
            title={cancelText}
            variant="secondary-outlined"
            size="md"
            onClick={handleCancel}
          />
          <Button
            title={confirmText}
            variant="secondary-filled"
            size="md"
            onClick={onConfirm}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
