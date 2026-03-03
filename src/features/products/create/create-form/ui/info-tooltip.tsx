import { Tooltip } from '@/shared/components/ui/tooltip/tooltip'
import { cn } from '@/shared/lib/utils'
import { Info } from 'lucide-react'

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
