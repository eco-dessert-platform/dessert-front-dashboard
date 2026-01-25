"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import * as React from "react"

import BottomArrowIcon from "@/assets/icons/arrow/bottom-arrow.svg?react"
import { cn } from "@/shared/lib/utils"

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
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

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex items-center">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "cursor-pointer focus-visible:ring-ring/50 focus-visible:border-ring focus-visible:after:border-ring **:data-[slot=accordion-trigger-icon]:text-muted-foreground py-3 px-2 text-left text-heading-18-m focus-visible:ring-[3px] **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 group/accordion-trigger relative flex flex-1 items-center justify-between transition-all outline-none disabled:pointer-events-none disabled:opacity-50 text-gray-800" ,
          className
        )}
        {...props}
      >
        {children}
        <BottomArrowIcon
					data-slot="accordion-trigger-icon"
          className="pointer-events-none shrink-0 group-data-[state=open]/accordion-trigger:rotate-180"
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
      className="data-open:animate-accordion-down data-closed:animate-accordion-up overflow-hidden"
      {...props}
    >
      <div
        className={cn(
          "pt-0 [&_a]:hover:text-foreground h-(--radix-accordion-content-height) [&_a]:underline [&_a]:underline-offset-3",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }

