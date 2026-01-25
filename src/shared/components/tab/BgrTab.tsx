import * as React from 'react'
import { ReactNode, createContext, useContext } from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from 'src/shared/lib/shadcn/lib/utils.ts'

type TabVariant = 'line' | 'btn'

const TabContext = createContext<{ variant: TabVariant }>({ variant: 'line' })

interface BgrTabProps extends React.ComponentProps<typeof TabsPrimitive.Root> {
  variant?: TabVariant
}

const TAB_VARIANT_STYLES = {
  line: {
    list: 'border-b-2 border-gray-100',
    trigger: (size: 'sm' | 'lg') =>
      cn(
        "relative gap-1.5 py-2 pb-3 text-sm font-medium text-gray-500 transition-all after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-full after:bg-transparent after:content-[''] data-[state=active]:text-gray-900 data-[state=active]:[text-shadow:0_0_0.75px_currentColor] data-[state=active]:after:bg-gray-900",
        size === 'sm' ? 'px-4' : 'px-10',
      ),
    number:
      'ml-2 text-xs text-gray-400 group-data-[state=active]:text-gray-900',
  },
  btn: {
    list: 'h-[45px] space-x-[10px] rounded-lg',
    trigger: () =>
      'h-[calc(100%-1px)] flex-1 gap-3 border border-gray-300 px-[16px] py-[8px] rounded-md bg-background text-[18px] font-medium text-foreground transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1 dark:text-muted-foreground data-[state=active]:border-primary-500 data-[state=active]:bg-primary-500 data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm',
    number: 'text-[18px] text-primary-500 group-data-[state=active]:text-white',
  },
} as const

function BgrTab({ className, variant = 'line', ...props }: BgrTabProps) {
  return (
    <TabContext.Provider value={{ variant }}>
      <TabsPrimitive.Root
        data-slot="tabs"
        className={cn('flex flex-col gap-2', className)}
        {...props}
      />
    </TabContext.Provider>
  )
}

function BgrTabList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const { variant } = useContext(TabContext)

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'text-muted-foreground inline-flex w-fit items-center justify-center',
        TAB_VARIANT_STYLES[variant].list,
        className,
      )}
      {...props}
    />
  )
}

interface BgrTabTriggerProps
  extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
  children: ReactNode
  number?: number
  size?: 'sm' | 'lg'
}

function BgrTabTrigger({
  children,
  className,
  number,
  size = 'sm',
  ...props
}: BgrTabTriggerProps) {
  const { variant } = useContext(TabContext)
  const styles = TAB_VARIANT_STYLES[variant]

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "group inline-flex cursor-pointer items-center justify-center whitespace-nowrap outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        typeof styles.trigger === 'function'
          ? styles.trigger(size)
          : styles.trigger,
        className,
      )}
      {...props}
    >
      {children}
      {number !== undefined && (
        <span className={cn('leading-none', styles.number)}>{number}</span>
      )}
    </TabsPrimitive.Trigger>
  )
}

export { BgrTab, BgrTabList, BgrTabTrigger }
