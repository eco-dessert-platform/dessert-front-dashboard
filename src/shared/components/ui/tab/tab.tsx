import { cn } from '@/shared/lib/utils'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import * as React from 'react'
import { ReactNode } from 'react'

function Tabs({
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

function TabsList({
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

interface TabsTriggerProps
  extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
  children: ReactNode
  number?: number
}

function TabsTrigger({
  children,
  className,
  number,
  ...props
}: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-gray-300 px-[16px] py-[8px] text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        'bg-background',
        'data-[state=active]:bg-primary-500 data-[state=active]:border-primary-500 data-[state=active]:text-primary-foreground group',
        className,
      )}
      {...props}
    >
      {children}
      {number !== undefined && (
        <span className="text-primary-500 ml-2 text-xs leading-none group-data-[state=active]:text-white">
          {number}
        </span>
      )}
    </TabsPrimitive.Trigger>
  )
}
function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  )
}

export { Tabs, TabsContent, TabsList, TabsTrigger }
