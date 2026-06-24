'use client'

import * as React from 'react'

import { ChevronDownIcon } from '@dessert/icons'
import * as AccordionPrimitive from '@radix-ui/react-accordion'

import { cn } from '../lib/utils'

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn('flex w-full flex-col', className)}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={className}
      {...props}
    />
  )
}

interface CustomTriggerProps
  extends React.ComponentProps<typeof AccordionPrimitive.Trigger> {
  // 노드를 렌더링하지 않고 Chevron 아이콘 스타일만 토글하므로 boolean으로 좁힘
  customIcon?: boolean
}

function AccordionTrigger({
  className,
  children,
  customIcon = false,
  ...props
}: CustomTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex items-center">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'group relative flex flex-1 cursor-pointer items-center justify-between px-2 py-3 text-left typo-heading-18-m text-gray-800 transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:after:border-ring disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-gray-800',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          fontSize={36}
          data-slot="accordion-trigger-icon"
          className={cn(
            'pointer-events-none shrink-0 transition-transform group-data-[state=open]:rotate-180',
            customIcon && 'm-0! size-9!',
          )}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden data-closed:animate-accordion-up data-open:animate-accordion-down"
      {...props}
    >
      <div
        className={cn(
          'h-(--radix-accordion-content-height) pt-0 [&_a]:hover:text-foreground',
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
