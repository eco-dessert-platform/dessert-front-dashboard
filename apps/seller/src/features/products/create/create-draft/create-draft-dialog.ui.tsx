import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@dessert/ui'

interface CreateDraftDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function CreateDraftDialog({
  isOpen,
  onClose,
  onConfirm,
}: CreateDraftDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>임시저장된 내용이 있어요</DialogTitle>
          <DialogDescription>
            작성 중이던 상품 등록 페이지가 있어요. <br />
            불러올까요? 취소하면 기존에 등록된 페이지는
            <br /> 삭제됩니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            title="취소"
            variant="secondary-outlined"
            onClick={onClose}
            className="flex-1"
          />
          <Button
            title="확인"
            variant="secondary-filled"
            onClick={onConfirm}
            className="flex-1"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
