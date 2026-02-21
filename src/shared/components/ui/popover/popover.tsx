import * as PopoverPrimitive from '@radix-ui/react-popover'
import * as React from 'react'
import { cn } from '@/shared/lib/utils'
import { X } from 'lucide-react'

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    title?: string
    showClose?: boolean
  }
>(
  (
    {
      className,
      align = 'center',
      sideOffset = 4,
      title,
      showClose = true,
      children,
      ...props
    },
    ref,
  ) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-50 w-auto max-w-[900px] min-w-[326px] rounded-16 border border-gray-200 bg-white shadow-md outline-none',
          className,
        )}
        {...props}
      >
        <div className="flex flex-col">
          {(title || showClose) && (
            <div className="flex items-center justify-between px-20 py-10">
              {title && (
                <h3 className="typo-heading-24-m text-nowrap text-gray-800">
                  {title}
                </h3>
              )}
              {showClose && (
                <PopoverPrimitive.Close className="rounded-sm border-none opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none">
                  <X className="size-30 text-gray-800" />
                  <span className="sr-only">Close</span>
                </PopoverPrimitive.Close>
              )}
            </div>
          )}
          <div className="px-20 pb-20">{children}</div>
        </div>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  ),
)
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
