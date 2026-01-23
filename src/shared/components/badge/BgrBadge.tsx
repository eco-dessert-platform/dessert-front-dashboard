import { cva, VariantProps } from 'class-variance-authority'
import React, { HTMLAttributes } from 'react'
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
                outline: 'border-[0.5px]',
                text: 'border-0 bg-white',
            },
            color: {
                gray: '',
                grayDark: '',
                yellow: '',
                green: '',
                red: '',
                dark: '',
            },
        },
        compoundVariants: [
            // Gray outline
            {
                variant: 'outline',
                color: 'gray',
                class: ['bg-gray-200', 'border-gray-600', 'text-gray-600'],
            },
            // Gray Dark outline
            {
                variant: 'outline',
                color: 'grayDark',
                class: ['bg-gray-300', 'border-gray-600', 'text-gray-800'],
            },
            // Yellow outline
            {
                variant: 'outline',
                color: 'yellow',
                class: ['bg-yellow-50', 'border-yellow-800', 'text-yellow-800'],
            },
            // Green outline
            {
                variant: 'outline',
                color: 'green',
                class: ['bg-green-50', 'border-green-800', 'text-green-800'],
            },
            // Red outline
            {
                variant: 'outline',
                color: 'red',
                class: ['bg-red-50', 'border-red-600', 'text-red-600'],
            },
            // Dark outline
            {
                variant: 'outline',
                color: 'dark',
                class: ['bg-gray-600', 'border-gray-600', 'text-white'],
            },
            // Text variants (non-outline)
            {
                variant: 'text',
                color: 'gray',
                class: 'text-gray-800',
            },
            {
                variant: 'text',
                color: 'green',
                class: 'text-green-800',
            },
            {
                variant: 'text',
                color: 'red',
                class: 'text-red-500',
            },
        ],
        defaultVariants: {
            color: 'gray',
            variant: 'outline',
        },
    },
)

interface BgrBadgeProps
    extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
        VariantProps<typeof bgrBadgeVariants> {
    content: string
    ref?: React.Ref<HTMLDivElement>
}

const BgrBadge = ({
    variant = 'outline',
    color,
    content,
    className,
    ref,
    ...props
}: BgrBadgeProps) => {
    return (
        <div
            ref={ref}
            className={cn(bgrBadgeVariants({ variant, color }), className)}
            {...props}
        >
            {content}
        </div>
    )
}

BgrBadge.displayName = 'BgrBadge'

export { BgrBadge }
