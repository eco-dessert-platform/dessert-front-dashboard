import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@dessert/ui'

interface ConfirmStoreAlertProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  storeName: string
  onCancel: () => void
  onConfirm: () => void
}

export function ConfirmStoreAlert({
  open,
  onOpenChange,
  storeName,
  onCancel,
  onConfirm,
}: ConfirmStoreAlertProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[334px] max-w-[calc(100%-2rem)] min-w-[334px] gap-0 overflow-hidden rounded-[16px] border-0 bg-white p-0 sm:max-w-[calc(100%-2rem)]"
      >
        <div className="flex w-full flex-col bg-white px-20 pt-16 pb-12">
          <DialogTitle className="typo-heading-24-m text-gray-800">
            <span className="text-primary-500">{`“${storeName}”`}</span>
            <span>{' 으로 스토어명을 등록할까요?'}</span>
          </DialogTitle>
        </div>
        <div className="flex w-full items-center px-20">
          <DialogDescription className="typo-title-16-r text-gray-700">
            정확한 등록을 위해 한 번만 확인 부탁드려요
          </DialogDescription>
        </div>
        <div className="flex w-full items-center justify-end gap-8 bg-white px-20 pt-24 pb-16">
          <Button
            title="취소"
            variant="secondary-outlined"
            size="md"
            onClick={onCancel}
          />
          <Button
            title="확인"
            variant="secondary-filled"
            size="md"
            onClick={onConfirm}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
