import * as React from 'react'
import { ReactNode } from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from 'src/shared/lib/shadcn/lib/utils.ts'

function BgrLineTabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

function BgrLineTabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'text-muted-foreground flex w-fit items-center border-b-2 border-gray-100',
        className,
      )}
      {...props}
    />
  )
}

interface BgrLineTabsTriggerProps
  extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
  children: ReactNode
  number?: number
  size?: 'sm' | 'lg'
}

function BgrLineTabsTrigger({
  children,
  className,
  number,
  size = 'sm',
  ...props
}: BgrLineTabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "group relative inline-flex cursor-pointer items-center justify-center gap-1.5 py-2 pb-3 text-sm font-medium whitespace-nowrap text-gray-500 transition-all outline-none after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-full after:bg-transparent after:content-[''] disabled:pointer-events-none disabled:opacity-50 data-[state=active]:font-semibold data-[state=active]:text-gray-900 data-[state=active]:after:bg-gray-900",
        size === 'sm' ? 'px-4' : 'px-10',
        className,
      )}
      {...props}
    >
      {children}
      {number !== undefined && (
        <span className="ml-2 text-xs leading-none text-gray-400 group-data-[state=active]:text-gray-900">
          {number}
        </span>
      )}
    </TabsPrimitive.Trigger>
  )
}
function BgrLineTabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 pt-4 outline-none', className)}
      {...props}
    />
  )
}

export { BgrLineTabs, BgrLineTabsList, BgrLineTabsTrigger, BgrLineTabsContent }
