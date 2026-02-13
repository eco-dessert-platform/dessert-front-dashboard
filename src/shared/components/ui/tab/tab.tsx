import * as TabsPrimitive from '@radix-ui/react-tabs'
import * as React from 'react'
import { ReactNode, createContext, useContext } from 'react'

import { cn } from '@/shared/lib/utils'

type TabVariant = 'line' | 'btn'

const TabContext = createContext<{ variant: TabVariant }>({ variant: 'line' })

interface TabProps extends React.ComponentProps<typeof TabsPrimitive.Root> {
  variant?: TabVariant
}

const TAB_VARIANT_STYLES = {
  line: {
    list: 'border-b-2 border-gray-100',
    trigger: (size: 'sm' | 'lg') =>
      cn(
        "relative gap-1.5 py-2 pb-3 text-sm font-medium text-gray-500 transition-all after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-full after:bg-transparent after:content-[''] data-[state=active]:text-gray-900 data-[state=active]:[text-shadow:0_0_0.75px_currentColor] data-[state=active]:after:bg-gray-900",
        size === 'sm' ? 'px-16' : 'px-40',
      ),
    number:
      'ml-8 text-xs text-gray-400 group-data-[state=active]:text-gray-900',
  },
  btn: {
    list: 'h-input space-x-4 rounded-10',
    trigger: () =>
      'h-[calc(100%-1px)] flex-1 gap-3 border border-gray-300 px-16 py-8 rounded-4 bg-background text-title-18-m font-medium text-foreground transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1 dark:text-muted-foreground data-[state=active]:border-primary-500 data-[state=active]:bg-primary-500 data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm',
    number: 'text-title-18-m text-primary-500 group-data-[state=active]:text-white',
  },
} as const

function Tab({ className, variant = 'line', ...props }: TabProps) {
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

function TabList({
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

interface TabTriggerProps
  extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
  children: ReactNode
  number?: number
  size?: 'sm' | 'lg'
}

function TabTrigger({
  children,
  className,
  number,
  size = 'sm',
  ...props
}: TabTriggerProps) {
  const { variant } = useContext(TabContext)
  const styles = TAB_VARIANT_STYLES[variant]

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "group inline-flex cursor-pointer items-center justify-center whitespace-nowrap outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-16",
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

export { Tab, TabList, TabTrigger }
