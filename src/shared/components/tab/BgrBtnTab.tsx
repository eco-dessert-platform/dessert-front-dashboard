import * as React from 'react'
import { ReactNode } from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from 'src/shared/lib/shadcn/lib/utils.ts'

function BgrBtnTabs({
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

function BgrBtnTabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'text-muted-foreground inline-flex h-[45px] w-fit items-center justify-center space-x-[10px] rounded-lg',
        className,
      )}
      {...props}
    />
  )
}

interface BgrBtnTabsTriggerProps
  extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
  children: ReactNode
  number?: number
}

function BgrBtnTabsTrigger({
  children,
  className,
  number,
  ...props
}: BgrBtnTabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "bg-background text-foreground dark:text-muted-foreground data-[state=active]:bg-primary-500 data-[state=active]:border-primary-500 data-[state=active]:text-primary-foreground group inline-flex h-[calc(100%-1px)] flex-1 cursor-pointer items-center justify-center gap-3 rounded-md border border-gray-300 px-[16px] py-[8px] text-[18px] font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      {number !== undefined && (
        <span className="text-primary-500 text-[18px] leading-none group-data-[state=active]:text-white">
          {number}
        </span>
      )}
    </TabsPrimitive.Trigger>
  )
}

export { BgrBtnTabs, BgrBtnTabsList, BgrBtnTabsTrigger }
