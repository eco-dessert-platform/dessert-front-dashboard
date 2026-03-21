import { Tooltip } from '@dessert/ui'
import { Info } from 'lucide-react'

import { cn } from '@/shared/libs/utils'

interface InfoTooltipProps {
  iconSize?: number
  children: React.ReactNode
  className?: string
}

export const InfoTooltip = ({
  iconSize = 20,
  children,
  className,
}: InfoTooltipProps) => {
  return (
    <Tooltip position="bottom">
      <Tooltip.Trigger>
        <Info size={iconSize} />
      </Tooltip.Trigger>
      <Tooltip.Content className={cn('px-8 py-6', className)}>
        <p>{children}</p>
      </Tooltip.Content>
    </Tooltip>
  )
}
