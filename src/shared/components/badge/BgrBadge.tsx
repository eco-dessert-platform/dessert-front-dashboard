import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { cn } from 'src/shared/lib/shadcn/lib/utils'

const bgrBadgeVariants = cva(
    [
        'inline-flex',
        'items-center',
        'justify-center',
        'h-[20px]',
        'px-1',
        'py-0.5',
        'rounded-[4px]',
        'text-[10px]',
        'font-normal',
        'leading-[160%]',
        'tracking-[-0.02em]',
        'whitespace-nowrap',
    ],
    {
        variants: {
            variant: {
                gray: '',
                grayDark: '',
                yellow: '',
                green: '',
                red: '',
                dark: '',
            },
            appearance: {
                outline: 'border-[0.5px]',
                text: 'border-0 bg-white',
            },
        },
        compoundVariants: [
            // Gray outline
            {
                variant: 'gray',
                appearance: 'outline',
                class: ['bg-gray-200', 'border-gray-600', 'text-gray-600'],
            },
            // Gray Dark outline
            {
                variant: 'grayDark',
                appearance: 'outline',
                class: ['bg-gray-300', 'border-gray-600', 'text-gray-800'],
            },
            // Yellow outline
            {
                variant: 'yellow',
                appearance: 'outline',
                class: ['bg-yellow-50', 'border-yellow-800', 'text-yellow-800'],
            },
            // Green outline
            {
                variant: 'green',
                appearance: 'outline',
                class: ['bg-green-50', 'border-green-800', 'text-green-800'],
            },
            // Red outline
            {
                variant: 'red',
                appearance: 'outline',
                class: ['bg-red-50', 'border-red-600', 'text-red-600'],
            },
            // Dark outline
            {
                variant: 'dark',
                appearance: 'outline',
                class: ['bg-gray-600', 'border-gray-600', 'text-white'],
            },
            // Text variants (non-outline)
            {
                variant: 'gray',
                appearance: 'text',
                class: 'text-gray-800',
            },
            {
                variant: 'green',
                appearance: 'text',
                class: 'text-green-800',
            },
            {
                variant: 'red',
                appearance: 'text',
                class: 'text-red-500',
            },
        ],
        defaultVariants: {
            variant: 'gray',
            appearance: 'outline',
        },
    },
)

interface bgrBadgeProps
    extends HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof bgrBadgeVariants> {
    children: ReactNode
}

const BgrBadge = forwardRef<HTMLDivElement, bgrBadgeProps>(
    ({ className, variant, appearance, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    bgrBadgeVariants({ variant, appearance }),
                    className,
                )}
                {...props}
            >
                {children}
            </div>
        )
    },
)

BgrBadge.displayName = 'BgrBadge'

export { BgrBadge }
