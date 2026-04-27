import { Button } from '@dessert/ui'

import ResetIcon from '@/assets/icons/reset.svg?react'

interface ResetButtonProps {
  onClick: () => void
}

export function ResetButton({ onClick }: ResetButtonProps) {
  return (
    <Button
      title="초기화"
      variant="secondary-outlined"
      size="sm"
      rightIcon={<ResetIcon className="text-gray-800" />}
      onClick={onClick}
      className="h-auto min-w-0 gap-0 rounded-none border-0 bg-transparent p-0 text-gray-800 hover:border-transparent hover:bg-transparent focus-visible:border-transparent focus-visible:bg-transparent active:border-transparent active:bg-transparent"
    />
  )
}
