import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { TEXT_VARIANTS, type TextVariant } from '../../types/font'
import { cn } from '../lib/utils'

type PolymorphicProps<E extends ElementType> = {
  as?: E
  variant?: TextVariant
  color?: string
  className?: string
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<E>, 'as' | 'className' | 'children'>

export type TextProps<E extends ElementType = 'p'> = PolymorphicProps<E>

const DEFAULT_VARIANT: TextVariant = 'body12-r'

/** 텍스트 컴포넌트입니다.
 *
 * @param as - 텍스트 요소 타입 (default: p)
 * @param variant - 텍스트 타입 (default: body12-r)
 * @param color - 텍스트 색상 (default: text-gray-800)
 * @param className - 추가 속성
 * @param children - 자식 요소
 * @param props - 부가적인 속성 속성
 */
const Text = <E extends ElementType = 'p'>({
  as,
  variant = DEFAULT_VARIANT,
  color,
  className,
  children,
  ...props
}: TextProps<E>) => {
  const Component = as ?? 'p'

  const textColor = color ? `text-${color}` : 'text-gray-800'
  return (
    <Component
      {...props}
      className={cn(TEXT_VARIANTS[variant], textColor, className)}
    >
      {children}
    </Component>
  )
}

export { Text }
