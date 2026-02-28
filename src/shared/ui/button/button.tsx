import * as React from 'react'
import { cn } from '@/shared/libs/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  variant?:
    | 'primary-filled'
    | 'primary-outlined'
    | 'secondary-filled'
    | 'secondary-outlined'
  size?: 'sm' | 'md' | 'lg'
  roundedFull?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      title,
      disabled = false,
      variant = 'primary-filled',
      size = 'md',
      roundedFull = false,
      leftIcon,
      rightIcon,
      className = '',
      ...props
    },
    ref,
  ) => {
    const sizeClasses = {
      sm: 'h-button-sm min-w-[56px] px-10 py-8 rounded-8',
      md: 'h-button-md min-w-[90px] px-16 py-12 rounded-10',
      lg: 'h-button-lg min-w-[180px] px-16 py-16 rounded-12',
    }

    const typoClasses = {
      sm: 'typo-body-12-m',
      md: 'typo-title-16-m',
      lg: 'typo-heading-18-m',
    }

    const variantClasses = {
      'primary-filled':
        'bg-primary-500 border-primary-500 text-white hover:bg-primary-600 hover:border-primary-600 active:bg-primary-700 active:border-primary-700 focus-visible:bg-primary-700 focus-visible:border-primary-700',
      'primary-outlined':
        'bg-white border-primary-500 text-primary-500 hover:bg-primary-50 hover:border-primary-600 active:bg-primary-100 active:border-primary-700 focus-visible:bg-primary-50 focus-visible:border-primary-700',
      'secondary-filled':
        'bg-gray-900 border-gray-900 text-white hover:bg-gray-800 hover:border-gray-800 active:bg-gray-700 active:border-gray-700 focus-visible:bg-gray-700 focus-visible:border-gray-700',
      'secondary-outlined':
        'bg-white border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-50 active:bg-gray-100 active:border-gray-200 focus-visible:bg-gray-50 focus-visible:border-gray-200',
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'flex cursor-pointer items-center justify-center gap-8 border disabled:cursor-not-allowed disabled:opacity-50',
          sizeClasses[size],
          variantClasses[variant],
          roundedFull && 'rounded-full',
          className,
        )}
        {...props}
      >
        {leftIcon && leftIcon}
        <span className={typoClasses[size]}>{title}</span>
        {rightIcon && rightIcon}
      </button>
    )
  },
)

Button.displayName = 'Button'

export default Button
