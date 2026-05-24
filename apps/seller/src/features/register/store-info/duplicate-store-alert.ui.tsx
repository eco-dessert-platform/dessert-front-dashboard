import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@dessert/ui'

interface DuplicateStoreAlertProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function DuplicateStoreAlert({
  open,
  onOpenChange,
  onConfirm,
}: DuplicateStoreAlertProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[334px] max-w-[calc(100%-2rem)] min-w-[334px] gap-0 overflow-hidden rounded-[16px] border-0 bg-white p-0 sm:max-w-[calc(100%-2rem)]"
      >
        <div className="flex w-full flex-col bg-white px-20 pt-16 pb-12">
          <DialogTitle className="typo-heading-24-m text-gray-800">
            이미 등록되어 있는 스토어에요
          </DialogTitle>
        </div>
        <div className="flex w-full items-center px-20">
          <DialogDescription className="typo-title-16-r text-gray-700">
            다른 이름으로 스토어 등록을 진행해주세요
          </DialogDescription>
        </div>
        <div className="flex w-full justify-end bg-white px-20 pt-24 pb-16">
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
