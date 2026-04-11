import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@dessert/ui'

interface OrderSelectAlertModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OrderSelectAlertModal({
  open,
  onOpenChange,
}: OrderSelectAlertModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>주문을 선택해주세요.</DialogTitle>
          <DialogDescription>
            상세 주문정보를 확인하려면 주문 체크박스를 선택해주세요.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button title="확인" variant="secondary-filled" />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
